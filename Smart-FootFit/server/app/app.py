from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Dummy AI recommendation function
def get_shoe_recommendations(scan_file):
    # Implement AI model logic here
    return {"shoe_size": "10", "shoe_model": "Nike Air Zoom"}

@app.route('/upload_foot_scan', methods=['POST'])
def upload_foot_scan():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Call AI model to get shoe recommendations based on scan
    recommendations = get_shoe_recommendations(filepath)
    
    return jsonify(recommendations), 200

if __name__ == '__main__':
    app.run(debug=True)
