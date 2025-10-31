const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const themeBtn = document.getElementById("themeBtn");

async function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    // Show user message
    let userBubble = document.createElement("div");
    userBubble.className = "user-msg";
    userBubble.textContent = text;
    chatBox.appendChild(userBubble);
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

    // Fetch bot response
    let response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    let data = await response.json();

    // Bot message
    let botBubble = document.createElement("div");
    botBubble.className = "bot-msg";
    botBubble.textContent = data.reply;
    chatBox.appendChild(botBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

/* Theme switch */
themeBtn.onclick = () => {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        themeBtn.textContent = "🌞 Light";
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        themeBtn.textContent = "🌙 Dark";
    }
};
