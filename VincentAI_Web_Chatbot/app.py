from flask import Flask, render_template, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import pyttsx3

app = Flask(__name__)

# Load tokenizer & model
tokenizer = AutoTokenizer.from_pretrained("./model")
model = AutoModelForCausalLM.from_pretrained("./model")

# TTS setup (male voice)
engine = pyttsx3.init()
voices = engine.getProperty('voices')
for v in voices:
    if "male" in v.name.lower():
        engine.setProperty('voice', v.id)
        break
engine.setProperty('rate', 160)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    user_input = request.json.get("message")
    inputs = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors="pt")
    outputs = model.generate(inputs, max_length=200, pad_token_id=tokenizer.eos_token_id)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Speak response
    engine.say(response)
    engine.runAndWait()

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)