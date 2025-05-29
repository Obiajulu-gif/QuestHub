"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initSensayClient, getOrCreateQuestBotHostReplica, sendChatMessage } from "@/utils/sensayClient";
import { usePathname } from "next/navigation";

const API_VERSION = "2025-03-25";
const STORAGE_KEY = "questbot_chat_messages";

export default function SensayChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [replica, setReplica] = useState(null);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const pathname = usePathname();

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      if (storedMessages) {
        // Parse and fix date objects (JSON.parse doesn't restore Date objects)
        const parsedMessages = JSON.parse(storedMessages).map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      }
    } catch (err) {
      console.error("Failed to load chat messages from localStorage:", err);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (err) {
        console.error("Failed to save chat messages to localStorage:", err);
      }
    }
  }, [messages]);

  // Initialize the Sensay replica when the component mounts
  useEffect(() => {
    const initializeReplica = async () => {
      try {
        setError(null);
        const replicaData = await getOrCreateQuestBotHostReplica();
        if (replicaData) {
          setReplica(replicaData);
          
          // Only add welcome message if there are no messages
          if (messages.length === 0) {
            setMessages([
              {
                id: "welcome",
                content: replicaData.greeting || "Welcome to QuestHub! How can I help you with your blockchain quests today?",
                isUser: false,
                timestamp: new Date(),
              },
            ]);
          }
        } else {
          setError("Could not initialize the QuestBot host. Please try again later.");
        }
      } catch (err) {
        console.error("Failed to initialize Sensay replica:", err);
        setError("An error occurred while setting up the chat assistant. Please try again later.");
      }
    };

    if (isOpen && !replica) {
      initializeReplica();
    }
  }, [isOpen, replica, messages.length]);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const retryLastMessage = async () => {
    if (!lastFailedMessage) return;
    
    setIsRetrying(true);
    await sendMessage(null, lastFailedMessage);
    setIsRetrying(false);
    setLastFailedMessage(null);
  };

  const sendMessage = async (e, retryContent = null) => {
    e?.preventDefault();
    
    const messageContent = retryContent || inputMessage;
    
    if (!messageContent.trim() || (isLoading && !retryContent) || !replica) return;
    
    // Only add user message to the chat if this is not a retry
    if (!retryContent) {
      const userMessage = {
        id: `user-${Date.now()}`,
        content: messageContent,
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage("");
    }
    
    setIsLoading(true);
    
    try {
      // Use the new sendChatMessage function with route context
      const response = await sendChatMessage(replica.uuid, messageContent, pathname);
      
      // Add the response to the messages
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          content: response.content || "I'm sorry, I couldn't process your request at this time.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      
      // Clear any previous errors
      setError(null);
    } catch (err) {
      console.error("Failed to send message to Sensay:", err);
      
      // Store the failed message for retry
      if (!retryContent) {
        setLastFailedMessage(messageContent);
      }
      
      // Determine a user-friendly error message
      let errorMessage = "I'm sorry, I couldn't process your message at this time. Please try again later.";
      
      if (err.message.includes("500") || err.message.includes("503")) {
        errorMessage = "I'm experiencing some technical difficulties right now. Please try again in a moment.";
      } else if (err.message.includes("429")) {
        errorMessage = "I'm handling too many requests right now. Please try again in a moment.";
      } else if (err.message.includes("401") || err.message.includes("403")) {
        errorMessage = "I'm having trouble with authentication. This might be an issue with the API key.";
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: errorMessage,
          isUser: false,
          timestamp: new Date(),
          isError: true,
          canRetry: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    // Keep only the welcome message
    const welcomeMessage = messages.find(msg => msg.id === "welcome");
    const newMessages = welcomeMessage ? [welcomeMessage] : [];
    setMessages(newMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    setLastFailedMessage(null);
  };

  const reinitializeReplica = async () => {
    setReplica(null);
    
    try {
      const replicaData = await getOrCreateQuestBotHostReplica();
      if (replicaData) {
        setReplica(replicaData);
        setError(null);
      } else {
        setError("Could not initialize the QuestBot host. Please try again later.");
      }
    } catch (err) {
      console.error("Failed to reinitialize Sensay replica:", err);
      setError("An error occurred while setting up the chat assistant. Please try again later.");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-96 max-h-[32rem] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">QuestBot Assistant</h3>
                  <p className="text-xs text-white/80">Powered by Sensay AI</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="p-1 rounded-full hover:bg-white/20"
                  aria-label="Clear chat"
                  title="Clear chat history"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
                <button
                  onClick={reinitializeReplica}
                  className="p-1 rounded-full hover:bg-white/20"
                  aria-label="Reconnect"
                  title="Reconnect to Sensay AI"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 22v-6h6"></path>
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/20"
                  aria-label="Close chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {error ? (
                <div className="bg-red-50 text-red-800 p-3 rounded-lg mb-2">
                  <p>{error}</p>
                  <button 
                    onClick={reinitializeReplica}
                    className="mt-2 text-sm font-medium px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                  >
                    Try reconnecting
                  </button>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/30 mb-2"></div>
                    <div className="h-2 w-24 bg-primary/30 rounded"></div>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 ${
                      msg.isUser ? "flex justify-end" : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.isUser
                          ? "bg-primary text-white"
                          : msg.isError
                          ? "bg-red-50 text-red-800"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                      <span className="text-xs opacity-70 block mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {msg.isError && msg.canRetry && lastFailedMessage && (
                        <button
                          onClick={retryLastMessage}
                          disabled={isRetrying}
                          className="mt-2 text-xs font-medium px-2 py-1 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                        >
                          {isRetrying ? "Retrying..." : "Retry message"}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="rounded-lg p-3 max-w-[80%] bg-white border border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading || !replica}
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim() || !replica}
                  className={`p-2 bg-primary text-white rounded-r-lg ${
                    isLoading || !inputMessage.trim() || !replica
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/90"
                  }`}
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 