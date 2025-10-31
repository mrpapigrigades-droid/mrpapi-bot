const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const themeBtn = document.getElementById("themeBtn");

// ✅ Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.remove("dark");
    themeBtn.textContent = "🌞 Light";
}

// ✅ Theme toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    if (isDark) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "🌙 Dark";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌞 Light";
    }
});

function timestamp() {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// ✅ Add message to chat
function appendMessage(sender, text, isTyping = false) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    // ✅ Avatar
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = sender === "user" ? "/static/user.png" : "/static/bot.png";

    // ✅ Message text
    const content = document.createElement("div");
    content.classList.add("message-text");

    if (isTyping) {
        content.innerHTML = `<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`;
    } else {
        content.textContent = text;
    }

    // ✅ Timestamp
    const time = document.createElement("div");
    time.classList.add("timestamp");
    time.textContent = timestamp();

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messageDiv.appendChild(time);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return content;
}

// ✅ Send message function
async function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;

    appendMessage("user", msg);
    userInput.value = "";

    // ✅ Bot typing animation
    const typingBubble = appendMessage("bot", "", true);

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        const data = await response.json();

        // ✅ Remove typing bubble & show actual reply
        typingBubble.parentElement.remove();
        appendMessage("bot", data.reply);

    } catch (err) {
        typingBubble.parentElement.remove();
        appendMessage("bot", "⚠️ Error: Unable to reach CyBot.");
    }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});