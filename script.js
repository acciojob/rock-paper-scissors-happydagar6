// 1. Elements pakdo
const inputTurns = document.querySelector('[data-ns-test="game-number"]');
const playBtn = document.querySelector('[data-ns-test="play-game"]');

const rockBtn = document.querySelector('[data-ns-test="rock"]');
const paperBtn = document.querySelector('[data-ns-test="paper"]');
const scissorsBtn = document.querySelector('[data-ns-test="scissors"]');

const compChooseTxt = document.querySelector('[data-ns-test="computer-choose"]');
const roundResultTxt = document.querySelector('[data-ns-test="round-result"]');
const roundsLeftTxt = document.querySelector('[data-ns-test="rounds-left"]');
const userPointsTxt = document.querySelector('[data-ns-test="user-points"]');
const compPointsTxt = document.querySelector('[data-ns-test="computer-points"]');
const gameResultTxt = document.querySelector('[data-ns-test="game-result"]');

// 2. State Variables
let roundsLeft = 0;
let userPoints = 0;
let computerPoints = 0;
let isGameActive = false;

const choicesMap = ["ROCK", "PAPER", "SCISSORS"];

// 3. Play Button Setup
playBtn.addEventListener('click', function() {
    const turns = parseInt(inputTurns.value);
    if (isNaN(turns) || turns <= 0) return;

    // Reset everything for a new game
    roundsLeft = turns;
    userPoints = 0;
    computerPoints = 0;
    isGameActive = true;

    // UI Clear karo
    compChooseTxt.textContent = "";
    roundResultTxt.textContent = "";
    gameResultTxt.textContent = "";
    updateUI();
});

// 4. Action Listeners (User clicks)
rockBtn.addEventListener('click', () => playRound(0));
paperBtn.addEventListener('click', () => playRound(1));
scissorsBtn.addEventListener('click', () => playRound(2));

// 5. Main Game Logic
function playRound(userChoice) {
    // Agar game chalu nahi hai ya turns nahi bache, toh ignore karo
    if (!isGameActive || roundsLeft <= 0) return;

    // 
    window.computerChoose = Math.floor(Math.random() * 3);
    const compChoice = window.computerChoose;

    // Show what computer chose
    compChooseTxt.textContent = choicesMap[compChoice];

    
    if (userChoice === compChoice) {
        roundResultTxt.textContent = "TIE";
    } else if (
        (userChoice === 0 && compChoice === 2) ||
        (userChoice === 1 && compChoice === 0) || 
        (userChoice === 2 && compChoice === 1)    
    ) {
        roundResultTxt.textContent = "WON";
        userPoints++;
    } else {
        roundResultTxt.textContent = "LOSE";
        computerPoints++;
    }

    roundsLeft--;
    updateUI();

    // Game Over Check
    if (roundsLeft === 0) {
        isGameActive = false; // Game rok do
        
        // Final Result Logic
        if (userPoints > computerPoints) {
            gameResultTxt.textContent = "WON";
        } else if (computerPoints > userPoints) {
            gameResultTxt.textContent = "LOSE";
        } else {
            gameResultTxt.textContent = "TIE";
        }
    }
}

// 6. UI Update Helper
function updateUI() {
    roundsLeftTxt.textContent = roundsLeft;
    userPointsTxt.textContent = userPoints;
    compPointsTxt.textContent = computerPoints;
}