import asyncio
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64
import matplotlib.pyplot as plt
import prediction
import cv2
import websocket
import traceback

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define the Flask route
@app.route('/predict', methods=['POST', 'GET'])
def predict_route():
    #Predict by file upload
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        print(type(file))
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        try:
            image = Image.open(io.BytesIO(file.read()))
            print("image opened")
            predicted_image, classes = prediction.predict(image)
            print("done prediction")
            img_byte_arr = io.BytesIO()
            # predicted_image = Image.fromarray(predicted_image)
            print(type(predicted_image))
            predicted_image.savefig(img_byte_arr, format='PNG')
            img_byte_arr.seek(0)  # Move to the beginning of the byte stream

            # Encode the PNG image data as base64
            img_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')

            # Close the figure to release resources
            plt.close(predicted_image)
            return jsonify({'predicted_image': img_base64, 'classes': classes.tolist()})

        except Exception as e:
            print(e)
            return jsonify({'error': str(e)})
        
    #Predict by pulling image from the camera    
    if request.method == 'GET':
        input_img = websocket.get_image()
        print(type(input_img))
        try:
            image = cv2.imdecode(input_img, cv2.IMREAD_COLOR) 
            print("image opened")
            predicted_image, classes = prediction.predict(image)
            print("done prediction")
            img_byte_arr = io.BytesIO()
            # predicted_image = Image.fromarray(predicted_image)
            print(type(predicted_image))

            predicted_image.savefig(img_byte_arr, format='PNG')
            img_byte_arr.seek(0)  # Move to the beginning of the byte stream

            # Encode the PNG image data as base64
            img_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')

            # Close the figure to release resources
            plt.close(predicted_image)
            return jsonify({'predicted_image': img_base64, 'classes': classes.tolist()})

        except Exception as e:
            print(e)
            traceback.print_exc()
            return jsonify({'error': str(e)})


# Function to start the WebSocket server
async def start_websocket_server():
    await websocket.start_server()

# Function to run Flask app
def run_flask_app():
    app.run(debug=True, use_reloader=False)

# Main function to run both servers concurrently

    # Create a new event loop for asyncio tasks
    # try:
    #     loop = asyncio.new_event_loop()
    #     asyncio.set_event_loop(loop)
        
        # Start the WebSocket server in the event loop
        # websocket_task = asyncio.ensure_future(start_websocket_server(), loop=loop)

    #   prediction.initalize_model()
        
    #     # Start Flask app in a new thread
    #     flask_thread = threading.Thread(target=run_flask_app)
    #     flask_thread.start()
        
    #     # Run the event loop until completion
    #     loop.run_until_complete(websocket_task)
    #     flask_thread.join()
    # except Exception as e:
    #     print(e)
    

if __name__ == '__main__':
    # Create a new event loop for asyncio tasks
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        # Start the WebSocket server in the event loop
        websocket_task = asyncio.ensure_future(start_websocket_server(), loop=loop)

        prediction.initalize_model()
        
        # Start Flask app in a new thread
        flask_thread = threading.Thread(target=run_flask_app)
        flask_thread.start()
        
        # Run the event loop until completion
        loop.run_until_complete(websocket_task)
        flask_thread.join()
    except Exception as e:
        print(e)
