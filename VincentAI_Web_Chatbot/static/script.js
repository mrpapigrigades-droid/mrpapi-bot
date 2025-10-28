async function sendMessage() {
    const input = document.getElementById("user-input");
    const msg = input.value;
    if (!msg) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="user-msg">${msg}</div>`;

    const response = await fetch("/ask", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({message: msg})
    }).then(res => res.json());

    chatBox.innerHTML += `<div class="bot-msg">${response.response}</div>`;

    // Play TTS
    const audio = document.getElementById("tts-audio");
    audio.src = "/static/response.mp3";
    audio.play();

    input.value = "";