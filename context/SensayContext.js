"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for Sensay API data
const SensayContext = createContext({
  quizData: null,
  riddleData: null,
  creativeData: null,
  funFacts: [],
  storeApiData: () => {},
});

export function SensayProvider({ children }) {
  const [apiData, setApiData] = useState({
    quizData: null,
    riddleData: null, 
    creativeData: null,
    funFacts: [],
  });

  // Function to store API data from the app's components
  const storeApiData = (dataType, data) => {
    setApiData(prev => ({
      ...prev,
      [dataType]: data,
    }));
  };

  // Make the API data available to the Sensay client via window object
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__SENSAY_DATA__ = apiData;
    }
  }, [apiData]);

  // Add a special case for fun facts to keep a history
  useEffect(() => {
    const storeFunFact = (data) => {
      if (data && !apiData.funFacts.some(fact => fact === data.facts)) {
        setApiData(prev => ({
          ...prev,
          funFacts: [...prev.funFacts, data.facts].slice(-5), // Keep only last 5 facts
        }));
      }
    };

    // Add event listeners to intercept API responses
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const response = await originalFetch.apply(this, args);
      
      // Clone the response so we can read it and still return it
      const clone = response.clone();
      
      // Process based on the API endpoint
      try {
        const url = args[0].toString();
        
        if (url.includes('/quiz/question')) {
          clone.json().then(data => storeApiData('quizData', data));
        } 
        else if (url.includes('/riddle')) {
          clone.json().then(data => storeApiData('riddleData', data));
        }
        else if (url.includes('/prompt')) {
          clone.json().then(data => storeApiData('creativeData', data));
        }
        else if (url.includes('/fun-fact')) {
          clone.json().then(data => storeFunFact(data));
        }
      } catch (err) {
        console.error("Error processing API response for Sensay context:", err);
      }
      
      return response;
    };

    // Cleanup function to restore original fetch
    return () => {
      window.fetch = originalFetch;
    };
  }, [apiData.funFacts]);

  return (
    <SensayContext.Provider value={{ ...apiData, storeApiData }}>
      {children}
    </SensayContext.Provider>
  );
}

export function useSensayContext() {
  return useContext(SensayContext);
} 