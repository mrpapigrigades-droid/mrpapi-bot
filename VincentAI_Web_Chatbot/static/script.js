const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.querySelector(".chat-box");
const historyList = document.getElementById("history-list");
const themeBtn = document.getElementById("themeBtn");

// ------------------------
// Theme toggle
// ------------------------
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
});

// ------------------------
// Send message on button click
// ------------------------
sendBtn.addEventListener("click", async () => {
    sendMessage();
});

// ------------------------
// Send message on Enter key
// ------------------------
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent newline
        sendMessage();
    }
});

// ------------------------
// Main send message function
// ------------------------
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage("user", text);
    userInput.value = "";

    const reply = await getBotReply(text);
    appendMessage("bot", reply, "CyBot 🤖");
}

// ------------------------
// Fetch bot reply
// ------------------------
async function getBotReply(message) {
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data.reply;
    } catch (err) {
        console.error(err);
        return "Sorry, I can't reply right now.";
    }
}

// ------------------------
// Append message to chat
// ------------------------
function appendMessage(sender, text, botName = "") {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    const textSpan = document.createElement("span");
    textSpan.classList.add("message-text");

    if (sender === "bot") {
        textSpan.innerText = `${botName}: ${text}`;

        // Add to history panel
        const historyDiv = document.createElement("div");
        historyDiv.classList.add("history-item");
        historyDiv.innerText = `${botName}: ${text}`;
        historyDiv.addEventListener("click", () => appendMessage("user", text));
        historyList.appendChild(historyDiv);
        historyList.scrollTop = historyList.scrollHeight;

    } else {
        textSpan.innerText = text;
    }

    messageDiv.appendChild(textSpan);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}