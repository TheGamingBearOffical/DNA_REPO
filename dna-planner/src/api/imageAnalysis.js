export const callImageAnalysisApi = async (dataUrl) => {
  try {
    // dataUrl is like "data:image/jpeg;base64,LzlqLzRBQ...""
    const Glimpse = dataUrl.split(',')[0];
    const mimeType = Glimpse.match(/:(.*?);/)?.[1]
    const base64Image = dataUrl.split(',')[1];

    if (!mimeType || !base64Image) {
      throw new Error("Invalid data URL");
    }

    const response = await fetch('http://localhost:5001/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image, mimeType: mimeType }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Backend Error:', errorBody);
      return null;
    }

    const result = await response.json();
    return result; // The backend now sends { foodName: "...", calories: ... }

  } catch (error) {
    console.error('Error calling backend proxy:', error);
    return null;
  }
}; 