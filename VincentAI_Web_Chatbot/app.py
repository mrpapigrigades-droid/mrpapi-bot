from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Simple smart-ish responses
responses = [
    "Hey there! I'm MrPapi CyBot 🤖 — ready to roll!",
    "What's up? Need help with something?",
    "MrPapi CyBot at your service 🚀",
    "Yo, I’m online and fully charged ⚡",
    "Haha, that’s funny 😅 Tell me more!"
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_msg = request.json.get('message', '').lower()
    if 'hey' in user_msg or 'hi' in user_msg:
        bot_reply = "Yo 👋 I'm MrPapi CyBot — your digital buddy!"
    elif 'who' in user_msg:
        bot_reply = "I’m MrPapi CyBot — born in Render labs 💥"
    elif 'bye' in user_msg:
        bot_reply = "Later! Keep vibing 😎"
    else:
        bot_reply = random.choice(responses)
    return jsonify({"reply": bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
