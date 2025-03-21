// Game Configuration
const CONFIG = {
    difficulties: {
        easy: { min: 1, max: 100, points: 10, timeLimit: 0 },
        medium: { min: 1, max: 500, points: 20, timeLimit: 15 },
        hard: { min: 1, max: 1000, points: 30, timeLimit: 10 }
    },
    sounds: {
        correct: new Audio('sounds/correct.mp3'),
        wrong: new Audio('sounds/wrong.mp3'),
        levelUp: new Audio('sounds/level-up.mp3')
    },
    animations: {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
};

// Game state
const gameState = {
    currentNumber: 0,
    nextNumber: 0,
    score: 0,
    highScore: localStorage.getItem('highScore') || 0,
    streak: 0,
    bestStreak: localStorage.getItem('bestStreak') || 0,
    difficulty: 'easy',
    timeLeft: 0,
    timer: null,
    combo: 0,
    gameActive: true,
    achievements: JSON.parse(localStorage.getItem('achievements')) || {
        firstWin: false,
        tenStreak: false,
        hundredPoints: false,
        hardModeWin: false
    }
};

// DOM Elements
const currentCard = document.getElementById('current-card');
const nextCard = document.getElementById('next-card');
const currentValue = currentCard.querySelector('.card-value');
const nextValue = nextCard.querySelector('.card-value');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const streakElement = document.getElementById('streak');
const messageElement = document.getElementById('message');
const timerElement = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');
const comboElement = document.getElementById('combo');
const lowerButton = document.getElementById('lower-btn');
const higherButton = document.getElementById('higher-btn');
const newGameButton = document.getElementById('new-game');
const resetScoresButton = document.getElementById('reset-scores');
const gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
const achievementsModal = new bootstrap.Modal(document.getElementById('achievementsModal'));
const finalScoreElement = document.getElementById('final-score');
const finalStreakElement = document.getElementById('final-streak');
const playAgainButton = document.getElementById('play-again');

// Generate random number between min and max (inclusive)
function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize game
function initializeGame() {
    const difficulty = CONFIG.difficulties[gameState.difficulty];
    gameState.currentNumber = generateNumber(difficulty.min, difficulty.max);
    gameState.nextNumber = generateNumber(difficulty.min, difficulty.max);
    gameState.score = 0;
    gameState.streak = 0;
    gameState.combo = 0;
    gameState.gameActive = true;
    gameState.timeLeft = difficulty.timeLimit;

    if (difficulty.timeLimit > 0) {
        startTimer();
    }

    updateUI();
    animateCards('reset');
}

// Update UI
function updateUI() {
    currentValue.textContent = gameState.currentNumber;
    nextValue.textContent = '?';
    scoreElement.textContent = gameState.score;
    highScoreElement.textContent = gameState.highScore;
    streakElement.textContent = `${gameState.streak} (Best: ${gameState.bestStreak})`;
    comboElement.textContent = `x${gameState.combo}`;
    
    if (gameState.timeLeft > 0) {
        timerElement.textContent = gameState.timeLeft + 's';
    }

    // Update difficulty indicator
    document.querySelectorAll('.difficulty-badge').forEach(badge => {
        badge.classList.toggle('active', badge.dataset.difficulty === gameState.difficulty);
    });

    // Enable/disable buttons
    lowerButton.disabled = !gameState.gameActive;
    higherButton.disabled = !gameState.gameActive;
}

// Handle guess
function handleGuess(isHigher) {
    if (!gameState.gameActive) return;

    const correct = isHigher ? 
        gameState.nextNumber > gameState.currentNumber : 
        gameState.nextNumber < gameState.currentNumber;

    // Show next number with animation
    animateCards('reveal');
    nextValue.textContent = gameState.nextNumber;

    if (correct) {
        handleCorrectGuess();
    } else {
        handleWrongGuess();
    }
}

// Handle correct guess
function handleCorrectGuess() {
    const difficulty = CONFIG.difficulties[gameState.difficulty];
    gameState.combo++;
    const comboBonus = Math.floor(gameState.combo / 3) * 5;
    const points = difficulty.points + comboBonus;
    
    gameState.score += points;
    gameState.streak++;
    
    if (gameState.streak > gameState.bestStreak) {
        gameState.bestStreak = gameState.streak;
        localStorage.setItem('bestStreak', gameState.bestStreak);
    }

    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('highScore', gameState.highScore);
        CONFIG.sounds.levelUp.play();
    } else {
        CONFIG.sounds.correct.play();
    }

    showFloatingPoints(points);
    messageElement.textContent = `Correct! +${points} points`;
    messageElement.style.color = '#198754';
    
    checkAchievements();

    // Generate new numbers for next round
    setTimeout(() => {
        gameState.currentNumber = gameState.nextNumber;
        gameState.nextNumber = generateNumber(difficulty.min, difficulty.max);
        animateCards('next');
        updateUI();
    }, 1000);
}

// Handle wrong guess
function handleWrongGuess() {
    CONFIG.sounds.wrong.play();
    handleGameOver();
}

// Handle game over
function handleGameOver() {
    gameState.gameActive = false;
    clearInterval(gameState.timer);
    
    messageElement.textContent = 'Game Over!';
    messageElement.style.color = '#dc3545';

    finalScoreElement.textContent = `Final Score: ${gameState.score}`;
    finalStreakElement.textContent = `Best Streak: ${gameState.streak}`;

    // Save achievements
    localStorage.setItem('achievements', JSON.stringify(gameState.achievements));
    
    gameOverModal.show();
}

// Timer functions
function startTimer() {
    clearInterval(gameState.timer);
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        timerElement.textContent = gameState.timeLeft + 's';
        
        if (gameState.timeLeft <= 0) {
            handleGameOver();
        }
    }, 1000);
}

// Animation functions
function animateCards(action) {
    const animations = {
        reset: {
            current: 'flipInY',
            next: 'flipInY'
        },
        reveal: {
            next: 'flipInX'
        },
        next: {
            current: 'slideOutLeft',
            next: 'slideInRight'
        }
    };

    const animation = animations[action];
    if (animation.current) {
        currentCard.style.animation = `${animation.current} ${CONFIG.animations.duration}ms ${CONFIG.animations.easing}`;
    }
    if (animation.next) {
        nextCard.style.animation = `${animation.next} ${CONFIG.animations.duration}ms ${CONFIG.animations.easing}`;
    }
}

// Achievement system
function checkAchievements() {
    const achievements = [
        {
            id: 'firstWin',
            condition: () => gameState.score >= 50,
            message: 'First Victory: Score 50 points!'
        },
        {
            id: 'tenStreak',
            condition: () => gameState.streak >= 10,
            message: '10 Streak: Get 10 correct guesses in a row!'
        },
        {
            id: 'hundredPoints',
            condition: () => gameState.score >= 100,
            message: 'Century: Score 100 points!'
        },
        {
            id: 'hardModeWin',
            condition: () => gameState.difficulty === 'hard' && gameState.score >= 100,
            message: 'Expert: Score 100 points on hard difficulty!'
        }
    ];

    achievements.forEach(achievement => {
        if (!gameState.achievements[achievement.id] && achievement.condition()) {
            gameState.achievements[achievement.id] = true;
            showAchievementNotification(achievement.message);
        }
    });
}

// UI Enhancement functions
function showFloatingPoints(points) {
    const pointsElement = document.createElement('div');
    pointsElement.className = 'floating-points';
    pointsElement.textContent = `+${points}`;
    document.querySelector('.game-container').appendChild(pointsElement);

    setTimeout(() => pointsElement.remove(), 1000);
}

function showAchievementNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <i class="bi bi-trophy-fill"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
}

// Event Listeners
lowerButton.addEventListener('click', () => handleGuess(false));
higherButton.addEventListener('click', () => handleGuess(true));

newGameButton.addEventListener('click', () => {
    initializeGame();
    gameOverModal.hide();
});

resetScoresButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all scores and achievements?')) {
        gameState.highScore = 0;
        gameState.bestStreak = 0;
        gameState.achievements = {
            firstWin: false,
            tenStreak: false,
            hundredPoints: false,
            hardModeWin: false
        };
        localStorage.clear();
        updateUI();
    }
});

playAgainButton.addEventListener('click', () => {
    initializeGame();
    gameOverModal.hide();
});

difficultySelect.addEventListener('change', (e) => {
    gameState.difficulty = e.target.value;
    initializeGame();
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameState.gameActive) return;
    
    switch(e.key.toLowerCase()) {
        case 'arrowdown':
        case 's':
            handleGuess(false);
            break;
        case 'arrowup':
        case 'w':
            handleGuess(true);
            break;
        case 'r':
            initializeGame();
            break;
    }
});

// Initialize game on load
initializeGame(); 