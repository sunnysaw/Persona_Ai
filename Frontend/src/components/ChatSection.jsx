import { useState } from "react";
import { sendUserQuery } from "../services/backendConnection.js";

function ChatSection() {
  const [userQuery, setUserQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [isScroll, setScroll] = useState(false);

  const sendQuery = async () => {
    setDisableButton(true);
    setScroll(true);
    if (!userQuery.trim()) {
      setDisableButton(false);
      return;
    }
    const newMessage = { sender: "user", text: userQuery };
    setChatHistory((prev) => [...prev, newMessage]);
    setUserQuery("");

    try {
      const backendResponse = await sendUserQuery(userQuery);
      console.log(backendResponse);

      const aiMessage = {
        sender: "ai",
        text: backendResponse?.success
          ? backendResponse.result
          : "AI couldn't respond. Please try again.",
      };
      setDisableButton(false);
      setScroll(false);
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending query:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: "Error occurred while getting response." },
      ]);
      setDisableButton(false);
      setScroll(false);
    }
  };

  const scrollEffect = () => {
    if (isScroll) {
      return (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-3 text-blue-600 font-semibold">Loading...</p>
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex-none p-4 bg-gray-800 text-center text-lg font-semibold shadow-md">
        🤖 AI Chat Assistant
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        {chatHistory.length === 0 ? (
          <p className="text-gray-400 text-center mt-10 flex-1 flex items-center justify-center">
            Start chatting with your AI assistant 👋
          </p>
        ) : (
          <>
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl shadow-md ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-700 text-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Spinner */}
            {isScroll && scrollEffect()}
          </>
        )}
      </div>

      {/* Input Section */}
      <div className="flex-none p-3 bg-gray-800 flex items-center space-x-2 border-t border-gray-700">
        <input
          type="text"
          placeholder="Ask as per context..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disableButton) {
              sendQuery();
            }
          }}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
        />
        <button
          onClick={sendQuery}
          disabled={disableButton}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium shadow transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatSection;
