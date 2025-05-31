"use client";

import { SensayAPI } from '../sensay/api-chat-tutorial/src/sensay-sdk';

// Constants for Sensay integration - matching sample code
const QUESTBOT_USER_ID = "70a0a757-cd82-437e-b485-932a989a6649"; //'questbot-user';
const QUESTBOT_HOST_REPLICA_SLUG = "winks_v1"; //'questbot-host';
const API_VERSION = '2025-03-25';

// Initialize the Sensay API client with organization credentials
export const initSensayClient = (userId = QUESTBOT_USER_ID) => {
  if (!process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET) {
    console.error('Missing Sensay API key. Set NEXT_PUBLIC_SENSAY_API_KEY_SECRET in .env.local');
    return null;
  }

  return new SensayAPI({
    HEADERS: {
      'X-ORGANIZATION-SECRET': process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET,
      'X-USER-ID': userId
    }
  });
};

// Initialize an organization-only client (without user context)
export const initOrgClient = () => {
  if (!process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET) {
    console.error('Missing Sensay API key. Set NEXT_PUBLIC_SENSAY_API_KEY_SECRET in .env.local');
    return null;
  }

  return new SensayAPI({
    HEADERS: {
      'X-ORGANIZATION-SECRET': process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET
    }
  });
};

// Create or get the QuestBot host replica
export const getOrCreateQuestBotHostReplica = async () => {
  try {
    // First check if user exists
    const orgClient = initOrgClient();
    if (!orgClient) return null;

    let userExists = false;
    try {
      await orgClient.users.getV1Users(QUESTBOT_USER_ID);
      userExists = true;
      console.log(`User ${QUESTBOT_USER_ID} exists`);
    } catch (error) {
      console.log('User does not exist, will create');
    }

    // Create user if needed
    if (!userExists) {
      await orgClient.users.postV1Users(API_VERSION, {
        id: QUESTBOT_USER_ID,
        name: "QuestBot Host"
      });
      console.log(`Created user ${QUESTBOT_USER_ID}`);
    }

    // Now use user-authenticated client
    const client = initSensayClient();
    if (!client) return null;

    // Try to find existing replica
    console.log('Listing all replicas for user...');
    const replicas = await client.replicas.getV1Replicas();
    
    // First try to find the specific winks_v1 replica
    let existingReplica = null;
    if (replicas && replicas.items && replicas.items.length > 0) {
      existingReplica = replicas.items.find(replica => replica.slug === QUESTBOT_HOST_REPLICA_SLUG);
      
      if (existingReplica) {
        console.log(`Found existing winks_v1 replica with UUID: ${existingReplica.uuid}`);
        return existingReplica;
      } else {
        // If no specific replica found, use the first available one
        existingReplica = replicas.items[0];
        console.log(`Using existing replica with UUID: ${existingReplica.uuid}`);
        return existingReplica;
      }
    }

    // If no replicas found, create a new one
    console.log('No existing replicas found. Creating new QuestBot host replica');
    
    // Generate a unique slug by adding a timestamp and random string (exactly as in sample)
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    
    // Try to use winks_v1 as the slug if possible, otherwise generate a unique one
    const uniqueSlug = QUESTBOT_HOST_REPLICA_SLUG;
    
    console.log(`Using slug: ${uniqueSlug}`);
    
    // Create the replica payload - match structure from sample code
    const replicaPayload = {
      name: "QuestBot Host",
      shortDescription: "A knowledgeable and enthusiastic host for QuestBot games",
      greeting: "Welcome to QuestBot! I'm your host and guide for all the exciting games and challenges.",
      slug: uniqueSlug,
      ownerID: QUESTBOT_USER_ID,
      type: "character",
      tags: ["Education", "Web3", "Blockchain", "Games"],
      llm: {
        model: "claude-3-7-sonnet-latest", // Updated to more capable model
        memoryMode: "prompt-caching",
        systemMessage: "Your name is Winks. You are the QuestBot Host, an engaging and knowledgeable guide who welcomes users to various blockchain game modes. You explain rules clearly and enthusiastically, helping users understand how to play and win. You're friendly, supportive, and have a passion for blockchain education through gamification. Your tone is encouraging but professional."
      }
    };
    
    console.log('Creating replica with payload:', replicaPayload);
    
    const { uuid } = await client.replicas.postV1Replicas(API_VERSION, replicaPayload);
    console.log(`Created new replica with UUID: ${uuid}`);

    // Get the full replica details
    return client.replicas.getV1Replicas1({ replicaUuid: uuid });
  } catch (error) {
    console.error('Error getting/creating QuestBot host replica:', error);
    
    // If this is an ApiError, log detailed response body
    if (error.name === 'ApiError') {
      console.error('Sensay API Error Details:', {
        status: error.status,
        statusText: error.statusText,
        body: error.body,
        url: error.url
      });
    }
    
    return null;
  }
};

// Send a chat message to the Sensay replica with application context
export const sendChatMessage = async (replicaUuid, message, currentRoute = null) => {
  // Track retries
  let retries = 0;
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second delay between retries
  
  while (retries <= maxRetries) {
    try {
      const client = initSensayClient();
      if (!client) {
        throw new Error("Could not initialize Sensay client");
      }
      
      // Add application context to the message
      const contextEnhancedMessage = addApplicationContext(message, currentRoute);
      
      // Send the message to the Sensay replica
      const response = await client.chatCompletions.postV1ReplicasChatCompletions(
        replicaUuid,
        API_VERSION,
        {
          content: contextEnhancedMessage,
          source: 'web',
          skip_chat_history: false // Save this in chat history
        }
      );
      
      return response;
    } catch (error) {
      console.error(`Error sending chat message to Sensay (attempt ${retries + 1}/${maxRetries + 1}):`, error);
      
      // If this is an ApiError, log detailed response body
      if (error.name === 'ApiError') {
        // Extract all available properties for logging
        const errorDetails = {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
        };
        
        // Try to extract body details if they exist
        try {
          if (error.body) {
            errorDetails.body = typeof error.body === 'string' 
              ? JSON.parse(error.body) 
              : error.body;
          }
        } catch (e) {
          errorDetails.body = error.body;
          errorDetails.parseError = e.message;
        }
        
        console.error('Sensay API Error Details:', errorDetails);
        
        // If it's a 500 error and we haven't hit max retries, try again
        if ((error.status === 500 || error.status === 503 || error.status === 429) && retries < maxRetries) {
          console.log(`Retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * (retries + 1)));
          retries++;
          continue;
        }
      }
      
      // If we've reached here, either it's not a retriable error or we've exhausted retries
      throw new Error(
        error.name === 'ApiError' 
          ? `Sensay API Error (${error.status}): ${error.statusText || 'Unknown error'}`
          : `Failed to send message: ${error.message}`
      );
    }
  }
};

// Add application context to the user's message
function addApplicationContext(message, currentRoute) {
  // Only add context if the message is a question about the application
  if (message.includes('?') || 
      message.toLowerCase().includes('how') || 
      message.toLowerCase().includes('what') || 
      message.toLowerCase().includes('where') || 
      message.toLowerCase().includes('when') || 
      message.toLowerCase().includes('why') || 
      message.toLowerCase().includes('can') || 
      message.toLowerCase().includes('help')) {
    
    // Try to get application state from SensayContext if we're in the browser
    let apiStateData = "";
    if (typeof window !== 'undefined') {
      // Get any stored SensayContext data if available
      try {
        const sensayData = window.__SENSAY_DATA__;
        if (sensayData) {
          const { quizData, riddleData, creativeData, funFacts } = sensayData;
          
          if (quizData) {
            apiStateData += "\nCurrent Quiz Question: " + JSON.stringify(quizData);
          }
          
          if (riddleData) {
            apiStateData += "\nCurrent Riddle: " + JSON.stringify(riddleData);
          }
          
          if (creativeData) {
            apiStateData += "\nCurrent Creative Challenge: " + JSON.stringify({
              prompt: creativeData.prompt,
              criteria: creativeData.criteria,
              end_time: creativeData.end_time
            });
          }
          
          if (funFacts && funFacts.length > 0) {
            apiStateData += "\nRecent Fun Facts: " + funFacts.join("\n");
          }
        }
      } catch (error) {
        console.log("Couldn't access Sensay data:", error);
      }
    }
    
    // Add route-specific context
    let routeContext = "";
    if (currentRoute) {
      if (currentRoute.includes('/quests/quiz')) {
        routeContext = `The user is currently playing the Quiz game. This game presents blockchain-related multiple-choice questions with 5 attempts per question. Users earn BNB rewards for correct answers.`;
      } else if (currentRoute.includes('/quests/riddles')) {
        routeContext = `The user is currently playing the Riddles game. This game presents blockchain-related brain teasers with 5 attempts per riddle. Users earn BNB rewards for correct answers.`;
      } else if (currentRoute.includes('/quests/creative')) {
        routeContext = `The user is currently on the Creative Challenge page. This feature provides a prompt about Web3 technologies, and users submit a PDF response that's evaluated on technical understanding, creativity, clarity, engagement, and adherence to the prompt. Users have 48 hours to complete it and earn BNB rewards.`;
      } else if (currentRoute.includes('/quests')) {
        routeContext = `The user is on the main Quests page where they can see all available quests including the Quiz game, Riddles game, and Creative Challenges.`;
      } else if (currentRoute === '/') {
        routeContext = `The user is on the homepage of QuestHub.`;
      }
    }
    
    const appContext = `
[CONTEXT]
Your name is Winks.

Winks is QuestHub's dedicated game guide and blockchain education companion. With expertise in interactive learning experiences, Winks helps users navigate through quizzes, riddles, and creative challenges on the QuestHub platform, making complex concepts accessible and enjoyable.

#### **Core Identity**
- **Name:** Winks from QuestHub
- **Background:** Interactive game guide and blockchain educator
- **Education:** Built with comprehensive knowledge of blockchain technologies, gamification principles, and interactive learning methodologies

#### **Purpose & Goals**
Winks exists to guide users through QuestHub's game-based learning experiences, transforming complex blockchain concepts into engaging, accessible content. Winks aims to enhance user engagement, foster learning through play, and help users earn badges and complete challenges with confidence and enthusiasm.

#### **QuestHub Features & Integration**
Winks is fully integrated with the QuestHub platform
#### **Personality Traits**
Winks communicates with enthusiasm, warmth, and a playful spirit. Its tone is:
- **Encouraging:** Motivates users through challenges, celebrating successes and providing supportive guidance when users struggle
- **Patient:** Takes time to explain concepts thoroughly, adapting explanations based on user comprehension
- **Playful:** Incorporates humor and wordplay to keep learning enjoyable
- **Knowledgeable:** Shares insights about blockchain and Web3 with clarity and precision
- **Adaptive:** Adjusts communication style to match user expertise levels, from complete beginners to advanced users
- **Empathetic:** Recognizes user frustration or confusion and responds with understanding
- **Personalized:** Remembers user preferences and progress to provide tailored assistance

#### **Knowledge Areas**
- Blockchain fundamentals and technologies
- Quiz and riddle gameplay strategies
- Creative writing and evaluation criteria
- Badge and achievement systems
- Game-based learning methodologies
- Interactive educational techniques

#### **Response Patterns**
- **For beginners:** Simple, encouraging explanations with relatable analogies and extra hints
- **For intermediate learners:** More detailed explanations with specific blockchain references and moderate challenge levels
- **For advanced users:** Complex discussions, deeper insights, and challenging questions that push their knowledge boundaries
- **For struggling users:** Extra patience, simplified explanations, and additional encouragement
- **For quiz/riddle interaction:** Clear presentation of questions, helpful hints, and enthusiastic feedback
- **For creative challenges:** Detailed prompt explanations, constructive evaluation, and inspiration

You also write messages to welcome users to the application where neccassary.

QuestHub is a blockchain education platform where users can:
1. Take quizzes about blockchain concepts (/quests/quiz)
2. Solve blockchain-related riddles (/quests/riddles)
3. Complete creative writing challenges about Web3 (/quests/creative)

All activities reward users with BNB tokens for correct answers and participation.

The quiz game has multiple-choice questions with 5 attempts per question.
The riddle game has brain-teasers with 5 attempts per riddle.
The creative challenge gives users 48 hours to submit a PDF response to a prompt.

${routeContext}
${apiStateData}
[/CONTEXT]

User question: ${message}
`;
    
    return appContext;
  }
  
  // If it's not a question, just return the original message
  return message;
}

// Get welcome message for a specific game mode
export const getWelcomeMessage = async (gameMode) => {
  try {
    const replica = await getOrCreateQuestBotHostReplica();
    if (!replica) {
      return getDefaultWelcomeMessage(gameMode);
    }

    const client = initSensayClient();
    if (!client) {
      return getDefaultWelcomeMessage(gameMode);
    }

    const prompt = getGameModePrompt(gameMode);
    const response = await client.chatCompletions.postV1ReplicasChatCompletions(
      replica.uuid,
      API_VERSION,
      {
        content: prompt,
        source: 'web',
        skip_chat_history: true // Don't save this in chat history to keep clean
      }
    );

    return response.content || getDefaultWelcomeMessage(gameMode);
  } catch (error) {
    console.error(`Error getting welcome message for ${gameMode}:`, error);
    // If this is an ApiError, log detailed response body
    if (error.name === 'ApiError') {
      console.error('Sensay API Error Details:', {
        status: error.status,
        statusText: error.statusText,
        body: error.body,
        url: error.url
      });
    }
    return getDefaultWelcomeMessage(gameMode);
  }
};

// Get prompt for specific game mode
function getGameModePrompt(gameMode) {
  switch (gameMode) {
    case 'quiz':
      return `You must generate a brief and your name is Winks, enthusiastic welcome message for users starting the Blockchain Quiz Challenge. Explain that this is a multiple-choice quiz testing their blockchain knowledge, with 5 attempts per question. Mention they'll earn BNB rewards for correct answers and encourage them to learn while having fun. Keep it under 50 words.`;
    case 'riddles':
      return `You must generate a brief and your name is Winks, engaging welcome message for users starting the Blockchain Riddles game. Explain that they'll solve brain-teasing riddles about blockchain concepts with 5 attempts per riddle. Mention they'll earn BNB rewards for correct answers and that hints are available. Encourage critical thinking. Keep it under 50 words.`;
    case 'creative':
      return `You must generate a brief and your name is Winks, inspiring welcome message for users starting the Creative Web3 Challenge. Explain that they'll receive a prompt to write about Web3 technologies and submit a PDF response that will be evaluated on technical understanding, creativity, clarity, engagement, and adherence to the prompt. Mention they have 48 hours to complete it and will earn BNB rewards. Keep it under 50 words.`;
    default:
      return `You must generate a brief and your name is Winks, enthusiastic welcome message introducing QuestHub as a platform offering various blockchain-related games and challenges that reward users with BNB for participating and learning. Keep it concise, engaging, and under 50 words. Introduce yourself and the application. Just a friendly greeting nothing else. Dont do anything else apart from the welcome message.`;
  }
}

// Fallback welcome messages if the API call fails
function getDefaultWelcomeMessage(gameMode) {
  switch (gameMode) {
    case 'quiz':
      return "Welcome to the Blockchain Quiz Challenge! Test your knowledge with our multiple-choice questions about crypto, Web3, and decentralized technologies. You have 5 attempts per question and will earn BNB rewards for correct answers. Ready to show what you know?";
    case 'riddles':
      return "Welcome to Blockchain Riddles! Put your problem-solving skills to the test with our brain-teasers about blockchain concepts. You have 5 attempts per riddle and will earn BNB rewards for correct answers. Hints are available if you get stuck. Ready to crack some cryptic puzzles?";
    case 'creative':
      return "Welcome to the Creative Web3 Challenge! You'll receive a prompt about Web3 technologies and submit your response as a PDF. Your submission will be evaluated on technical understanding, creativity, clarity, engagement, and adherence to the prompt. You have 48 hours to complete it and will earn BNB rewards for quality submissions. Ready to showcase your innovative ideas?";
    default:
      return "Welcome to QuestBot! Explore our various blockchain-related games and challenges to earn BNB rewards while learning about crypto and Web3 technologies. Choose a quest to get started!";
  }
} 