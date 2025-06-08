const PAT = 'ee35d7f7d5ff432cb4b05a0126b40032';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'food-item-recognition';

export const callClarifaiApi = async (base64Image) => {
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "base64": base64Image
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  try {
    const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions);
    const result = await response.json();
    if (result.outputs && result.outputs[0].data.concepts) {
      // Return the name of the most likely concept
      return result.outputs[0].data.concepts[0].name;
    }
  } catch (error) {
    console.log('error', error);
    return null;
  }
}; 