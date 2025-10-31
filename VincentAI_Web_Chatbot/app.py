def download_model_from_drive(file_id, destination):
    """Download large model file from Google Drive if not already present."""
    if not os.path.exists(destination):
        print("📥 Downloading model from Google Drive...")
        URL = f"https://drive.google.com/uc?export=download&id={file_id}"
        response = requests.get(URL)
        if response.status_code == 200:
            with open(destination, "wb") as f:
                f.write(response.content)
            print("✅ Model downloaded successfully.")
        else:
            print(f"❌ Failed to download model. Status: {response.status_code}")
    else:
        print("✅ Model already exists locally.")

# Create models folder and download model if needed
MODEL_PATH = "models/model.safetensors"
os.makedirs("models", exist_ok=True)

# Replace below with your actual Google Drive file ID
GOOGLE_DRIVE_FILE_ID = "YOUR_FILE_ID_HERE"

# download_model_from_drive(GOOGLE_DRIVE_FILE_ID, MODEL_PATH)

# ======================================
# STEP 2: CHATBOT LOGIC
# ======================================

default_responses = [
    "Haha 😆, you got me thinking!",
    "I’m all ears 👂, tell me more!",
    "Whoa, that’s interesting 🤯",
    "LOL 😂 — you really cracked me up!",
    "Hmm… let me process that 🤖"
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_msg = request.json.get('message', '').lower()
    bot_reply = ""

    # Greetings
    if 'hey' in user_msg or 'hi' in user_msg:
        bot_reply = "Hello 😎, how may I help you?"
    elif 'who is the kenyan president' in user_msg:
        bot_reply = "William Ruto."
    elif 'who made you' in user_msg:
        bot_reply = "Vincent Kimani made me."
    elif 'who are you' in user_msg:
        bot_reply = "I’m MrPapi CyBot 🤖."
    elif 'niaje' in user_msg:
        bot_reply = "Poa sana! Niambie nikusaidie vipii leo."

    # Football
    elif 'who is ronaldo' in user_msg:
        bot_reply = "Ronaldo is a Portuguese footballer and captain of Al Nassr."
    elif 'who is messi' in user_msg:
        bot_reply = "Messi is an Argentinian footballer who plays for Inter Miami."
    elif 'who is lamine yamal' in user_msg:
        bot_reply = "Yamal is a forward at FC Barcelona and Spain national team."
    elif 'who is marcus rashford' in user_msg:
        bot_reply = "He's an English forward who plays for Manchester United."
    elif 'name top ten teams in the world' in user_msg:
        bot_reply = "Real Madrid, FC Barcelona, Bayern Munich, Liverpool, Manchester City, Manchester United, Chelsea, Arsenal, Atletico Madrid, PSG."
    elif 'who is known as the king of ucl' in user_msg:
        bot_reply = "Cristiano Ronaldo 👑 — the King of the UEFA Champions League."

    # Kenyan facts
    elif 'where is bang sold in kenya' in user_msg:
        bot_reply = "Juja 😂"
    elif 'which is the best place to live in kenya' in user_msg:
        bot_reply = "Probably Juja or Runda depending on your vibe!"
    elif 'what is the kenyan currency' in user_msg:
        bot_reply = "Kenyan Shilling (KES) 🇰🇪"
    elif 'top 10 universities in kenya' in user_msg:
        bot_reply = "UoN, KU, JKUAT, Strathmore, Egerton, Moi, USIU-A, MKU, TUK, Maseno."

    # Music / Thanks
    elif 'thank you' in user_msg or 'thanks' in user_msg:
        bot_reply = "You're welcome 🙌"
    elif 'bye' in user_msg:
        bot_reply = "Catch you later ✌️ Stay awesome!"

    # ✅ NEW: If bot has no answer → custom response
    else:
        bot_reply = "Vincent Kimani has not put that memory on me, thank you."

    return jsonify({"reply": bot_reply})


# ======================================
# STEP 3: HEALTH CHECK (Render)
# ======================================
@app.route('/health')
def health():
    return "✅ App is healthy!", 200


# ======================================
# STEP 4: RUN APP
# ======================================
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)