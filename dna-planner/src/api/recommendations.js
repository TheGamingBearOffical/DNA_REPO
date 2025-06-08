export const getAIRecomendations = async (mealItems, analysisResult) => {
  try {
    const response = await fetch('http://localhost:5001/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mealItems, analysisResult }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Backend Error:', errorBody);
      // Return a default message on error
      return "Could not generate recommendations at this time. Please try again later.";
    }

    const result = await response.json();
    return result.recommendations; // The backend sends { recommendations: "..." }

  } catch (error) {
    console.error('Error calling recommendations API:', error);
    return "Could not connect to the server to get recommendations.";
  }
}; 