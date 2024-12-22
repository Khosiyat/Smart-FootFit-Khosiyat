from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_foot_image():
    if 'footImage' not in request.files:
        return jsonify({'message': 'No file uploaded'}), 400
    
    file = request.files['footImage']
    file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    return jsonify({'message': 'File uploaded successfully'})

@app.route('/recommend', methods=['GET'])
def recommend_size():
    return jsonify({'size': '10.5 US', 'confidence': '90%'})

if __name__ == '__main__':
    app.run(debug=True)

