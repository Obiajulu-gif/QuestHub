const API_BASE_URL = "https://questbot-endpoint.onrender.com";

// Quiz Game API Functions
export const fetchQuizQuestion = async () => {
  console.log("API REQUEST: POST /quiz/question");
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/question`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching quiz question:", error);
    throw error;
  }
};

export const submitQuizAnswer = async (answer) => {
  console.log("API REQUEST: POST /quiz/answer", { answer });
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/answer`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error submitting quiz answer:", error);
    throw error;
  }
};

export const getQuizBreakOptions = async () => {
  console.log("API REQUEST: POST /quiz/break");
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/break`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching quiz break options:", error);
    throw error;
  }
};

export const resetQuiz = async () => {
  console.log("API REQUEST: POST /quiz/reset");
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/reset`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error resetting quiz:", error);
    throw error;
  }
};

// Riddle Game API Functions
export const fetchRiddle = async () => {
  console.log("API REQUEST: GET /riddle");
  try {
    const response = await fetch(`${API_BASE_URL}/riddle`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching riddle:", error);
    throw error;
  }
};

export const checkRiddleAnswer = async (userAnswer) => {
  console.log("API REQUEST: POST /riddle/check-answer", { user_answer: userAnswer });
  try {
    const response = await fetch(`${API_BASE_URL}/riddle/check-answer`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_answer: userAnswer }),
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error checking riddle answer:", error);
    throw error;
  }
};

export const getRiddleBreakOptions = async () => {
  console.log("API REQUEST: GET /riddle/break-options");
  try {
    const response = await fetch(`${API_BASE_URL}/riddle/break-options`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching riddle break options:", error);
    throw error;
  }
};

export const resetRiddle = async () => {
  console.log("API REQUEST: POST /riddle/reset");
  try {
    const response = await fetch(`${API_BASE_URL}/riddle/reset`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error resetting riddle:", error);
    throw error;
  }
};

// Creative Challenge API Functions
export const generateCreativePrompt = async (duration = 48, timeUnit = "hours") => {
  console.log("API REQUEST: POST /prompt", { duration, time_unit: timeUnit });
  try {
    const response = await fetch(`${API_BASE_URL}/prompt`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ duration, time_unit: timeUnit }),
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error generating creative prompt:", error);
    throw error;
  }
};

export const evaluateChallenge = async (challengeId, pdfFile) => {
  console.log("API REQUEST: POST /evaluate/" + challengeId, { fileSize: pdfFile.size });
  try {
    const formData = new FormData();
    formData.append("pdf_file", pdfFile);
    
    const response = await fetch(`${API_BASE_URL}/evaluate/${challengeId}`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
      body: formData,
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error evaluating challenge:", error);
    throw error;
  }
};

export const getChallengeScores = async (challengeId) => {
  console.log("API REQUEST: GET /scores/" + challengeId);
  try {
    const response = await fetch(`${API_BASE_URL}/scores/${challengeId}`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching challenge scores:", error);
    throw error;
  }
};

export const getChallengeDetails = async (challengeId) => {
  console.log("API REQUEST: GET /challenge/" + challengeId);
  try {
    const response = await fetch(`${API_BASE_URL}/challenge/${challengeId}`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching challenge details:", error);
    throw error;
  }
};

// Fun Fact API Function
export const getFunFact = async () => {
  console.log("API REQUEST: GET /fun-fact");
  try {
    const response = await fetch(`${API_BASE_URL}/fun-fact`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching fun fact:", error);
    throw error;
  }
}; 