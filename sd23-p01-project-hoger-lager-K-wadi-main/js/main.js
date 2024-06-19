 
// DOM-elementen ophalen

const computerCreditsElement = document.querySelector(".computer-credits");
const playerCreditsElement = document.querySelector(".player-credits");
const messageBoxElement = document.querySelector(".message-box");
const diceButtonElement = document.querySelector(".dice-button");
const higherButtonElement = document.querySelector(".higher-button");
const lowerButtonElement = document.querySelector(".lower-button");
const goButtonElement = document.querySelector(".go-button");
const turnElement = document.querySelector(".turn");
const computerDice = document.querySelector(".computerDice");
const playerDice = document.querySelector(".playerDice");

// Variabelen voor het bijhouden van credits en dobbelsteenwaarden

let computerCredits = 0;
let playerCredits = 0; 
let computerDiceOneValue = 0;
let playerDiceOneValue = 0;

// let turn;

let computerResult;
let userResult;
let userChoice;

diceButtonElement.disabled = true;
higherButtonElement.disabled = true;
lowerButtonElement.disabled = true;

// Go button

goButtonElement.addEventListener("click", function (params) {
  const min = 1; // Minimum value
  const max = 6; // Maximum value
  const randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  
  computerResult = randomInteger;
  turnElement.innerHTML = "Player";
  messageBoxElement.innerHTML = "Choose Higher or Lower";
  higherButtonElement.disabled = false;
  lowerButtonElement.disabled = false;
  goButtonElement.disabled = true;
});

// Higher button

higherButtonElement.addEventListener("click", function (params) {
  userChoice = "higher";
  messageBoxElement.innerHTML = "You chose higher";
  higherButtonElement.disabled = true;
  lowerButtonElement.disabled = true;
  goButtonElement.disabled = true;
  diceButtonElement.disabled = false;
});
 
// Lower button

lowerButtonElement.addEventListener("click", function (params) {
  userChoice = "lower";
  messageBoxElement.innerHTML = "You chose lower";
  higherButtonElement.disabled = true;
  lowerButtonElement.disabled = true;
  goButtonElement.disabled = true;
  diceButtonElement.disabled = false;
});

// Dice button 

diceButtonElement.addEventListener("click", function (params) {
  const min = 1; // Minimum value
  const max = 6; // Maximum value
  const randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  userResult = randomInteger;
  turnElement.innerHTML = "Computer";
  diceButtonElement.disabled = true;
  goButtonElement.disabled = false;
  result();
});

// Roll dices

function changeDice(params) {
  if (userResult === 1) {
    playerDice.innerHTML = "&#9856;";
  } else if (userResult === 2) {
    playerDice.innerHTML = "&#9857;";
  } else if (userResult === 3) {
    playerDice.innerHTML = "&#9858;";
  } else if (userResult === 4) {
    playerDice.innerHTML = "&#9859;";
  } else if (userResult === 5) {
    playerDice.innerHTML = "  &#9860;";
  } else if (userResult === 6) {
    playerDice.innerHTML = "  &#9861;";
  }

  if (computerResult === 1) {
    computerDice.innerHTML = "&#9856;";
  } else if (computerResult === 2) {
    computerDice.innerHTML = "&#9857;";
  } else if (computerResult === 3) {
    computerDice.innerHTML = "&#9858;";
  } else if (computerResult === 4) {
    computerDice.innerHTML = "&#9859;";
  } else if (computerResult === 5) {
    computerDice.innerHTML = "  &#9860;";
  } else if (computerResult === 6) {
    computerDice.innerHTML = "  &#9861;";
  }
}

//  Higher and Lower

function result(params) {

  changeDice();

  if (userResult > computerResult && userChoice == "higher") {
    playerCredits++;
    messageBoxElement.innerHTML = "Player is the winner";
  } else if (userResult > computerResult && userChoice == "lower") {
    computerCredits++;
    messageBoxElement.innerHTML = "Computer is the winner";
  } else if (userResult < computerResult && userChoice == "lower") {
    playerCredits++;
    messageBoxElement.innerHTML = "Player is the winner";
  } else if (userResult < computerResult && userChoice == "higher") {
    computerCredits++;
    messageBoxElement.innerHTML = "Computer is the winner";
  } else {
    messageBoxElement.innerHTML = "It is a draw";
  }
  playerCreditsElement.innerHTML = playerCredits;
  computerCreditsElement.innerHTML = computerCredits;

//  Player credits

  if (playerCredits == 5) {
    higherButtonElement.disabled = true;
    lowerButtonElement.disabled = true;
    goButtonElement.disabled = true;
    diceButtonElement.disabled = true;
    alert("Player is the winner");
  }

//  Computer credits

  if (computerCredits == 5) {
    higherButtonElement.disabled = true;
    lowerButtonElement.disabled = true;
    goButtonElement.disabled = true;
    diceButtonElement.disabled = true;
    alert("Computer is the winner");
  }
}