let players = ['X', 'O'];
let currentPlayer;
let gameOver = false;
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  let emptyGrid = [];
  let isAIThinking = false;
  
  function setup() {
    createCanvas(600, 600);
    frameRate(30);
    initializeGame();
  }
  
  function initializeGame() {
    currentPlayer = floor(random(players.length));
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        emptyGrid.push([i, j]);
      }
    }
  }
  
  function equals3(a, b, c) {
    return a === b && b === c && a !== '';
  }
  
  function checkWinner() {
    let winner = null;
  
    // Check horizontal, vertical, and diagonal combinations
    for (let i = 0; i < 3; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
      if (equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
    if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    if (winner == null && emptyGrid.length == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  
  function nextTurn() {
    if (currentPlayer === 1) {
      // AI's turn
      makeAIMove();
    }
  }
  
  function makeAIMove() {
    let index = floor(random(emptyGrid.length));
    let spot = emptyGrid.splice(index, 1)[0];
    let i = spot[0];
    let j = spot[1];
    board[i][j] = players[currentPlayer];
    currentPlayer = 1 - currentPlayer; // Switch to the human player
  }
  
  function handleHumanMove() {
    let w = width / 3;
    let h = height / 3;
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (board[i][j] === '') {
      board[i][j] = players[currentPlayer];
      currentPlayer = 1 - currentPlayer; // Switch to the AI player
      let index = emptyGrid.findIndex(([x, y]) => x === i && y === j);
      if (index !== -1) {
        emptyGrid.splice(index, 1);
      }
    }
  }
  
  function mousePressed() {
    if (currentPlayer === 0) {
      // Human's turn
      handleHumanMove();
    }
  }
  
  function draw() {
    background(255);
    drawBoard();
    let result = checkWinner();
    if (result != null) {
      displayResult(result);
    } else {
      nextTurn();
    }
  }
  
  function drawBoard() {
    let w = width / 3;
    let h = height / 3;
    strokeWeight(4);
  
    // Draw outer lines
    line(0, 0, width, 0); // Top
    line(0, height, width, height); // Bottom
    line(0, 0, 0, height); // Left
    line(width, 0, width, height); // Right
  
    // Draw horizontal lines to separate rows
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
  
    // Draw vertical lines to separate columns
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
  
    // X and O
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];
        textSize(32);
        if (spot == players[1]) {
          noFill();
          ellipse(x, y, w / 2);
        } else if (spot == players[0]) {
          let xr = w / 4;
          line(x - xr, y - xr, x + xr, y + xr);
          line(x + xr, y - xr, x - xr, y + xr);
        }
      }
    }
  }
  
  


  function displayResult(result) {
    if (!gameOver) {
      noLoop();
  
      let resultMessage = createP('');
      resultMessage.style('font-size', '32pt');
      resultMessage.style('color', '#333');
      resultMessage.style('font-family', 'Montserrat, sans-serif'); 
      if (result === 'tie') {
        resultMessage.html('This game has ended in a tie.');
      } else {
        resultMessage.html(`${result} wins!`);
        updateScoreboard(result);
      }
      resultMessage.class('result-message');
      select('.game-container').child(resultMessage);
      gameOver = true;
    }
  }

function resetGame() {
  // Clear the board itself
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          board[i][j] = '';
      }
  }

  // Reset player and clear the grid
  currentPlayer = floor(random(players.length));
  emptyGrid = [];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      emptyGrid.push([i, j]);
    }
  }

  // Clear the result message
  clearResultMessage();

  loop();
  gameOver = false;
}
  

  function clearResultMessage() {
    let resultMessage = select('.result-message');
    if (resultMessage) {
      resultMessage.remove();
    }
  }
  

  let playerXScore = 0;
let playerOScore = 0;

// Add these functions to update and display the scores
function updateScoreboard(winner) {
    if (winner === 'X') {
        playerXScore++;
    } else if (winner === 'O') {
        playerOScore++;
    }
    document.getElementById('playerXScore').textContent = playerXScore;
    document.getElementById('playerOScore').textContent = playerOScore;
}

function clearScoreboard() {
    playerXScore = 0;
    playerOScore = 0;
    document.getElementById('playerXScore').textContent = playerXScore;
    document.getElementById('playerOScore').textContent = playerOScore;
}

  
