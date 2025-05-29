const API_BASE_URL = "https://questbot-endpoint.onrender.com";

// Helper function to make API calls with retries
const makeApiCall = async (url, options, retries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    let timeoutId;
    const controller = new AbortController();
    
    try {
      console.log(`API REQUEST: ${options.method} ${url} (Attempt ${attempt + 1}/${retries})`);
      
      // Add a timeout to prevent hanging requests
      timeoutId = setTimeout(() => controller.abort(new Error('Request timeout')), 15000); // 15 second timeout
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API RESPONSE:", JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      // Ignore aborted errors when retrying
      if (error.name === 'AbortError') {
        console.error(`Attempt ${attempt + 1}/${retries} timed out.`);
      } else {
      console.error(`Attempt ${attempt + 1}/${retries} failed:`, error.message || error);
      }
      lastError = error;
      
      // If we've used all retries, throw the error
      if (attempt === retries - 1) {
        throw lastError;
      }
      
      // Otherwise wait before trying again
      await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
    } finally {
      // Always clear the timeout
      if (timeoutId) clearTimeout(timeoutId);
    }
  }
};

// Quiz Game API Functions
export const fetchQuizQuestion = async () => {
  try {
    return await makeApiCall(`${API_BASE_URL}/quiz/question`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching quiz question:", error);
    // Return mock data as fallback for demo
    return {
      question: "Question (Demo Mode): Which cryptocurrency is known as digital gold?",
      options: [
        "A) Ethereum",
        "B) Bitcoin",
        "C) Litecoin",
        "D) Dogecoin"
      ],
      hint: "It was the first cryptocurrency.",
      complexity: 1,
      attempts_remaining: 5,
      error: null
    };
  }
};

export const submitQuizAnswer = async (answer) => {
  try {
    return await makeApiCall(`${API_BASE_URL}/quiz/answer`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });
  } catch (error) {
    console.error("Error submitting quiz answer:", error);
    // Return mock data as fallback for demo
    const isCorrect = answer === "B" || answer === "B) Bitcoin";
    return {
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Wrong! 4 attempts remaining",
      attempts_remaining: isCorrect ? null : 4,
      hint: isCorrect ? null : "It was the first cryptocurrency.",
      complexity: null
    };
  }
};

export const getQuizBreakOptions = async () => {
  try {
    return await makeApiCall(`${API_BASE_URL}/quiz/break`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching quiz break options:", error);
    // Return mock data as fallback for demo
    return {
      options: [
        "Taking a break is a great idea! Blockchain quizzes can be a workout for the brain.",
        "You have a few options:",
        "1. Check Rankings: See where you stand on the leaderboard!",
        "2. Achievements: Take a look at the badges you've unlocked so far.",
        "3. Question History: Review the questions you've answered.",
        "4. Blockchain Fun Facts: Discover some cool facts about blockchain.",
        "5. Mini-Games: Try a quick puzzle related to blockchain."
      ]
    };
  }
};

export const resetQuiz = async () => {
  try {
    return await makeApiCall(`${API_BASE_URL}/quiz/reset`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error resetting quiz:", error);
    // Return mock data as fallback for demo
    return {
      message: "Game reset successfully",
      status: true
    };
  }
};

// Riddle Game API Functions
export const fetchRiddle = async () => {
  try {
    return await makeApiCall(`${API_BASE_URL}/riddle`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching riddle:", error);
    // Return mock data as fallback for demo
    return {
      riddle: "(Complexity 1 - Demo Mode): I'm a digital record book that everyone can see, but no one alone can change. What am I?",
      hint: "Think about a shared, transparent, and secure ledger.",
      complexity: 1,
      attempts_remaining: 5
    };
  }
};

export const checkRiddleAnswer = async (userAnswer) => {
  try {
    return await makeApiCall(`${API_BASE_URL}/riddle/check-answer`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_answer: userAnswer }),
    });
  } catch (error) {
    console.error("Error checking riddle answer:", error);
    // Return mock data as fallback for demo
    const isCorrect = userAnswer.toLowerCase().includes("blockchain");
    return {
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Wrong! 4 attempts remaining",
      attempts_remaining: isCorrect ? null : 4,
      hint: isCorrect ? null : "Think about a shared, transparent, and secure ledger."
    };
  }
};

export const getRiddleBreakOptions = async () => {
  try {
    return await makeApiCall(`${API_BASE_URL}/riddle/break-options`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching riddle break options:", error);
    // Return mock data as fallback for demo
    return {
      break_options: "Taking a break is a great idea! Blockchain riddles can be quite the brain-bender. How about we switch gears for a bit?\n\nHere are a few options to choose from:\n\n1. Blockchain Fun Facts: I can share some interesting trivia about blockchain technology.\n2. Mini-Games: We could try a quick puzzle related to blockchain concepts.\n3. Achievements: I can display any badges or milestones you've earned so far in our riddle game!"
    };
  }
};

export const resetRiddle = async () => {
  try {
    return await makeApiCall(`${API_BASE_URL}/riddle/reset`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error resetting riddle:", error);
    // Return mock data as fallback for demo
    return {
      message: "Game reset successfully"
    };
  }
};

// Creative Challenge API Functions
export const generateCreativePrompt = async (duration = 48, timeUnit = "hours") => {
  try {
    return await makeApiCall(`${API_BASE_URL}/prompt`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ duration, time_unit: timeUnit }),
    });
  } catch (error) {
    console.error("Error generating creative prompt:", error);
    throw error;
  }
};

export const evaluateChallenge = async (challengeId, pdfFile) => {
  try {
    const formData = new FormData();
    formData.append("pdf_file", pdfFile);
    
    return await makeApiCall(`${API_BASE_URL}/evaluate/${challengeId}`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
      body: formData,
    });
  } catch (error) {
    console.error("Error evaluating challenge:", error);
    throw error;
  }
};

export const getChallengeScores = async (challengeId) => {
  try {
    return await makeApiCall(`${API_BASE_URL}/scores/${challengeId}`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching challenge scores:", error);
    throw error;
  }
};

export const getChallengeDetails = async (challengeId) => {
  try {
    return await makeApiCall(`${API_BASE_URL}/challenge/${challengeId}`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching challenge details:", error);
    throw error;
  }
};

// Fun Fact API Function
export const getFunFact = async () => {
  try {
    return await makeApiCall(`${API_BASE_URL}/fun-fact`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching fun fact:", error);
    // Return mock data as fallback for demo
    return {
      success: true,
      facts: "📝 BNB Chain Layer 2 Trivia\n\nDid you know? Layer 2 solutions on BNB Chain aim to increase transaction throughput to potentially 5,000+ TPS, rivaling traditional payment processors like Visa!\n\n🎨 Visual Scale:\nThink of it as adding express lanes to a superhighway, reducing congestion and allowing more vehicles (transactions) to pass through quickly and efficiently.\n\n💡 Real Impact:\nThis upgrade enhances scalability, making micro-transactions and high-volume applications like blockchain gaming more practical on the BNB Chain."
    };
  }
}; 