from flask import Flask, render_template, request, jsonify
from gtts import gTTS
import os

app = Flask(__name__)

# Lightweight chatbot function (no heavy AI model)
def chatbot_response(user_text):
    user_text = user_text.lower()

    # simple smart responses
    if "hello" in user_text or "hi" in user_text:
        return "Hey there! I'm VincentAI. How are you doing today?"
    elif "who are you" in user_text:
        return "I'm VincentAI — your personal chatbot assistant, built by Vincent."
    elif "how are you" in user_text:
        return "I'm doing great, thanks for asking! How about you?"
    elif "bye" in user_text:
        return "Goodbye! Talk to you later 👋"
    elif "your creator" in user_text:
        return "I was created by Vincent Kimani."
    else:
        return "VincentAI: I’m not sure how to respond to that yet, but I’m learning!"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def chat():
    user_input = request.form["msg"]
    bot_reply = chatbot_response(user_input)
    return jsonify({"response": bot_reply})

@app.route("/voice", methods=["POST"])
def voice_reply():
    user_input = request.form["msg"]
    bot_reply = chatbot_response(user_input)

    # Generate voice reply using gTTS
    tts = gTTS(bot_reply)
    audio_path = "static/reply.mp3"
    tts.save(audio_path)

    return jsonify({"response": bot_reply, "audio": audio_path})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)