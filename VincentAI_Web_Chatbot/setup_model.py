from transformers import AutoModelForCausalLM, AutoTokenizer
import os

if not os.path.exists("./model"):
    os.makedirs("./model")

print("Downloading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained("distilgpt2")
tokenizer.save_pretrained("./model")

print("Downloading model...")
model = AutoModelForCausalLM.from_pretrained("distilgpt2")
model.save_pretrained("./model")

print("Model downloaded and saved to ./model")