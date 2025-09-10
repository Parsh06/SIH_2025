import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { farmerAPI } from '../services/api';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "നമസ്കാരം! ഞാൻ ക്രിഷി സഖി. എങ്ങനെ സഹായിക്കാൻ കഴിയും?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [farmerDetails, setFarmerDetails] = useState(null);

  // Fetch farmer details when user is available
  useEffect(() => {
    const fetchFarmerDetails = async () => {
      if (user?.uid) {
        try {
          const details = await farmerAPI.getFullDetails(user.uid);
          console.log('Raw farmer details from API:', details);
          
          // Map the data to match FastAPI expected structure
          const mappedFarmerData = {
            farmer: {
              name: details.displayName || details.name || 'Farmer',
              phoneNumber: details.phoneNumber || details.phone || '',
              location: details.location || 'Kerala, India'
            },
            farms: details.farms || [],
            reminders: details.reminders || []
          };
          
          setFarmerDetails(mappedFarmerData);
        } catch (error) {
          console.error('Error fetching farmer details:', error);
          // Set basic farmer details if API call fails
          setFarmerDetails({
            farmer: {
              name: user.displayName || 'Farmer',
              phoneNumber: '',
              location: 'Kerala, India'
            },
            farms: [],
            reminders: []
          });
        }
      }
    };

    fetchFarmerDetails();
  }, [user?.uid]);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim() || !user) return;

    // Add user message to chat
    const newUserMessage = { role: "user", content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Prepare JSON data to match FastAPI endpoint structure
      const chatData = {
        farmer_data: farmerDetails,
        question: userMessage
      };

      console.log('Chat data being sent:', chatData);

      // Convert to pure JSON string
      const jsonData = JSON.stringify(chatData);
      console.log('Sending JSON to FastAPI:', jsonData);

      // Send pure JSON data to FastAPI backend
      const response = await fetch('http://localhost:8000/get-advisory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData
      });

      console.log('Backend response status:', response.status);
      
      // If 422 error, log the response body for debugging
      if (response.status === 422) {
        const errorData = await response.json();
        console.error('422 Validation Error Details:', errorData);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response data:', data);
      
      // Add assistant response to chat - using the correct 'advisory' field
      const assistantMessage = { 
        role: "assistant", 
        content: data.advisory || data.response || data.message || "I'm sorry, I couldn't process your request. Please try again." 
      };
      
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Check if it's a connection error (backend not running)
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        const errorMessage = { 
          role: "assistant", 
          content: "Backend server is not running. Please start your FastAPI server on port 8000 and try again." 
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        // Add error message to chat
        const errorMessage = { 
          role: "assistant", 
          content: `Error: ${error.message}. Please check your backend connection.` 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: "നമസ്കാരം! ഞാൻ ക്രിഷി സഖി. എങ്ങനെ സഹായിക്കാൻ കഴിയും?" }]);
  };

  const value = {
    messages,
    isLoading,
    farmerDetails,
    sendMessage,
    clearChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}