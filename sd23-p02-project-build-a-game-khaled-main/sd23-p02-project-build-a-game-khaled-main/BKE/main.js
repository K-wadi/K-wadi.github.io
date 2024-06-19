// Elementen ophalen uit de HTML
let restartBtn = document.querySelector(".restart-btn");
let boxes = document.querySelectorAll(".box");
let container = document.querySelector(".container");

// Array met winnende combinaties
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Horizontaal
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Verticaal
  [0, 4, 8],
  [2, 4, 6], // Diagonaal
];

// Variabele voor de kleur van winnende blokken
let winnerIndicator = "";

// Constanten voor de tekst van de spelers
const O_TEXT = "O";
const X_TEXT = "X";

// Huidige speler
let currentPlayer = X_TEXT;

// Array om de status van elk vakje bij te houden
let spaces = [];

// Scores bijhouden
let playerScore = 0;
let computerScore = 0;

// Functie om het spel te starten
const startGame = () => {
  // Kleur van winnende blokken ophalen uit de stijl
  winnerIndicator = getStyleValue("--winning-blocks");

  // Luisteren naar klikgebeurtenissen op elk vakje
  boxes.forEach((box, index) =>
    box.addEventListener("click", () => boxClicked(index))
  );
};

// Functie om de waarde van een specifieke stijlvariabele op te halen
function getStyleValue(property) {
  return getComputedStyle(document.body).getPropertyValue(property).trim();
}

// Functie die wordt aangeroepen wanneer een vakje wordt aangeklikt
function boxClicked(index) {
  // Controleren of het vakje al is ingevuld
  if (!spaces[index]) {
    // Huidige speler invullen in het vakje
    spaces[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;

    // Controleren of de huidige speler heeft gewonnen
    if (playerHasWon() !== false) {
      showResult(`${currentPlayer} heeft gewonnen!`);
      updateScore("player");
      return;
    }

    // Wisselen naar de andere speler
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

    // Controleren op gelijkspel
    if (checkDraw()) {
      showResult("Het is een gelijkspel!");
      updateScore("draw");
      return;
    }

    // Computer zet
    computerMove();
  }
}

// Functie om te controleren of een speler heeft gewonnen
function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      // Return de vakjes die de overwinning hebben bepaald
      return [a, b, c];
    }
  }

  // Geen winnaar gevonden
  return false;
}

// Functie om het resultaat in de messagebox te tonen
function showResult(message) {
  // MessageBox opmaken
  let messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  messageBox.textContent = message;

  // MessageBox toevoegen aan de container
  container.appendChild(messageBox);

  // MessageBox na 2 seconden verwijderen
  setTimeout(() => {
    messageBox.remove();
  }, 2000);
}

// Functie om de score bij te werken
function updateScore(result) {
  // Score bijwerken op basis van het resultaat
  if (result === "player") {
    playerScore++;
  } else if (result === "computer") {
    computerScore++;
  }
  // Scores tonen op de pagina
  document.querySelector(".player-score").innerText = `Speler: ${playerScore}`;
  document.querySelector(
    ".computer-score"
  ).innerText = `Computer: ${computerScore}`;
}

// Functie voor de zet van de computer
function computerMove() {
  let emptySpaces = spaces.reduce((acc, val, index) => {
    if (!val) {
      acc.push(index);
    }
    return acc;
  }, []);

  let randomIndex = Math.floor(Math.random() * emptySpaces.length);
  let computerIndex = emptySpaces[randomIndex];

  // Simuleer een vertraging om het menselijker te maken
  setTimeout(() => {
    spaces[computerIndex] = currentPlayer;
    boxes[computerIndex].innerText = currentPlayer;

    // Controleren of de computer heeft gewonnen
    if (playerHasWon() !== false) {
      showResult(`Computer heeft gewonnen!`);
      updateScore("computer");
      return;
    }

    // Wisselen naar de andere speler
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }, 500); // Vertraging van 0,5 seconden
}

// Functie om te controleren op gelijkspel
function checkDraw() {
  return spaces.every((value) => value !== undefined);
}

// Start het spel wanneer de pagina geladen is
window.addEventListener("load", startGame);

// Functie om het spel opnieuw te starten
function restartGame() {
  // Leeg de array met statussen van de vakjes
  spaces = [];

  // Verwijder de tekst uit alle vakjes op het bord
  boxes.forEach((box) => (box.innerText = ""));

  // Verwijder eventuele winnende blokken
  document
    .querySelectorAll(".winning-box")
    .forEach((box) => box.classList.remove("winning-box"));

  // Start het spel opnieuw
  startGame();
}

// Luister naar klikgebeurtenis op de Restart-knop
restartBtn.addEventListener("click", restartGame);
