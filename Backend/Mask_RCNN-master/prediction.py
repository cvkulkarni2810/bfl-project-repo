import os
import matplotlib.pyplot as plt
import numpy as np
import sys
import tensorflow as tf
import traceback

ROOT_DIR = os.path.abspath("F:\BFL\Mask_RCNN-master-tf1\Mask_RCNN-master")

# Import Mask RCNN
sys.path.append(ROOT_DIR)  # To find local version of the library
from mrcnn import utils
import mrcnn.model as modellib
from mrcnn import visualize
from mrcnn.model import log
from mrcnn.config import Config


class_names = ["Cutter marks and fish marks","Scratches and Black spots","Fingerprints and stains","Ink marks","Jig Marks","Machining Marks","Overcut","Pocket"]
class BFLConfig(Config):
    """Configuration for training on the nucleus segmentation dataset."""
    # Give the configuration a recognizable name
    NAME = "bfl"

    GPU_COUNT = 1
    IMAGES_PER_GPU = 1

    # Number of classes (including background)
    NUM_CLASSES = 1 + 8  # background + 3 shapes

    # Use small images for faster training. Set the limits of the small side
    # the large side, and that determines the image shape.
    IMAGE_RESIZE_MODE = "square"
    IMAGE_MIN_DIM = 768
    IMAGE_MAX_DIM = 768

    # Use smaller anchors because our image and objects are small
    RPN_ANCHOR_SCALES = (16, 32, 64, 128, 256)  # anchor side in pixels

    # Reduce training ROIs per image because the images are small and have
    # few objects. Aim to allow ROI sampling to pick 33% positive ROIs.
    TRAIN_ROIS_PER_IMAGE = 32

    # Use a small epoch since the data is simple
    STEPS_PER_EPOCH = (512 - 24) // IMAGES_PER_GPU
    VALIDATION_STEPS = max(1, 24 )// IMAGES_PER_GPU


class InferenceConfig(BFLConfig):
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1
    IMAGE_RESIZE_MODE = "square"
    IMAGE_MIN_DIM = 768
    IMAGE_MAX_DIM = 768
    DETECTION_MIN_CONFIDENCE = 0.7
    DETECTION_MAX_INSTANCES=8
    TRAIN_ROIS_PER_IMAGE=16
    RPN_TRAIN_ANCHORS_PER_IMAGE=16
    RPN_ANCHOR_SCALES = (16, 32, 64, 128, 256)


def initalize_model():    
    inference_config = InferenceConfig()
    inference_config.display()
    # Recreate the model in inference mode
    global model
    model = modellib.MaskRCNN(mode="inference", 
                            config=inference_config,
                            model_dir="DEFAULT_LOGS_DIR")

    # Get path to saved weights
    # Either set a specific path or find last trained weights
    model_path = os.path.join(ROOT_DIR, "mask_rcnn_bfl_0020_res4.h5")
    #model_path = model.find_last()

    # Load trained weights
    print("Loading weights from ", model_path)
    model.load_weights(model_path, by_name=True)
    global graph
    graph= tf.get_default_graph()


def predict(image):
    try:
        global model
        global graph
        print(type(image))
        image_array = np.array(image)
        with graph.as_default():
            results = model.detect([image_array], verbose=1)
    
        # print(results)
        r=results[0]
        # print(r)
        for i in range(len(r['class_ids'])):
            r['class_ids'][i] = r['class_ids'][i]-1
            
    # img = np.array(image)
    # img = np.fliplr(img)
        img  =  visualize.display_instances(image_array, r['rois'], r['masks'], r['class_ids'], 
                            class_names, r['scores'], show_mask=False, ax=get_ax())
        print(type(img))
        print(img)
        print(r['class_ids'])
        return img, r['class_ids']
    except Exception as e:
        print(e)
        traceback.print_exc()
    

def get_ax(rows=1, cols=1, size=8):
    _, ax = plt.subplots(rows, cols, figsize=(size*cols, size*rows))
    return ax