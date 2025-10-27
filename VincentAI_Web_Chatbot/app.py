import os
from flask import Flask, render_template, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from gtts import gTTS

app = Flask(__name__)

# Load small GPT-2 model (offline)
MODEL_NAME = "gpt2"  # Replace with local model path if needed
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

# Keep chat history
chat_history_ids = None

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    global chat_history_ids
    user_message = request.json.get("message", "")

    # Encode user input
    new_input_ids = tokenizer.encode(user_message + tokenizer.eos_token, return_tensors='pt')
    bot_input_ids = torch.cat([chat_history_ids, new_input_ids], dim=-1) if chat_history_ids is not None else new_input_ids

    # Generate response
    chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
    bot_reply = tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)

    # Generate TTS
    tts = gTTS(bot_reply)
    audio_path = "static/bot_audio.mp3"
    tts.save(audio_path)

    return jsonify({"reply": bot_reply, "audio": audio_path})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)