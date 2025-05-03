# Paper-Rock-Scissors AI Game

An interactive web application that uses your webcam to play the classic Paper-Rock-Scissors game against an AI opponent.

## Features

* Real-time hand gesture detection using TensorFlow.js and the Handpose model
* Recognition of three gestures: rock, paper, and scissors
* Random AI opponent selection
* Score tracking across a 3-round game
* Interactive countdown timer
* Victory and defeat animations
* Responsive design for various screen sizes

## Live Demo

This project is deployed on GitHub Pages and can be accessed here: [https://temamumtaza.github.io/AIpaper-rock-scissors/](https://temamumtaza.github.io/AIpaper-rock-scissors/)

## How It Works

1. The application accesses your webcam (with permission)
2. It uses the TensorFlow.js Handpose model to detect hand landmarks
3. Custom gesture recognition algorithms identify if you're showing rock, paper, or scissors
4. When a gesture is detected during countdown, the AI randomly selects its move
5. The winner is determined and the score is updated
6. After 3 rounds, an overall winner is declared with special animations

## Getting Started

### Running Locally

1. Clone this repository:
   ```
   git clone https://github.com/temamumtaza/AIpaper-rock-scissors.git
   cd AIpaper-rock-scissors
   ```

2. Start a local server using one of these methods:

   **Using Python:**
   ```
   python server.py
   ```
   The application will open automatically in your default web browser.

   **Using any HTTP server:**
   Start any HTTP server in the project directory and open the application in your web browser.

## Usage Instructions

1. Allow camera access when prompted
2. Press "Start Game" to begin the 3-round match
3. When the countdown appears, show your hand gesture (rock, paper, or scissors)
4. The AI will randomly choose its gesture
5. Win 2 out of 3 rounds to become the champion!
6. Use the "Reset Game" button or "Play Again" to start over

## Gestures

* **Rock**: Make a fist
* **Paper**: Open your hand with fingers extended
* **Scissors**: Extend only your index and middle fingers

## GitHub Pages Deployment

This project is set up to automatically deploy to GitHub Pages when changes are pushed to the main branch. The deployed version will be available at: https://[your-username].github.io/AIpaper-rock-scissors/

## Troubleshooting

* **Camera not working**: Make sure you've granted camera permissions to the application
* **Gestures not recognized**: Try adjusting your hand position or lighting
* **Slow performance**: The application requires a decent amount of processing power for hand detection. Close other applications to improve performance.

## Credits

* TensorFlow.js: https://www.tensorflow.org/js
* Handpose model: https://github.com/tensorflow/tfjs-models/tree/master/handpose
* Canvas Confetti: https://github.com/catdad/canvas-confetti