import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Homepage route
@app.route("/")
def home():
    return render_template("index.html")

# Chatbot response route
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    
    # Here you can put your chatbot logic
    # For now, it just echoes the user message
    response = f"You said: {user_message}"

    return jsonify({"reply": response})

if __name__ == "__main__":
    # Render provides PORT environment variable
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)