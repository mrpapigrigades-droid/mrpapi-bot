document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");

    const menuBtn = document.getElementById("menu-btn");
    const historyPanel = document.getElementById("history-panel");
    const historyList = document.getElementById("history-list");

    let history = JSON.parse(localStorage.getItem("history") || "[]");

    // Load history into dropdown
    function loadHistory() {
        historyList.innerHTML = "";
        history.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item;
            li.addEventListener("click", () => {
                userInput.value = item;
                historyPanel.style.maxHeight = "0";
            });
            historyList.appendChild(li);
        });
    }

    loadHistory();

    function appendMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageDiv.innerText = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage("user", text);
        userInput.value = "";

        // SAVE to history
        history.push(text);
        localStorage.setItem("history", JSON.stringify(history));
        loadHistory();

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            const data = await response.json();
            appendMessage("bot", data.reply);

        } catch (error) {
            appendMessage("bot", "⚠️ Connection error. Try again later.");
        }
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // Toggle dropdown
    menuBtn.addEventListener("click", () => {
        if (historyPanel.style.maxHeight === "0px" || historyPanel.style.maxHeight === "") {
            historyPanel.style.maxHeight = "300px";
        } else {
            historyPanel.style.maxHeight = "0";
        }
    });
});