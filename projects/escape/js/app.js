// Game State
let gameState = {
    currentRoom: null,
    inventory: [],
    hintsUsed: 0,
    timeRemaining: 0,
    timer: null,
    selectedItem: null,
    solvedPuzzles: new Set()
};

// DOM Elements
const timerElement = document.getElementById('timer');
const hintsCountElement = document.getElementById('hints-count');
const roomImage = document.getElementById('room-image');
const inventory = document.getElementById('inventory');
const gameLog = document.getElementById('game-log');
const puzzleModal = new bootstrap.Modal(document.getElementById('puzzleModal'));
const successModal = new bootstrap.Modal(document.getElementById('successModal'));

// Event Listeners
document.getElementById('look-around').addEventListener('click', lookAround);
document.getElementById('use-item').addEventListener('click', useSelectedItem);
document.getElementById('get-hint').addEventListener('click', getHint);

// Initialize Game
function initGame() {
    gameState.currentRoom = gameData.gameStart.room;
    gameState.timeRemaining = gameData.gameStart.timeLimit;
    gameState.hintsUsed = 0;
    gameState.inventory = [];
    gameState.solvedPuzzles = new Set();
    
    updateUI();
    startTimer();
    addLogMessage("Welcome to the Virtual Escape Room! You're trapped in a mysterious building. Find your way out!", "success");
}

// Timer Functions
function startTimer() {
    if (gameState.timer) clearInterval(gameState.timer);
    
    gameState.timer = setInterval(() => {
        gameState.timeRemaining--;
        updateTimer();
        
        if (gameState.timeRemaining <= 0) {
            gameOver();
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(gameState.timeRemaining / 60);
    const seconds = gameState.timeRemaining % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Room Navigation
function lookAround() {
    const room = gameData.rooms[gameState.currentRoom];
    addLogMessage(`You are in ${room.name}. ${room.description}`, "success");
    updateRoomItems();
}

function moveToRoom(direction) {
    const currentRoom = gameData.rooms[gameState.currentRoom];
    const nextRoom = currentRoom.exits[direction];
    
    if (nextRoom) {
        gameState.currentRoom = nextRoom;
        updateUI();
        addLogMessage(`You move to ${gameData.rooms[nextRoom].name}.`, "success");
    } else {
        addLogMessage("You can't go that way.", "error");
    }
}

// Inventory Management
function updateInventory() {
    inventory.innerHTML = '';
    gameState.inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        itemElement.textContent = item.name;
        itemElement.addEventListener('click', () => selectItem(item));
        inventory.appendChild(itemElement);
    });
}

function selectItem(item) {
    gameState.selectedItem = item;
    document.querySelectorAll('.inventory-item').forEach(el => {
        el.classList.remove('selected');
        if (el.textContent === item.name) {
            el.classList.add('selected');
        }
    });
}

function useSelectedItem() {
    if (!gameState.selectedItem) {
        addLogMessage("Please select an item first.", "error");
        return;
    }

    const currentRoom = gameData.rooms[gameState.currentRoom];
    const puzzles = currentRoom.puzzles.filter(puzzle => 
        puzzle.requiredItems.includes(gameState.selectedItem.id) &&
        !gameState.solvedPuzzles.has(puzzle.id)
    );

    if (puzzles.length > 0) {
        showPuzzle(puzzles[0]);
    } else {
        addLogMessage("Nothing happens when you use this item here.", "error");
    }
}

// Puzzle System
function showPuzzle(puzzle) {
    const puzzleContent = document.getElementById('puzzle-content');
    puzzleContent.innerHTML = `
        <div class="puzzle-container">
            <p>${puzzle.description}</p>
            ${createPuzzleInterface(puzzle)}
        </div>
    `;
    puzzleModal.show();
}

function createPuzzleInterface(puzzle) {
    switch (puzzle.type) {
        case 'combination':
            return `
                <div class="input-group">
                    <input type="text" class="form-control" id="puzzle-input" placeholder="Enter combination">
                    <button class="btn btn-primary" onclick="checkPuzzleSolution('${puzzle.id}')">Submit</button>
                </div>
            `;
        case 'pattern':
            return `
                <div class="puzzle-grid">
                    ${['top', 'right', 'bottom', 'left'].map(direction => `
                        <div class="puzzle-piece" onclick="checkPatternSolution('${puzzle.id}', '${direction}')">
                            ${direction}
                        </div>
                    `).join('')}
                </div>
            `;
        case 'maze':
            return `
                <div class="maze-controls">
                    <button class="btn btn-primary" onclick="checkMazeSolution('${puzzle.id}', 'up')">Up</button>
                    <button class="btn btn-primary" onclick="checkMazeSolution('${puzzle.id}', 'right')">Right</button>
                    <button class="btn btn-primary" onclick="checkMazeSolution('${puzzle.id}', 'down')">Down</button>
                    <button class="btn btn-primary" onclick="checkMazeSolution('${puzzle.id}', 'left')">Left</button>
                </div>
            `;
        case 'sequence':
            return `
                <div class="sequence-controls">
                    <button class="btn btn-danger" onclick="checkSequenceSolution('${puzzle.id}', 'red')">Red</button>
                    <button class="btn btn-primary" onclick="checkSequenceSolution('${puzzle.id}', 'blue')">Blue</button>
                    <button class="btn btn-success" onclick="checkSequenceSolution('${puzzle.id}', 'green')">Green</button>
                </div>
            `;
        default:
            return '<p>Unknown puzzle type</p>';
    }
}

function checkPuzzleSolution(puzzleId) {
    const puzzle = findPuzzle(puzzleId);
    const input = document.getElementById('puzzle-input').value;
    
    if (input === puzzle.solution) {
        solvePuzzle(puzzleId);
    } else {
        addLogMessage("That's not the correct combination.", "error");
    }
}

function checkPatternSolution(puzzleId, direction) {
    const puzzle = findPuzzle(puzzleId);
    const currentSolution = puzzle.currentSolution || [];
    
    currentSolution.push(direction);
    puzzle.currentSolution = currentSolution;
    
    if (currentSolution.length === puzzle.solution.length) {
        if (JSON.stringify(currentSolution) === JSON.stringify(puzzle.solution)) {
            solvePuzzle(puzzleId);
        } else {
            addLogMessage("That's not the correct pattern.", "error");
            puzzle.currentSolution = [];
        }
    }
}

function checkMazeSolution(puzzleId, direction) {
    const puzzle = findPuzzle(puzzleId);
    const currentSolution = puzzle.currentSolution || [];
    
    currentSolution.push(direction);
    puzzle.currentSolution = currentSolution;
    
    if (currentSolution.length === puzzle.solution.length) {
        if (JSON.stringify(currentSolution) === JSON.stringify(puzzle.solution)) {
            solvePuzzle(puzzleId);
        } else {
            addLogMessage("That's not the correct path.", "error");
            puzzle.currentSolution = [];
        }
    }
}

function checkSequenceSolution(puzzleId, color) {
    const puzzle = findPuzzle(puzzleId);
    const currentSolution = puzzle.currentSolution || [];
    
    currentSolution.push(color);
    puzzle.currentSolution = currentSolution;
    
    if (currentSolution.length === puzzle.solution.length) {
        if (JSON.stringify(currentSolution) === JSON.stringify(puzzle.solution)) {
            solvePuzzle(puzzleId);
        } else {
            addLogMessage("That's not the correct sequence.", "error");
            puzzle.currentSolution = [];
        }
    }
}

function findPuzzle(puzzleId) {
    for (const room of Object.values(gameData.rooms)) {
        const puzzle = room.puzzles.find(p => p.id === puzzleId);
        if (puzzle) return puzzle;
    }
    return null;
}

function solvePuzzle(puzzleId) {
    gameState.solvedPuzzles.add(puzzleId);
    puzzleModal.hide();
    addLogMessage("Puzzle solved!", "success");
    
    // Check if all puzzles in the current room are solved
    const currentRoom = gameData.rooms[gameState.currentRoom];
    const allPuzzlesSolved = currentRoom.puzzles.every(puzzle => 
        gameState.solvedPuzzles.has(puzzle.id)
    );
    
    if (allPuzzlesSolved) {
        addLogMessage("You've solved all puzzles in this room!", "success");
        // Add room-specific rewards or unlock new areas
    }
}

// Hint System
function getHint() {
    if (gameState.hintsUsed >= gameData.gameStart.maxHints) {
        addLogMessage("You've used all your hints!", "error");
        return;
    }
    
    const currentRoom = gameData.rooms[gameState.currentRoom];
    const unsolvedPuzzles = currentRoom.puzzles.filter(puzzle => 
        !gameState.solvedPuzzles.has(puzzle.id)
    );
    
    if (unsolvedPuzzles.length > 0) {
        const hint = unsolvedPuzzles[0].hint;
        addLogMessage(`Hint: ${hint}`, "success");
        gameState.hintsUsed++;
        updateHintsCount();
    } else {
        addLogMessage("No hints available for this room.", "error");
    }
}

// UI Updates
function updateUI() {
    const room = gameData.rooms[gameState.currentRoom];
    roomImage.src = room.image;
    updateInventory();
    updateHintsCount();
}

function updateHintsCount() {
    hintsCountElement.textContent = gameData.gameStart.maxHints - gameState.hintsUsed;
}

function addLogMessage(message, type = "info") {
    const messageElement = document.createElement('div');
    messageElement.className = `log-message ${type}`;
    messageElement.textContent = message;
    gameLog.appendChild(messageElement);
    gameLog.scrollTop = gameLog.scrollHeight;
}

// Game Over
function gameOver() {
    clearInterval(gameState.timer);
    addLogMessage("Time's up! Game Over!", "error");
    // Show game over modal or restart option
}

// Start the game when the page loads
window.addEventListener('load', initGame); 