const chatBox = document.getElementById("chatBox");
const typingIndicator = document.getElementById("typingIndicator");
const body = document.body;
const themeBtn = document.getElementById("themeToggle");

// Load theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    themeBtn.textContent = "☀️ Light";
}

// Toggle theme
themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️ Light";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙 Dark";
    }
});

function sendMessage() {
    const text = document.getElementById("userInput").value;
    if (text.trim() === "") return;

    chatBox.innerHTML += `
        <div class="message user-message">${text}</div>
    `;

    document.getElementById("userInput").value = "";
    typingIndicator.style.display = "block";

    fetch("/ask", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: text})
    })
    .then(r => r.json())
    .then(data => {
        typingIndicator.style.display = "none";

        chatBox.innerHTML += `
            <div class="message bot-message">
                <img src="/static/cybot.png" class="bot-avatar">
                <div>${data.reply}</div>
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;
    });
}