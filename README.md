# Camera Paper-Rock-Scissors AI Game

An interactive web application that uses your webcam to play the classic Paper-Rock-Scissors game against an AI opponent. This project leverages TensorFlow.js and the Handpose model to detect hand gestures in real-time.

## Live Demo

Play the game here: [https://temamumtaza.github.io/camera-paper-rock-scissors/](https://temamumtaza.github.io/camera-paper-rock-scissors/)

## Features

* **Real-time hand gesture detection** using TensorFlow.js and the Handpose model
* **3-round game structure** with score tracking
* **Interactive countdown timer** (3 seconds) for showing gestures
* **Victory and defeat animations**:
  * Colorful fireworks for winning
  * Rain animation for losing
* **Clean, responsive UI** that works on various screen sizes
* **Easy-to-use controls** with Start Game and Reset buttons

## How It Works

1. The application accesses your webcam (with permission)
2. It uses the TensorFlow.js Handpose model to detect hand landmarks
3. Custom gesture recognition algorithms identify rock, paper, or scissors gestures
4. A 3-second countdown gives you time to show your gesture
5. The AI randomly selects its move
6. Winners are determined for each round and after all 3 rounds
7. Special animations display based on the final result

## Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **AI/ML**: TensorFlow.js, Handpose model
* **Animation**: Canvas Confetti for fireworks, CSS animations
* **Deployment**: GitHub Pages

## Getting Started

### Play Online

Visit the [live demo](https://temamumtaza.github.io/camera-paper-rock-scissors/) to play immediately.

### Run Locally

1. Clone this repository:
   ```
   git clone https://github.com/temamumtaza/camera-paper-rock-scissors.git
   cd camera-paper-rock-scissors
   ```

2. Start a local server using one of these methods:

   **Using Python:**
   ```
   python server.py
   ```
   The application will open automatically in your default web browser.

   **Using any HTTP server:**
   If you have Node.js installed:
   ```
   npx http-server
   ```
   Then open `http://localhost:8080` in your browser.

## How to Play

1. Allow camera access when prompted
2. Press "Start Game" to begin a 3-round match
3. When the countdown appears, make your gesture:
   * **Rock**: Make a fist
   * **Paper**: Open your hand with fingers extended
   * **Scissors**: Extend only your index and middle fingers
4. After 3 rounds, see if you've beaten the AI!
5. Enjoy special animations based on your victory or defeat
6. Click "Play Again" or the close button to restart

## Project Structure

```
camera-paper-rock-scissors/
│
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Game logic and AI
├── server.py           # Simple Python server for local testing
└── README.md           # Project documentation
```

## Troubleshooting

* **Camera not working**: Make sure you've granted camera permissions
* **Gestures not recognized**: Try adjusting your hand position, lighting, or distance from camera
* **Slow performance**: The hand detection requires processing power - close other apps if needed
* **Mobile devices**: For best results, use a device with a good front-facing camera

## Future Enhancements

Potential features for future versions:
* Enhanced gesture recognition accuracy
* More detailed hand visualization
* Difficulty levels for the AI
* Multiplayer support
* Customizable gestures

## Credits

* TensorFlow.js: https://www.tensorflow.org/js
* Handpose model: https://github.com/tensorflow/tfjs-models/tree/master/handpose
* Canvas Confetti: https://github.com/catdad/canvas-confetti

## License

MIT License

## Author

[@temamumtaza](https://github.com/temamumtaza) - Built with ❤️ in 2025