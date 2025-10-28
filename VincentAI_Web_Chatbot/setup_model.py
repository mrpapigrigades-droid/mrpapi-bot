from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_PATH = "./model"
MODEL_NAME = "distilgpt2"  # small GPT model, fast, low memory

print("Downloading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
tokenizer.save_pretrained(MODEL_PATH)

print("Downloading model...")
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
model.save_pretrained(MODEL_PATH)

print("Model downloaded and saved to ./model")