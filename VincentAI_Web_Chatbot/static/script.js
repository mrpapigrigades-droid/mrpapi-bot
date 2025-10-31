const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.querySelector(".chat-box");
const historyList = document.getElementById("history-list");
const themeBtn = document.getElementById("themeBtn");

// Theme toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
});

// Send message
sendBtn.addEventListener("click", async () => {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage("user", text);
    userInput.value = "";

    const reply = await getBotReply(text);
    appendMessage("bot", reply, "CyBot 🤖");
});

// Fetch bot reply
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

// Append message
function appendMessage(sender, text, botName = "") {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    if (sender === "bot") {
        const avatar = document.createElement("img");
        avatar.src = "/static/cybot-avatar.png";
        avatar.classList.add("avatar");
        messageDiv.appendChild(avatar);

        const textSpan = document.createElement("span");
        textSpan.classList.add("message-text");
        textSpan.innerText = `${botName}: ${text}`;
        messageDiv.appendChild(textSpan);

        const historyDiv = document.createElement("div");
        historyDiv.classList.add("history-item");
        historyDiv.innerText = `${botName}: ${text}`;
        historyDiv.addEventListener("click", () => appendMessage("user", text));
        historyList.appendChild(historyDiv);
        historyList.scrollTop = historyList.scrollHeight;

    } else {
        const textSpan = document.createElement("span");
        textSpan.classList.add("message-text");
        textSpan.innerText = text;
        messageDiv.appendChild(textSpan);
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}