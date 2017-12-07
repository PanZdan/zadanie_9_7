//przycisk zainicjowania nowej gry

var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

//wybór gracza

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//wartości początkowe

var gameState = 'notStarted',  //started // ended
  player = {
    name: '',
    score: 0
  },
  computer = {
    score: 0
  };

//wyświetlanie elementów gry

var newGameElem = document.getElementById('js-newGameElement'),
  pickElem = document.getElementById('js-playerPickElement'),
  resultsElem = document.getElementById('js-resultsTableElement'),
  winnerName = document.getElementById('js-winnerName');

function setGameElements() {
  switch(gameState) {
    case 'started':
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
      winnerName.style.display = 'none';
      break;
    case 'ended':
      newGameBtn.innerText = 'Jeszcze raz';
      playerPickElem.innerHTML = "Player selection";
      computerPickElem.innerHTML = "Computer selection";
      playerResultElem.innerHTML = "Player Score";
      computerResultElem.innerHTML = "Computer Score";
    case 'notStarted':
    default:
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
  }
}

setGameElements();

//rozpoczęcie gry

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    
    playerNameElem.innerHTML = player.name;
    setGamePoints(); // This function has not been created yet
  }
}

//losowanie wyboru komputera

function getComputerPick() {
  var possiblePicks = ['rock', 'paper', 'scissors'];
  return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
}
//logika gry i przyznawanie punktów

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';
  if (playerPick == computerPick) {
    winnerIs = 'noone';//remis
    playerResultElem.innerHTML = "Draw!"; 
    computerResultElem.innerHTML = "Draw!";
    if (winnerIs = 'noone') {
        playerResultElem.style.color = '#31b0d5';
        computerResultElem.style.color = '#31b0d5';
    } 

  } else if (
    (computerPick == 'rock' &&  playerPick == 'scissors') ||
    (computerPick == 'scissors' &&  playerPick == 'paper') ||
    (computerPick == 'paper' &&  playerPick == 'rock')) {
    winnerIs = 'computer'; //wygrywa komputer
  }
  if (winnerIs == 'player') {
    playerResultElem.innerHTML = "Win!";
    if (winnerIs == 'player') {
      playerResultElem.style.color = '#449D44';
    } 
    player.score++;
  } else if (winnerIs == 'computer') {
    computerResultElem.innerHTML = "Win!";
      if (winnerIs == 'computer') {
        computerResultElem.style.color = '#C9302C';
      }  
    computer.score++;
  }
  setGamePoints();
  isTenPoints();

}

function playerPick(playerPick) {

  var computerPick = getComputerPick();
  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;
  
  checkRoundWinner(playerPick, computerPick);
}

//aktualizacja wyniku

function setGamePoints() {
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;
}

//zakończenie

function isTenPoints() {
  if (player.score === 10) {
    winnerName.style.display = 'block';
    winnerName.innerHTML = "The Winner is: " + player.name;
    gameState = 'ended';
    setGameElements();
  } else if (computer.score === 10) {
    winnerName.style.display = 'block';
    winnerName.innerHTML = "The Winner is: Computer";
    gameState = 'ended';
    setGameElements();
  }
}