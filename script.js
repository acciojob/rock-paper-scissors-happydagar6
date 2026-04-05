//your code here
// Rock Paper Scissors Game

const inputTurns = document.querySelector("[data-ns-test='game-number']");
const playBtn = document.querySelector("[data-ns-test='play-game']");

const rockBtn = document.querySelector("[data-ns-test='rock']");
const paperBtn = document.querySelector("[data-ns-test='paper']");
const scissorsBtn = document.querySelector("[data-ns-test='scissors']");

const compChooseTxt = document.querySelector("[data-ns-test='computer-choose']");
const roundResultTxt = document.querySelector("[data-ns-test='round-result']");
const roundsLeftTxt = document.querySelector("[data-ns-test='rounds-left']");
const userPointsTxt = document.querySelector("[data-ns-test='user-points']");
const compPointsTxt = document.querySelector("[data-ns-test='computer-points']");
const gameResultTxt = document.querySelector("[data-ns-test='game-result']");


// Game State Variables
let roundsLeft = 0;
let userPoints = 0;
let computerPoinits = 0;
let isGameActive = false;

const choicesMap = ["Rock", "Paper", "Scissors"];

// Start Game
playBtn.addEventListener("click", () => {
    // Validate input
    const turns = parseInt(inputTurns.value);
    // Check if input is a valid positive integer
    if (isNaN(turns) || turns <= 0) return;

    // Reset everything for a new game
    roundsLeft = turns; // Set game as active
    userPoints = 0;
    computerPoinits = 0;
    isGameActive = true;

    // Clear previous game results
    compChooseTxt.textContent = "";
    roundResultTxt.textContent = "";
    gameResultTxt.textContent = "";
    updateUI();
});

// Handle User Choice
rockBtn.addEventListener("click", () => playRound(0));
paperBtn.addEventListener("click", () => playRound(1));
scissorsBtn.addEventListener("click", () => playRound(2));

// Play a Round
function playRound(userChoice) {
    if (!isGameActive || roundsLeft <= 0) return;
    
    window.computer = Math.floor(Math.random() * 3);
    const compChoice = window.computer;

    compChooseTxt.textContent = choicesMap[compChoice]; // Display computer's choice

    // Determine round result
    if (userChoice === compChoice) {
        roundResultTxt.textContent = "It's a tie!";
    } else if(
        (userChoice === 0 && compChoice === 2) || // Rock beats Scissors
        (userChoice === 1 && compChoice === 0) || // Paper beats Rock
        (userChoice === 2 && compChoice === 1) // Scissors beats Paper
    ) {
        roundResultTxt.textContent = "WON";
        userPoints++;
    } else {
        roundResultTxt.textContent = "LOSE";
        computerPoinits++;
    }

    roundsLeft--;
    updateUI();

    if (roundsLeft === 0) {
        isGameActive = false;

        // Determine overall game result
        if (userPoints > computerPoinits) {
            gameResultTxt.textContent = "WON";
        } else if(userPoints > computerPoinits) {
            gameResultTxt.textContent = "LOSE";
        } else {
            gameResultTxt.textContent = "TIE";
        }
    }
}

// Update UI
function updateUI() {
    roundsLeftTxt.textContent = roundsLeft;
    userPointsTxt.textContent = userPoints;
    compPointsTxt.textContent = computerPoinits;
}