// Game Configuration
const CONFIG = {
    difficulties: {
        easy: {
            name: 'Easy',
            randomMoveChance: 0.7
        },
        medium: {
            name: 'Medium',
            randomMoveChance: 0.3
        },
        hard: {
            name: 'Hard',
            randomMoveChance: 0
        }
    },
    winningCombinations: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ],
    achievements: {
        firstWin: {
            id: 'firstWin',
            name: 'First Victory',
            description: 'Win your first game',
            check: (stats) => stats.totalWins === 1
        },
        threeStreak: {
            id: 'threeStreak',
            name: 'Hat Trick',
            description: 'Win 3 games in a row',
            check: (stats) => stats.currentStreak >= 3
        },
        beatHardAI: {
            id: 'beatHardAI',
            name: 'AI Master',
            description: 'Win against Hard AI',
            check: (stats, gameState) => 
                gameState.currentMode === 'single' && 
                gameState.difficulty === 'hard' && 
                gameState.winner === gameState.playerSymbol
        },
        perfectGame: {
            id: 'perfectGame',
            name: 'Perfect Game',
            description: 'Win in 5 moves or less',
            check: (stats, gameState) => 
                gameState.winner === gameState.playerSymbol && 
                gameState.moves <= 5
        },
        tenGames: {
            id: 'tenGames',
            name: 'Dedicated Player',
            description: 'Play 10 games',
            check: (stats) => stats.gamesPlayed >= 10
        }
    }
};

// Game State
const gameState = {
    board: Array(9).fill(''),
    currentMode: 'single',
    difficulty: 'easy',
    currentPlayer: 'X',
    playerSymbol: 'X',
    aiSymbol: 'O',
    isGameActive: true,
    winner: null,
    moves: 0,
    stats: {
        gamesPlayed: 0,
        totalWins: 0,
        currentStreak: 0,
        bestStreak: 0,
        scores: { X: 0, O: 0 },
        unlockedAchievements: new Set()
    }
};

// DOM Elements
const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status-text');
const player1Score = document.querySelector('#player1-score .score');
const player2Score = document.querySelector('#player2-score .score');
const gameModeInputs = document.querySelectorAll('input[name="game-mode"]');
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');
const playerSymbolSelect = document.getElementById('player1-symbol');
const aiSettings = document.getElementById('ai-settings');
const winningLine = document.getElementById('winning-line');
const achievementElements = document.querySelectorAll('.achievement');

// Sound Effects
const sounds = {
    move: new Audio('data:audio/wav;base64,UklGRl9vAAAWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'),
    win: new Audio('data:audio/wav;base64,UklGRl9vAAAWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'),
    draw: new Audio('data:audio/wav;base64,UklGRl9vAAAWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...')
};

// Initialize Game
function initializeGame() {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.isGameActive = true;
    gameState.winner = null;
    gameState.moves = 0;

    // Reset UI
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
    });
    winningLine.style.display = 'none';
    updateStatusMessage();
    updateScores();

    // If single player and AI goes first
    if (gameState.currentMode === 'single' && gameState.playerSymbol === 'O') {
        makeAIMove();
    }
}

// Handle Cell Click
function handleCellClick(index) {
    if (!gameState.isGameActive || gameState.board[index] !== '') return;

    makeMove(index);

    if (gameState.isGameActive && gameState.currentMode === 'single') {
        setTimeout(makeAIMove, 500);
    }
}

// Make Move
function makeMove(index) {
    gameState.board[index] = gameState.currentPlayer;
    gameState.moves++;
    
    // Update UI
    const cell = cells[index];
    cell.textContent = gameState.currentPlayer;
    cell.classList.add(gameState.currentPlayer.toLowerCase());
    cell.classList.add('animate__animated', 'animate__bounceIn');
    sounds.move.play();

    // Check game status
    if (checkWinner()) {
        handleWin();
    } else if (isDraw()) {
        handleDraw();
    } else {
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        updateStatusMessage();
    }
}

// AI Move
function makeAIMove() {
    if (!gameState.isGameActive) return;

    const difficulty = CONFIG.difficulties[gameState.difficulty];
    let move;

    if (Math.random() < difficulty.randomMoveChance) {
        move = getRandomMove();
    } else {
        move = getBestMove();
    }

    makeMove(move);
}

// Get Best Move (Minimax Algorithm)
function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
        if (gameState.board[i] === '') {
            gameState.board[i] = gameState.aiSymbol;
            let score = minimax(gameState.board, 0, false);
            gameState.board[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

// Minimax Algorithm
function minimax(board, depth, isMaximizing) {
    const result = checkWinningCombination();
    
    if (result !== null) {
        return result === gameState.aiSymbol ? 10 - depth : depth - 10;
    }

    if (isDraw()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = gameState.aiSymbol;
                bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
                board[i] = '';
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = gameState.playerSymbol;
                bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
                board[i] = '';
            }
        }
        return bestScore;
    }
}

// Get Random Move
function getRandomMove() {
    const emptyCells = gameState.board
        .map((cell, index) => cell === '' ? index : null)
        .filter(index => index !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// Check Winner
function checkWinner() {
    const winningCombo = checkWinningCombination();
    if (winningCombo) {
        gameState.winner = gameState.currentPlayer;
        animateWin(winningCombo);
        return true;
    }
    return false;
}

// Check Winning Combination
function checkWinningCombination() {
    for (const combination of CONFIG.winningCombinations) {
        const [a, b, c] = combination;
        if (gameState.board[a] &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c]) {
            return gameState.board[a];
        }
    }
    return null;
}

// Animate Win
function animateWin(winningCombo) {
    const [a, b, c] = winningCombo;
    cells[a].classList.add('winning');
    cells[b].classList.add('winning');
    cells[c].classList.add('winning');

    // Draw winning line
    const startCell = cells[a].getBoundingClientRect();
    const endCell = cells[c].getBoundingClientRect();
    const boardRect = document.querySelector('.board-grid').getBoundingClientRect();

    const length = Math.sqrt(
        Math.pow(endCell.left - startCell.left, 2) +
        Math.pow(endCell.top - startCell.top, 2)
    );

    const angle = Math.atan2(
        endCell.top - startCell.top,
        endCell.left - startCell.left
    ) * 180 / Math.PI;

    winningLine.style.width = `${length}px`;
    winningLine.style.transform = `rotate(${angle}deg)`;
    winningLine.style.left = `${(startCell.left + endCell.left) / 2 - boardRect.left}px`;
    winningLine.style.top = `${(startCell.top + endCell.top) / 2 - boardRect.top}px`;
    winningLine.style.display = 'block';
}

// Check Draw
function isDraw() {
    return !gameState.board.includes('');
}

// Handle Win
function handleWin() {
    gameState.isGameActive = false;
    gameState.stats.gamesPlayed++;
    gameState.stats.scores[gameState.winner]++;
    gameState.stats.totalWins++;
    gameState.stats.currentStreak++;
    gameState.stats.bestStreak = Math.max(
        gameState.stats.bestStreak,
        gameState.stats.currentStreak
    );

    updateStatusMessage();
    updateScores();
    checkAchievements();
    sounds.win.play();
    showGameOverModal();
}

// Handle Draw
function handleDraw() {
    gameState.isGameActive = false;
    gameState.stats.gamesPlayed++;
    gameState.stats.currentStreak = 0;
    
    updateStatusMessage();
    sounds.draw.play();
    showGameOverModal();
}

// Update Status Message
function updateStatusMessage() {
    if (gameState.winner) {
        statusText.textContent = `${gameState.winner} Wins!`;
    } else if (isDraw()) {
        statusText.textContent = "It's a Draw!";
    } else {
        statusText.textContent = `${gameState.currentPlayer}'s Turn`;
    }
}

// Update Scores
function updateScores() {
    player1Score.textContent = gameState.stats.scores.X;
    player2Score.textContent = gameState.stats.scores.O;
    
    // Update player indicators
    document.getElementById('player1-score').classList.toggle(
        'active',
        gameState.currentPlayer === 'X'
    );
    document.getElementById('player2-score').classList.toggle(
        'active',
        gameState.currentPlayer === 'O'
    );

    // Update stats
    document.getElementById('games-played').textContent = gameState.stats.gamesPlayed;
    document.getElementById('win-streak').textContent = gameState.stats.currentStreak;
    document.getElementById('best-streak').textContent = gameState.stats.bestStreak;
}

// Check Achievements
function checkAchievements() {
    Object.values(CONFIG.achievements).forEach(achievement => {
        if (!gameState.stats.unlockedAchievements.has(achievement.id) &&
            achievement.check(gameState.stats, gameState)) {
            unlockAchievement(achievement);
        }
    });
}

// Unlock Achievement
function unlockAchievement(achievement) {
    gameState.stats.unlockedAchievements.add(achievement.id);
    
    // Update UI
    const achievementElement = document.querySelector(
        `.achievement[data-id="${achievement.id}"]`
    );
    achievementElement.classList.add('unlocked');
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'achievement-notification animate__animated animate__slideInRight';
    notification.innerHTML = `
        <i class="bi bi-trophy-fill"></i>
        <div>
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('animate__slideOutRight');
        setTimeout(() => notification.remove(), 1000);
    }, 3000);
}

// Show Game Over Modal
function showGameOverModal() {
    const modal = new bootstrap.Modal(document.getElementById('gameOverModal'));
    const winnerMessage = document.getElementById('winner-message');
    
    if (gameState.winner) {
        winnerMessage.textContent = `${gameState.winner} Wins!`;
    } else {
        winnerMessage.textContent = "It's a Draw!";
    }

    document.getElementById('modal-games-played').textContent = gameState.stats.gamesPlayed;
    document.getElementById('modal-current-streak').textContent = gameState.stats.currentStreak;
    document.getElementById('modal-best-streak').textContent = gameState.stats.bestStreak;

    modal.show();
}

// Event Listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

gameModeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        gameState.currentMode = e.target.value;
        aiSettings.style.display = gameState.currentMode === 'single' ? 'block' : 'none';
        initializeGame();
    });
});

difficultyInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        gameState.difficulty = e.target.value;
        initializeGame();
    });
});

playerSymbolSelect.addEventListener('change', (e) => {
    gameState.playerSymbol = e.target.value;
    gameState.aiSymbol = gameState.playerSymbol === 'X' ? 'O' : 'X';
    document.getElementById('player2-symbol').value = gameState.aiSymbol;
    initializeGame();
});

document.getElementById('restart-game').addEventListener('click', initializeGame);

document.getElementById('reset-scores').addEventListener('click', () => {
    gameState.stats = {
        gamesPlayed: 0,
        totalWins: 0,
        currentStreak: 0,
        bestStreak: 0,
        scores: { X: 0, O: 0 },
        unlockedAchievements: new Set()
    };
    achievementElements.forEach(el => el.classList.remove('unlocked'));
    updateScores();
    initializeGame();
});

document.getElementById('play-again').addEventListener('click', () => {
    bootstrap.Modal.getInstance(document.getElementById('gameOverModal')).hide();
    initializeGame();
});

// Initialize the game
initializeGame(); 