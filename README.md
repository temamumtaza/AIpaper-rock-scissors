# Paper-Rock-Scissors AI Game

An interactive web application that uses your webcam to play the classic Paper-Rock-Scissors game against an AI opponent.

## Features

* Real-time hand gesture detection using TensorFlow.js and the Handpose model
* Recognition of three gestures: rock, paper, and scissors
* Random AI opponent selection
* Score tracking
* Responsive design for various screen sizes

## How It Works

1. The application accesses your webcam (with permission)
2. It uses the TensorFlow.js Handpose model to detect hand landmarks
3. Custom gesture recognition algorithms identify if you're showing rock, paper, or scissors
4. When a gesture is detected, the AI randomly selects its move
5. The winner is determined and the score is updated

## Requirements

* A modern web browser (Chrome, Firefox, Edge, or Safari)
* A webcam
* Internet connection (to load the TensorFlow.js models)

## Getting Started

There are two ways to run this application:

### Option 1: Using Python to start a local server

1. Make sure you have Python installed on your computer
2. Open a terminal/command prompt
3. Navigate to the project directory
4. Run the Python server script:

```bash
python server.py
```

The application will open automatically in your default web browser.

### Option 2: Using any HTTP server

1. Start any HTTP server in the project directory
2. Open the application in your web browser

## Usage Instructions

1. Allow camera access when prompted
2. Show your hand gesture (rock, paper, or scissors) to the camera
3. The AI will randomly choose its gesture
4. The winner gets a point!
5. Use the "Reset Score" button to start over

## Gestures

* **Rock**: Make a fist
* **Paper**: Open your hand with fingers extended
* **Scissors**: Extend only your index and middle fingers

## Troubleshooting

* **Camera not working**: Make sure you've granted camera permissions to the application
* **Gestures not recognized**: Try adjusting your hand position or lighting
* **Slow performance**: The application requires a decent amount of processing power for hand detection. Close other applications to improve performance.

## Credits

* TensorFlow.js: https://www.tensorflow.org/js
* Handpose model: https://github.com/tensorflow/tfjs-models/tree/master/handpose