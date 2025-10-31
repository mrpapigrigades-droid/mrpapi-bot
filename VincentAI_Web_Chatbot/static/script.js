document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  // ✅ Load chat history
  let chatHistory = JSON.parse(localStorage.getItem("chat_history")) || [];

  function displayHistory() {
    chatMessages.innerHTML = "";
    chatHistory.forEach(msg => {
      const div = document.createElement("div");
      div.classList.add(msg.sender === "user" ? "user-message" : "bot-message");
      div.innerText = msg.text;
      chatMessages.appendChild(div);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  displayHistory(); // ✅ Show saved messages when page loads

  function saveHistory() {
    localStorage.setItem("chat_history", JSON.stringify(chatHistory));
  }

  function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatMessages.appendChild(messageDiv);

    chatHistory.push({ sender: sender, text: text });
    saveHistory();

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      addMessage("bot", data.reply);

    } catch (error) {
      addMessage("bot", "⚠️ Connection error.");
    }
  }

  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});