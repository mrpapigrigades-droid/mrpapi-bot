from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get', methods=['POST'])
def get_chat_response():
    user_text = request.form['msg']
    return jsonify({"response": chatbot_response(user_text)})

def chatbot_response(text):
    return "VincentAI: " + text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)