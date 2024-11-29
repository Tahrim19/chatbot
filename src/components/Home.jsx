import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { generateContent } from './Model'; 
import ReactMarkdown from 'react-markdown'; // to render markdown responses
import './home.css'

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClear = () => {
    setUserInput('');
    setResponse([]);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setResponse([{ type: "system", message: "Please enter a prompt.." }]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await generateContent(userInput);
      setResponse(prevResponse => [
        ...prevResponse,
        { type: "user", message: userInput },
        { type: "bot", message: res()},
      ]);
      setUserInput('');
    } catch (err) {
      console.error("Error generating response:", err);
      setResponse(prevResponse => [
        ...prevResponse,
        { type: "system", message: "Failed to generate response" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-container">
      {response.length === 0 ? (
        <h1>Got Questions? Chatty's Got Answers.</h1> 
      ) : (
        <div className="chat-history">
          {response.map((msg, index) => (
            <p key={index} className={`message ${msg.type}`}>
              <ReactMarkdown>{msg.message}</ReactMarkdown>
            </p>
          ))}
          {isLoading && <p className="loading-text">Generating response...</p>}
        </div>
      )}

      <div className="input-container">
        <button onClick={handleClear} className="clear-btn">Clear</button>

        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          className="chat-input"
        />

        <button onClick={handleSubmit} className="send-btn">
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}
