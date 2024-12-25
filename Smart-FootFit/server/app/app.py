# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import json
# from werkzeug.utils import secure_filename
# import os

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = 'uploads'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# # Dummy AI recommendation function
# def get_shoe_recommendations(scan_file):
#     # Implement AI model logic here
#     return {"shoe_size": "10", "shoe_model": "Nike Air Zoom"}

# @app.route('/upload_foot_scan', methods=['POST'])
# def upload_foot_scan():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part"}), 400
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400
    
#     filename = secure_filename(file.filename)
#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#     file.save(filepath)

#     # Call AI model to get shoe recommendations based on scan
#     recommendations = get_shoe_recommendations(filepath)
    
#     return jsonify(recommendations), 200

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load the pre-trained model from TensorFlow Hub
model = tf.keras.models.load_model('path_to_saved_model')  # Replace with your model path

# Classes for the model
CLASSES = ['not_foot', 'foot']  # Binary classification

@app.route('/upload_foot_scan', methods=['POST'])
def upload_foot_scan():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    try:
        # Preprocess the image
        img = Image.open(file).convert('RGB').resize((224, 224))
        img_array = np.array(img) / 255.0  # Normalize the image
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Predict using the model
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)[0]

        if CLASSES[predicted_class] == 'not_foot':
            return jsonify({'error': 'Please upload a feet pic'}), 400

        # If it's a foot image, recommend a shoe (example logic)
        recommendations = {
            'shoe_size': 42,
            'shoe_model': 'Nike Air Max',
        }
        return jsonify(recommendations)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
