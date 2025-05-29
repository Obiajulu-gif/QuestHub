"use client";

import React, { useState, useEffect } from "react";
import { getWelcomeMessage } from "@/utils/sensayClient";
import { motion } from "framer-motion";

export default function QuestWelcomeMessage({ gameMode, onClose }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Try to fetch a personalized message from Sensay
  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        setLoading(true);
        const welcomeMessage = await getWelcomeMessage(gameMode);
        // Only update if we got a real message back
        if (welcomeMessage && welcomeMessage.length > 20) {
          setMessage(welcomeMessage);
        }
      } catch (err) {
        console.error("Failed to get welcome message:", err);
        setError("Couldn't load a personalized welcome. Our host is taking a break!");
        // We already set default messages, so no need to update message state here
      } finally {
        // Finish the loading animation
        setLoadingProgress(100);
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchWelcomeMessage();
  }, [gameMode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-6 md:p-8"
      >
        <div className="absolute -top-4 -right-4">
          <button
            onClick={onClose}
            className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-primary/80 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-primary">
            {loading ? "Getting Ready..." : gameMode ? `Welcome to ${gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}` : "Welcome to QuestHub"}
          </h2>
        </div>

        {loading && (
          <div className="mb-4">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="my-6 text-gray-700">
          <p className="whitespace-pre-line">
            {message}
          </p>
          {error && (
            <p className="mt-2 text-sm text-orange-500">
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            disabled={loading && loadingProgress < 50}
            className={`px-6 py-2 rounded-lg bg-primary text-white font-medium transition-all ${
              loading && loadingProgress < 50
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary/80"
            }`}
          >
            {loading ? "Please wait..." : "Let's Go!"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 