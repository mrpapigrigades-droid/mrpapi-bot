const form = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userInput = document.getElementById("user_input").value;
    if (!userInput) return;

    // Display user message
    const userMsg = document.createElement("p");
    userMsg.innerHTML = `<strong>You:</strong> ${userInput}`;
    chatBox.appendChild(userMsg);

    // Clear input
    document.getElementById("user_input").value = "";

    // Send to Flask
    const response = await fetch("/ask", {
        method: "POST",
        body: new URLSearchParams({ user_input: userInput }),
    });

    const data = await response.json();
    const botMsg = document.createElement("p");
    botMsg.innerHTML = `<strong>VincentAI:</strong> ${data.answer}`;
    chatBox.appendChild(botMsg);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
});
