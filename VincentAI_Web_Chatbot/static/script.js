const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.querySelector(".chat-box");
const historyList = document.getElementById("history-list");
const themeBtn = document.getElementById("themeBtn");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}

// Theme toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.removeItem("theme");
    }
});

// Send message
sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage("user", text);
    userInput.value = "";
    setTimeout(() => appendMessage("bot", "Echo: " + text), 300);
});

function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    // Create message text span
    const textSpan = document.createElement("span");
    textSpan.classList.add("message-text");
    textSpan.innerText = sender === "user" ? text : "";

    if (sender === "user") {
        messageDiv.appendChild(textSpan);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        // Bot avatar
        const avatar = document.createElement("img");
        avatar.src = "/static/cybot-avatar.png"; // change to your avatar
        avatar.classList.add("avatar");
        messageDiv.appendChild(avatar);

        // Typing animation
        const typing = document.createElement("div");
        typing.classList.add("typing-dots");
        typing.innerHTML = "<span>•</span><span>•</span><span>•</span>";
        messageDiv.appendChild(typing);

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            messageDiv.removeChild(typing);
            messageDiv.appendChild(textSpan);

            // Add to history panel
            const historyDiv = document.createElement("div");
            historyDiv.classList.add("history-item");

            const historyAvatar = document.createElement("img");
            historyAvatar.src = "/static/cybot-avatar.png";
            historyAvatar.classList.add("avatar");
            historyDiv.appendChild(historyAvatar);

            const historyText = document.createElement("span");
            historyText.innerText = text;
            historyDiv.appendChild(historyText);

            // Click to resend
            historyDiv.addEventListener("click", () => appendMessage("user", text));

            historyList.appendChild(historyDiv);
            historyList.scrollTop = historyList.scrollHeight;
        }, 800); // typing delay
    }
}