from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# --- Simple AI responses ---
cyborg_replies = [
    "Greetings, human. I am CyBot, MrPapi’s AI assistant 🤖",
    "Running a quick scan... everything looks stable ⚡",
    "Cyborg online — how can I assist you today?",
    "Processing that... one sec 🧠",
    "MrPapi mode activated! Ready to chat 🔥"
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get', methods=['POST'])
def chatbot_reply():
    user_msg = request.form.get('msg').lower()

    if "hello" in user_msg or "hi" in user_msg:
        bot_text = "Hey there! I’m MrPapi CyBot 👾 How are you feeling today?"
    elif "name" in user_msg:
        bot_text = "I’m CyBot — a smart assistant built by MrPapi 💪"
    elif "who" in user_msg:
        bot_text = "I’m VincentAI, your friendly dark-mode cyborg assistant 🤖"
    elif "help" in user_msg:
        bot_text = "Sure! I can chat, give info, and make your day smoother 😎"
    else:
        bot_text = random.choice(cyborg_replies)

    return jsonify({'reply': bot_text})

@app.route('/healthz')
def health_check():
    return "OK", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)