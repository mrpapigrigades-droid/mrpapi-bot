from flask import Flask, render_template, request, jsonify, send_file
from transformers import pipeline
from gtts import gTTS
import os
import uuid

app = Flask(__name__)

# Initialize chatbot model
chatbot = pipeline("text-generation", model="microsoft/DialoGPT-medium")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]
    
    # Generate response
    response = chatbot(user_input, max_length=100, num_return_sequences=1)[0]['generated_text']
    
    # Create speech file
    tts = gTTS(response)
    audio_filename = f"static/{uuid.uuid4()}.mp3"
    tts.save(audio_filename)

    return jsonify({"response": response, "audio": audio_filename})

if __name__ == "__main__":
    app.run(debug=True)