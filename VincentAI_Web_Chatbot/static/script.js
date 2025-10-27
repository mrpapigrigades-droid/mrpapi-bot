async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p class="user"><strong>You:</strong> ${message}</p>`;

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  const response = await fetch("/get_response", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  chatBox.innerHTML += `<p class="bot"><strong>Vincent:</strong> ${data.reply}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  const audio = new Audio(data.audio);
  audio.play();
}