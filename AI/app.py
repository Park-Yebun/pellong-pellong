from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BartForConditionalGeneration, PreTrainedTokenizerFast
import torch

app = Flask(__name__)

UPLOAD_FOLDER = 'static'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model_path = './static'

try:
    model = BartForConditionalGeneration.from_pretrained(model_path).to(device)
    tokenizer = PreTrainedTokenizerFast.from_pretrained(model_path)
except Exception as e:
    print(f"Error loading model or tokenizer: {e}")
    raise

@app.route('/translate', methods=['POST'])
def translate():
    try:
        data = request.json
        input_text = data.get("input_text")
        direction = data.get("direction")  # "to_standard" or "to_jeju"
        
        if not input_text or not direction:
            return jsonify({"error": "Invalid input"}), 400
        
        jeju_token = "[제주]"
        standard_token = "[표준]"

        if direction == "to_standard":
            input_text = jeju_token + " " + input_text
        elif direction == "to_jeju":
            input_text = standard_token + " " + input_text
        else:
            return jsonify({"error": "Invalid direction"}), 400

        print(f"입력데이터 : {input_text}")

        inputs = tokenizer(input_text, return_tensors="pt").to(device)

        print(f"토큰화 데이터 : {inputs}")
        
        if 'token_type_ids' in inputs:
            del inputs['token_type_ids']
        
        if inputs['input_ids'].size(1) == 0:
            return jsonify({"error": "토큰화 후 빈 값 입력"}), 400
        
        outputs = model.generate(**inputs, max_length=64)
        
        translated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return jsonify({"translated_text": translated_text})
    except Exception as e:
        print(f"번역에러: {e}")
        return jsonify({"error": "서버에러"}), 500

if __name__ == '__main__':
    app.run()