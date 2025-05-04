// DOM elements
const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');
const userGestureElement = document.getElementById('user-gesture');
const userChoiceElement = document.getElementById('user-choice');
const aiChoiceElement = document.getElementById('ai-choice');
const gameResultElement = document.getElementById('game-result');
const userScoreElement = document.getElementById('user-score');
const aiScoreElement = document.getElementById('ai-score');
const currentRoundElement = document.getElementById('current-round');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const countdownOverlay = document.getElementById('countdown-overlay');
const countdownElement = document.getElementById('countdown');
const resultModal = document.getElementById('result-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const playAgainButton = document.getElementById('play-again-btn');
const closeModalButton = document.getElementById('close-modal');

// Game state
let model;
let userScore = 0;
let aiScore = 0;
let currentRound = 1;
let totalRounds = 3;
let lastGesture = '';
let gameActive = false;
let countdownActive = false;
let gestureDetected = false;
let detectedGesture = null;

// Gestures and their emoji representations
const gestures = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Initialize the camera and handpose model
async function init() {
    try {
        // Set up the camera
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 640,
                height: 480,
                facingMode: 'user'
            }
        });
        videoElement.srcObject = stream;
        
        // Wait for the video to be ready
        await new Promise(resolve => {
            videoElement.onloadedmetadata = () => {
                resolve();
            };
        });
        
        // Set canvas dimensions
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        
        // Load the handpose model
        console.log('Loading handpose model...');
        model = await handpose.load();
        console.log('Handpose model loaded');
        
        // Start detecting hand gestures
        detectHandGestures();
        
        // Enable start button
        startButton.disabled = false;
        
    } catch (error) {
        console.error('Error initializing camera or handpose model:', error);
        alert('Error accessing camera or loading the handpose model. Please ensure you have given camera permissions and are using a supported browser.');
    }
}

// Detect hand gestures from the video stream
async function detectHandGestures() {
    try {
        // Detect hands in the video frame
        const hands = await model.estimateHands(videoElement);
        
        if (hands.length > 0) {
            // Get the landmarks of the first detected hand
            const landmarks = hands[0].landmarks;
            
            // Determine the gesture based on finger positions
            const gesture = recognizeGesture(landmarks);
            
            if (gesture) {
                userGestureElement.textContent = gesture;
                
                // If countdown is active, store the detected gesture
                if (countdownActive && !gestureDetected) {
                    detectedGesture = gesture;
                    gestureDetected = true;
                }
            }
        } else {
            userGestureElement.textContent = 'No hand detected';
        }
        
        // Continue detecting in the next animation frame
        requestAnimationFrame(detectHandGestures);
    } catch (error) {
        console.error('Error detecting hand gestures:', error);
        // Try again after a short delay
        setTimeout(detectHandGestures, 1000);
    }
}

// Recognize the gesture from hand landmarks
function recognizeGesture(landmarks) {
    // Extract finger positions
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    const wrist = landmarks[0];
    
    // Calculate distances between fingertips and the wrist
    const thumbDistance = calculateDistance(thumbTip, wrist);
    const indexDistance = calculateDistance(indexTip, wrist);
    const middleDistance = calculateDistance(middleTip, wrist);
    const ringDistance = calculateDistance(ringTip, wrist);
    const pinkyDistance = calculateDistance(pinkyTip, wrist);
    
    // Calculate distances between fingertips
    const thumbIndexDistance = calculateDistance(thumbTip, indexTip);
    const indexMiddleDistance = calculateDistance(indexTip, middleTip);
    
    // Determine gesture based on finger positions and distances
    
    // Rock: All fingers are curled into a fist
    if (indexDistance < thumbDistance * 1.2 && 
        middleDistance < thumbDistance * 1.2 && 
        ringDistance < thumbDistance * 1.2 && 
        pinkyDistance < thumbDistance * 1.2) {
        return 'rock';
    }
    
    // Paper: All fingers are extended
    if (indexDistance > thumbDistance * 1.2 && 
        middleDistance > thumbDistance * 1.2 && 
        ringDistance > thumbDistance * 1.2 && 
        pinkyDistance > thumbDistance * 1.2) {
        return 'paper';
    }
    
    // Scissors: Index and middle fingers are extended, others are curled
    if (indexDistance > thumbDistance * 1.2 && 
        middleDistance > thumbDistance * 1.2 && 
        ringDistance < thumbDistance * 1.2 && 
        pinkyDistance < thumbDistance * 1.2 && 
        indexMiddleDistance < indexDistance * 0.5) {
        return 'scissors';
    }
    
    // No recognized gesture
    return null;
}

// Calculate the Euclidean distance between two points
function calculateDistance(point1, point2) {
    return Math.sqrt(
        Math.pow(point1[0] - point2[0], 2) + 
        Math.pow(point1[1] - point2[1], 2) + 
        Math.pow(point1[2] - point2[2], 2)
    );
}

// Start game countdown
function startCountdown() {
    countdownActive = true;
    gestureDetected = false;
    detectedGesture = null;
    
    // Show countdown overlay
    countdownOverlay.classList.remove('hidden');
    
    // Start countdown from 3
    let count = 3;
    countdownElement.textContent = count;
    
    const countdownInterval = setInterval(() => {
        count--;
        
        if (count > 0) {
            countdownElement.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownOverlay.classList.add('hidden');
            countdownActive = false;
            
            // Use the last detected gesture or default to rock if none detected
            const userGesture = detectedGesture || 'rock';
            if (!detectedGesture) {
                userGestureElement.textContent = 'Default: rock';
            }
            
            // Play the game with detected gesture
            playGame(userGesture);
        }
    }, 1000);
}

// Play the game with the user's gesture
function playGame(userGesture) {
    // AI randomly selects rock, paper, or scissors
    const gestureOptions = ['rock', 'paper', 'scissors'];
    const aiGesture = gestureOptions[Math.floor(Math.random() * 3)];
    
    // Display the choices
    userChoiceElement.textContent = gestures[userGesture];
    aiChoiceElement.textContent = gestures[aiGesture];
    
    // Remove previous winner/loser classes
    userChoiceElement.classList.remove('winner', 'loser');
    aiChoiceElement.classList.remove('winner', 'loser');
    
    // Determine the winner
    let result;
    if (userGesture === aiGesture) {
        result = "It's a tie!";
    } else if (
        (userGesture === 'rock' && aiGesture === 'scissors') || 
        (userGesture === 'paper' && aiGesture === 'rock') || 
        (userGesture === 'scissors' && aiGesture === 'paper')
    ) {
        result = 'You win this round!';
        userScore++;
        userScoreElement.textContent = userScore;
        userChoiceElement.classList.add('winner');
        aiChoiceElement.classList.add('loser');
    } else {
        result = 'AI wins this round!';
        aiScore++;
        aiScoreElement.textContent = aiScore;
        aiChoiceElement.classList.add('winner');
        userChoiceElement.classList.add('loser');
    }
    
    gameResultElement.textContent = result;
    
    // Check if the game is over
    if (currentRound < totalRounds) {
        currentRound++;
        currentRoundElement.textContent = currentRound;
        
        // Start next round after a delay
        setTimeout(() => {
            if (gameActive) {
                gameResultElement.textContent = 'Get ready for round ' + currentRound;
                setTimeout(() => {
                    if (gameActive) {
                        startCountdown();
                    }
                }, 1500);
            }
        }, 2000);
    } else {
        // Game over - show final result
        setTimeout(() => {
            showFinalResult();
        }, 1500);
    }
}

// Show the final result modal
function showFinalResult() {
    gameActive = false;
    
    if (userScore > aiScore) {
        modalTitle.textContent = 'Victory!';
        modalMessage.textContent = `Congratulations! You won the game with a score of ${userScore}-${aiScore}!`;
        showWinAnimation();
    } else if (aiScore > userScore) {
        modalTitle.textContent = 'Defeat!';
        modalMessage.textContent = `Better luck next time! AI won the game with a score of ${aiScore}-${userScore}.`;
        showLoseAnimation();
    } else {
        modalTitle.textContent = "It's a Tie!";
        modalMessage.textContent = `The game ended in a tie with a score of ${userScore}-${aiScore}.`;
    }
    
    resultModal.classList.remove('hidden');
}

// Show win animation with confetti
function showWinAnimation() {
    // Use canvas-confetti library
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
}

// Show lose animation with rain
function showLoseAnimation() {
    // Create rain drops effect
    const rainContainer = document.createElement('div');
    rainContainer.style.position = 'fixed';
    rainContainer.style.top = '0';
    rainContainer.style.left = '0';
    rainContainer.style.width = '100%';
    rainContainer.style.height = '100%';
    rainContainer.style.overflow = 'hidden';
    rainContainer.style.pointerEvents = 'none';
    rainContainer.style.zIndex = '50';
    document.body.appendChild(rainContainer);
    
    // Create 50 raindrops
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
        rainContainer.appendChild(drop);
    }
    
    // Remove rain after 5 seconds
    setTimeout(() => {
        document.body.removeChild(rainContainer);
    }, 5000);
}

// Reset the game
function resetGame() {
    userScore = 0;
    aiScore = 0;
    currentRound = 1;
    gameActive = false;
    
    userScoreElement.textContent = '0';
    aiScoreElement.textContent = '0';
    currentRoundElement.textContent = '1';
    
    gameResultElement.textContent = 'Make a gesture to start';
    userChoiceElement.textContent = '?';
    aiChoiceElement.textContent = '?';
    
    userChoiceElement.classList.remove('winner', 'loser');
    aiChoiceElement.classList.remove('winner', 'loser');
    
    resultModal.classList.add('hidden');
}

// Start a new game
function startGame() {
    if (gameActive) return;
    
    resetGame();
    gameActive = true;
    
    gameResultElement.textContent = 'Get ready for round 1!';
    
    // Start the first round after a short delay
    setTimeout(() => {
        if (gameActive) {
            startCountdown();
        }
    }, 1000);
}

// Event listeners
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', () => {
    resultModal.classList.add('hidden');
    startGame();
});
closeModalButton.addEventListener('click', () => {
    resultModal.classList.add('hidden');
});

// Initialize the application when the page loads
window.addEventListener('load', init);
