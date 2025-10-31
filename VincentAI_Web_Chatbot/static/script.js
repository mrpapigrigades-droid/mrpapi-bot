document.addEventListener("DOMContentLoaded", () => {
 document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");
  const clearBtn = document.getElementById("clear-history");

  // ✅ Save chat to local browser history
  function saveHistory(sender, text) {
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.push({ sender, text });
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }

  // ✅ Load history when page opens
  function loadHistory() {
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.forEach(msg => {
      appendMessage(msg.sender, msg.text, false); // do not save again
    });
  }
  loadHistory();

  // ✅ Display chat message
  function appendMessage(sender, text, save = true) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (save) saveHistory(sender, text); // save only new messages
  }

  // ✅ Send message to backend
  async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage("user", text);
    userInput.value = "";

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      // ✅ If bot says it doesn't know — custom message
      const botReply = data.reply || "🤖 Vincent Kimani has not put that memory on me yet. Thank you.";

      appendMessage("bot", botReply);
    } catch (error) {
      appendMessage("bot", "⚠️ Connection error. Try again later.");
    }
  }

  // ✅ Send on button click
  sendBtn.addEventListener("click", sendMessage);

  // ✅ Send on Enter key
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // ✅ Clear history button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("chatHistory");
      chatMessages.innerHTML = "";
    });
  }
});