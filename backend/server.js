const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const db = require('./mockDatabase.json');
const { generateReport } = require('./interpretationEngine');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Allows your React app (from a different port) to talk to this server
app.use(express.json({ limit: '10mb' })); // Increase the limit to handle base64 images

// --- Google Gemini API ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-preview-06-05" });

// Converts a base64 string to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(base64, mimeType) {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
}

app.post('/api/analyze', async (req, res) => {
    // The request body now contains image (base64) and mimeType
    const { image, mimeType } = req.body; 

    if (!image || !mimeType) {
        return res.status(400).json({ error: 'Image data and MIME type are required.' });
    }

    try {
        const prompt = `Identify the primary food item in this image. Respond with a JSON object containing the following keys: 
- "foodName": The name of the food.
- "calories": An estimated integer value for the calories in a typical serving.
- "protein": An estimated integer value for the protein in grams.
- "fat": An estimated integer value for the total fat in grams.
- "carbs": An estimated integer value for the total carbohydrates in grams.

Example: {"foodName": "Apple", "calories": 95, "protein": 1, "fat": 0, "carbs": 25}. 
Respond only with the single, minified JSON object and nothing else.`;
        const imagePart = fileToGenerativePart(image, mimeType);

        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{ text: prompt }, imagePart]
            }],
            tools: [{
                googleSearch: {}
            }]
        });

        const response = await result.response;
        const textResponse = response.text();

        console.log('Gemini API Result:', textResponse);

        try {
            // The response might have markdown backticks, remove them
            const cleanedJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            const foodData = JSON.parse(cleanedJson);
            res.json(foodData);
        } catch (parseError) {
            console.error('Error parsing Gemini JSON response:', parseError);
            // Fallback if JSON parsing fails
            res.json({ foodName: textResponse.trim(), calories: 'N/A' });
        }

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'An error occurred while communicating with the Gemini API.' });
    }
});

app.post('/api/recommendations', async (req, res) => {
    const { mealItems, analysisResult } = req.body;

    if (!mealItems || !analysisResult || mealItems.length === 0 || Object.keys(analysisResult).length === 0) {
        return res.status(400).json({ error: 'Meal items and analysis results are required.' });
    }

    try {
        let traitSummary = '';
        for (const [nutrient, snpResults] of Object.entries(analysisResult)) {
            traitSummary += `- ${nutrient}:\n`;
            snpResults.forEach(snp => {
                traitSummary += `  - ${snp.meaning}\n`;
            });
        }

        const foodList = mealItems.map(item => `- ${item.name}`).join('\n');

        const prompt = `You are a personalized nutrition and diet assistant. A user has provided their genetic analysis results and a list of food items they have. Your task is to provide creative, healthy, and simple recipe or meal recommendations based on this information.

        **User's Genetic Profile:**
        Here are some of the user's key genetic traits related to nutrition:
        ${traitSummary}

        **Available Food Items:**
        The user has the following food items available:
        ${foodList}

        **Your Recommendations:**
        Please provide 2-3 simple meal or recipe ideas (e.g., for breakfast, lunch, or dinner) that the user can make with their available ingredients. The recommendations should be mindful of their genetic predispositions. For example, if they have a sensitivity to lactose, suggest dairy-free alternatives.

        Keep the tone encouraging and helpful. Format your response using markdown with headings for each meal idea and bullet points for ingredients or steps. Do not include any introductory or concluding sentences outside of the recommendations themselves. Just provide the meal ideas directly.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const recommendations = response.text();

        console.log('Gemini Recommendations:', recommendations);
        res.json({ recommendations });

    } catch (error) {
        console.error('Gemini API Error (Recommendations):', error);
        res.status(500).json({ error: 'An error occurred while generating recommendations.' });
    }
});

app.post('/api/highlights', async (req, res) => {
    const { analysisResult } = req.body;

    if (!analysisResult || Object.keys(analysisResult).length === 0) {
        return res.status(400).json({ error: 'Analysis results are required.' });
    }

    try {
        let traitSummary = '';
        for (const [nutrient, snpResults] of Object.entries(analysisResult)) {
            traitSummary += `- ${nutrient}: ${snpResults.map(s => s.meaning).join(', ')}\n`;
        }

        const prompt = `Based on the following genetic analysis summary, identify a list of "Hero Foods" and "Foods to Watch".

        **Genetic Summary:**
        ${traitSummary}

        **Instructions:**
        1.  **Hero Foods:** Identify 3-5 foods that would be particularly beneficial for this person. Provide a brief, one-sentence reason for each, directly related to a trait.
        2.  **Foods to Watch:** Identify 3-5 foods or ingredients this person should be mindful of. Provide a brief, one-sentence reason for each, directly related to a trait.
        3.  Format the output as a single, minified JSON object with two keys: "heroFoods" and "foodsToWatch". Each key should contain an array of objects, where each object has "name" and "reason" properties.
        4.  Do not include any other text, explanations, or markdown formatting.

        **Example JSON Output:**
        {"heroFoods":[{"name":"Salmon","reason":"Provides Omega-3s, which are beneficial for your cardiovascular health profile."},{"name":"Spinach","reason":"A great source of Folate (Vitamin B9) to support your MTHFR pathway."}],"foodsToWatch":[{"name":"Sugary Drinks","reason":"Your genes indicate a higher sensitivity to sugar, impacting blood glucose levels."},{"name":"Processed Meats","reason":"High in sodium, which you may be sensitive to according to your blood pressure predisposition."}]}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        console.log('Gemini Highlights Result:', textResponse);

        try {
            const cleanedJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            const highlightsData = JSON.parse(cleanedJson);
            res.json(highlightsData);
        } catch (parseError) {
            console.error('Error parsing Gemini JSON for highlights:', parseError);
            res.status(500).json({ error: 'Could not parse highlights data.' });
        }

    } catch (error) {
        console.error('Gemini API Error (Highlights):', error);
        res.status(500).json({ error: 'An error occurred while generating highlights.' });
    }
});

app.post('/api/recipe-of-the-day', async (req, res) => {
    const { analysisResult } = req.body;

    if (!analysisResult || Object.keys(analysisResult).length === 0) {
        return res.status(400).json({ error: 'Analysis results are required.' });
    }

    try {
        let traitSummary = '';
        for (const [nutrient, snpResults] of Object.entries(analysisResult)) {
            traitSummary += `- ${nutrient}: ${snpResults.map(s => s.meaning).join(', ')}\n`;
        }

        const prompt = `You are a creative chef and personalized nutritionist. Based on the following genetic analysis summary, create a single, unique "Recipe of the Day" that is healthy and appealing for this user.

        **Genetic Summary:**
        ${traitSummary}

        **Instructions:**
        1.  Create one complete recipe.
        2.  The response should be formatted in markdown.
        3.  Start with a creative, catchy recipe name as a level 3 heading (###).
        4.  Follow with a short, one-paragraph description of the dish and explain briefly why it's beneficial based on their genetic profile.
        5.  Include a section for "Ingredients" with a bulleted list.
        6.  Include a section for "Instructions" with a numbered list.
        7.  The tone should be encouraging, simple, and inspiring. Do not include any other text or introductions.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const recipe = response.text();

        console.log('Gemini Recipe of the Day:', recipe);
        res.json({ recipe });

    } catch (error) {
        console.error('Gemini API Error (Recipe of the Day):', error);
        res.status(500).json({ error: 'An error occurred while generating the recipe.' });
    }
});

// --- Original API ROUTES ---

// @route   GET /api/report/:id
// @desc    Get a personalized diet report by user ID
// @access  Public
app.get('/api/report/:id', (req, res) => {
  const { id } = req.params;
  const userData = db[id];

  if (!userData) {
    return res.status(404).json({ msg: 'Report ID not found. Please check the ID and try again.' });
  }

  // Use our engine to interpret the SNPs
  const interpretedTraits = generateReport(userData.snps);

  // Construct the final report object to send to the frontend
  const fullReport = {
    id: id,
    name: userData.name,
    generatedAt: new Date().toISOString(),
    traits: interpretedTraits,
  };

  res.json(fullReport);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});