
# import asyncio
# import cv2
# import websockets
# import numpy as np
# import uvcham

# async def send_camera_feed(websocket, path):
#     camera = cv2.VideoCapture(0)  # Open the camera (change index if multiple cameras)
    
#     while True:
#         ret, frame = camera.read()  # Read a frame from the camera
#         if not ret:
#             break
        
#         # Convert the frame to JPEG format
#         _, buffer = cv2.imencode('.jpg', frame)
#         jpg_bytes = buffer.tobytes()
        
#         # Send the frame to the client over websocket
#         await websocket.send(jpg_bytes)

# async def start_server():
#     async with websockets.serve(send_camera_feed, "localhost", 8765):
#         await asyncio.Future()  # Run forever

# asyncio.run(start_server())
import asyncio
import websockets
import uvcham
import pythoncom
import cv2
import numpy as np
import time

class CameraStream:
    def __init__(self):
        self.hcam = None
        self.imgWidth = 0
        self.imgHeight = 0
        self.pData = None
        self.frame = 0
        self.count = 0
        

    async def open_camera(self):
        arr = uvcham.Uvcham.enum()
        if len(arr) == 0:
            print("No camera Found")
        else: 
            self.hcam = uvcham.Uvcham.open(arr[0].id)
            print(dir(self.hcam))
            print(self.hcam.pull.__doc__)
            print('name = {} id = {}'.format(arr[0].displayname, arr[0].id))
            if self.hcam:
                self.frame = 0
                res = self.hcam.get(uvcham.UVCHAM_RES)
                self.hcam.put(uvcham.UVCHAM_FLIPVERT, 1)
                self.imgWidth = self.hcam.get(uvcham.UVCHAM_WIDTH | res)
                self.imgHeight = self.hcam.get(uvcham.UVCHAM_HEIGHT | res)
                self.pData = bytes(uvcham.TDIBWIDTHBYTES(self.imgWidth * 24) * self.imgHeight)
                try:
                    self.hcam.start(None, self.cameraCallback, self)
                    # self.hcam.put(uvcham.)
                    # self.hcam.put(uvcham.)
                except:
                    self.closeCamera()
                    print("Failed to start camera")
                


    async def send_camera_feed(self, websocket, path):
        await self.open_camera()
        # task = asyncio.create_task(self.handle_client_messages(websocket)) 
        try:
            while True:
                if self.pData is not None:
                    frame_array = bytearray(self.pData)

                    image_array = np.frombuffer(frame_array, dtype=np.uint8)

                    resized_image = cv2.resize(image_array.reshape((self.imgHeight, self.imgWidth, 3)), (1920, 1080))

                    _, buffer = cv2.imencode('.jpg', resized_image)
                    img_bytes = buffer.tobytes()

                    await websocket.send(img_bytes)
        except websockets.exceptions.ConnectionClosed:
            print("Client closed connection.")
        finally:
            self.closeCamera()

    def cameraCallback(self, nEvent, ctx):
        if nEvent == uvcham.UVCHAM_EVENT_IMAGE and self.hcam is not None:
            self.hcam.pull(self.pData)  # Pull Mode

    def closeCamera(self):
        if self.hcam is not None:
            self.hcam.close()
            self.hcam = None
            self.pData = None


async def start_server():
    global app
    app = CameraStream()
    pythoncom.CoInitialize()
    async with websockets.serve(app.send_camera_feed, "localhost", 8765):
        await asyncio.Future()  # Run forever

def get_image():
   if app.pData is not None:
                _, encoded_image = cv2.imencode('.jpg', np.frombuffer(app.pData, dtype=np.uint8).reshape((app.imgHeight, app.imgWidth, 3)))
                return encoded_image




