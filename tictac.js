// Select all needed DOM elements
const box = document.querySelectorAll(".box");
const choice = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart");


// Initialize game variables
let board = ["", "", "", "", "", "", "", "", ""];
let playerLetter = null;
let computerLetter = null;
let gameOver = false;

// Player chooses X or O
for (let i = 0; i < choice.length; i++) {
  const choosen = choice[i];
  choosen.addEventListener("click", () => {
    playerLetter = choosen.value; // Save the player's choice
    computerLetter = playerLetter === "X" ? "O" : "X"; // Opposite for computer
    result.textContent = `You are ${playerLetter}. Game starts!`;
    enablePlayerMoves(); // Allow the player to start playing
  });
}

// Attach click events to boxes ONCE (not inside userChoice)
function enablePlayerMoves() {
  box.forEach((point, i) => {
    point.addEventListener("click", () => handleUserMove(i));
  });
}

// Player move logic
function handleUserMove(index) {
  if (gameOver) return; // Stop if game ended
  if (board[index] !== "") return; // Prevent overwriting filled boxes

  // Update UI for player's move
  board[index] = playerLetter;
  updateBoardUI();

  // Check winner after player move
  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }

  // Trigger computer move after a short delay (for realism)
  setTimeout(computerMove, 500);
}

//  Computer move logic
function computerMove() {
  if (gameOver) return;

  // Find all empty boxes
  const emptyCells = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((v) => v !== null);

  if (emptyCells.length === 0) {
    endGame("Draw");
    return;
  }

  // Randomly choose one empty spot
  const randomIndex =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  // Place computer's letter
  board[randomIndex] = computerLetter;
  updateBoardUI();

  // Check for winner after computer move
  const winner = checkWinner();
  if (winner) {
    endGame(winner);
  }
}

//  Update UI from the board array
function updateBoardUI() {
  box.forEach((point, i) => {
    point.style.fontSize = "2rem";
    point.style.textAlign = "center";
    point.textContent = board[i];
  });
}

//  Winning patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check winner logic (same as before)
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return "X" or "O"
    }
  }
  return null;
}

//  End game function
function endGame(winner) {
  gameOver = true;
  if (winner === "Draw") {
    result.textContent = "It's a Draw!";
  } else {
    result.textContent = `Game Over! ${winner} wins!`;
  }
}

restartBtn.addEventListener("click", restartGame);

function restartGame() {
  //  Reset the board array
  board = ["", "", "", "", "", "", "", "", ""];

  // Clear the boxes visually
  box.forEach((point) => {
    point.textContent = "";
  });

  // Reset game status
  gameOver = false;

  //  Update message
  result.textContent = "Game restarted! Play again.";

  //  Re-enable player moves
  enablePlayerMoves();
}

