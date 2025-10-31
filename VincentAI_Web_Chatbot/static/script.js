const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.querySelector(".chat-box");
const historyList = document.getElementById("history-list");
const themeBtn = document.getElementById("themeBtn");

// ---------------------
// THEME TOGGLE
// ---------------------
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
});

// ---------------------
// SEND MESSAGE
// ---------------------
sendBtn.addEventListener("click", async () => {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage("user", text);
    userInput.value = "";

    const reply = await getBotReply(text);
    appendMessage("bot", reply);
});

// ---------------------
// FETCH BOT REPLY
// ---------------------
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

// ---------------------
// APPEND MESSAGE
// ---------------------
function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    const textSpan = document.createElement("span");
    textSpan.classList.add("message-text");
    textSpan.innerText = text;
    messageDiv.appendChild(textSpan);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Add to history only if bot
    if (sender === "bot") {
        const historyDiv = document.createElement("div");
        historyDiv.classList.add("history-item");
        historyDiv.innerText = text;
        historyDiv.addEventListener("click", () => appendMessage("user", text));
        historyList.appendChild(historyDiv);
        historyList.scrollTop = historyList.scrollHeight;
    }
}