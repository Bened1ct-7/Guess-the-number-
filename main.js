function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//main game variables
const gameForm = document.forms['game'];
const userInput = gameForm.querySelector('#guess');
const gameBtn = gameForm.querySelector('button');
const prev = document.querySelector('.prev');
const hiLo = document.querySelector('.hiLo');
const gameOver = document.querySelector('.gameOver');
const icon = document.querySelector('.icon i');
const welcomeForm = document.forms['welcom'];
const playerName = welcomeForm.querySelector('input');
const welcome = document.getElementById('welcome');
const para = welcome.querySelector('p');
const gameSet = document.querySelector('.game-set');
const wel = document.querySelector('.welcome');
const settings = document.forms['settings'];
const min = settings.querySelector('#min');
const max = settings.querySelector('#max');
const trails = settings.querySelector('#trials');
const mainGame = document.querySelector('.main-game');

const guessed = [];
let randomNumber;
let userCount;
let userGuess, difference, text, hiText, userName, minVal, maxVal;



welcomeForm.addEventListener('submit', e => {
  e.preventDefault();
  if (playerName.value === '') {
    displayMessage('Please enter your name')
  } else {
    userName = playerName.value;
    welcomeForm.style.display = `none`;
    para.textContent = userName;
    welcome.style.display = 'flex';
    setTimeout(() => welcome.style.display = 'none', 3000);
    setTimeout(() => {
      wel.style.display = 'none';
      gameSet.style.display = 'block'
    }, 3100)
  }
})



settings.addEventListener('submit', e => {
  e.preventDefault();
  if (min.value !== '' && max.value !== '') {
    minVal = Number(min.value);
    maxVal = Number(max.value);
    randomNumber = random(minVal, maxVal)
    userCount = trials.value;
    gameSet.style.display = 'none';
    mainGame.style.display = 'block';
    console.log(randomNumber);
  }
})

gameForm.addEventListener('submit', e => {
  e.preventDefault();
  if (userInput.value !== '') {
    runGame();
  } else {
    displayMessage("You need to enter a guess");
  }
})

function runGame() {
  icon.className = `fa-solid fa-face-smile`;
  hiLo.textContent = '';
  userGuess = Number(userInput.value);
  if (userCount < 1) {
    displayMessage(`Game Over!! The number was ${randomNumber}. Do you want to play another round?`, 'show');
    setGameOver();
  } else {
    if (guessed.includes(userInput.value)) {
      displayMessage(`You have previously guessed this number (${userGuess}). Choose another`)
    } else {
      guessed.push(userInput.value);
      prev.textContent += userGuess + ' ';

      if (userGuess === randomNumber) {
        winGame();
      } else if (userGuess !== randomNumber) {
        gameOver.textContent = ``;
        difference = userGuess - randomNumber;
        if (difference < 0) {
          difference *= -1
        }
        if (difference < 0.1 * maxVal) {
          text = `You are just a few numbers away`;
          icon.className = `fa-solid fa-face-surprise`;
        } else if (difference < 0.2 * maxVal) {
          text = `You are getting very close`;
          icon.className = `fa-solid fa-face-surprise`;
        } else if (difference > 0.5 * maxVal) {
          text = `You're too far off ${userName}`;
          icon.className = `fa-solid fa-face-smile`;
        } else {
          text = `You are a bit off ${userName}, keep guessing`;
          icon.className = `fa-solid fa-face-grin-beam-sweat`;
        }

        hiText = (userGuess < randomNumber) ? 'Your guess is too low' : 'Your guess is too high';

        hiLo.innerHTML = `${hiText} <br> ${text}`;
      }
    }
  }

  userInput.value = '';
  userInput.focus();
  userCount--;
}


function winGame() {
  setGameOver();
  displayMessage(`Congrats ${userName}, you won the game! Do you want to play again?`, 'show');
  gameOver.textContent = `CONGRATULATIONS`;
  gameOver.style.color = `green`;
  hiLo.textContent = `Welldone ${userName}, the number was ${randomNumber}`;
}

function setGameOver() {
  userInput.disabled = true;
  gameBtn.disabled = true;
  gameOver.style.color = `red`;
  gameOver.textContent = `GAME OVER!!`;
  hiLo.textContent = `Sorry, the number was ${randomNumber}`;
}

function resetGame() {
  userInput.disabled = false;
  gameBtn.disabled = false;
  gameOver.style.color = `#000`;
  prev.textContent = `Previous Guesses: `;
  userCount = trials.value;
  hiLo.textContent = ``;
  gameOver.textContent = 'NEW GAME!!';
  guessed = [];
  randomNumber = random(min.value, max.value)
  console.log(randomNumber);
}


function displayMessage(text, display) {
  div = document.createElement('div');
  div.className = 'msg-box';
  document.body.appendChild(div);

  const button = document.createElement('button');
  button.innerText = 'X';
  button.className = 'clear-btn';
  div.appendChild(button);

  const para = document.createElement('p');
  para.className = 'msg-text';
  para.innerText = text;
  div.appendChild(para);

  if (!display) {
    setTimeout(() => div.parentNode.removeChild(div), 3000)
  }

  button.addEventListener('click', () => {
    div.parentNode.removeChild(div);
  })

  if (display === 'show') {
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button-div';
    const yesBtn = document.createElement('button');
    yesBtn.className = 'yes-btn';
    yesBtn.innerText = 'Yes'
    buttonDiv.appendChild(yesBtn);
    div.appendChild(buttonDiv);

    yesBtn.addEventListener('click', () => {
      div.parentNode.removeChild(div);
      resetGame()
    })

    const noBtn = document.createElement('button');
    noBtn.className = 'no-btn';
    noBtn.innerText = 'No'
    buttonDiv.appendChild(noBtn);

    noBtn.addEventListener('click', () => {
      div.parentNode.removeChild(div);
      displayMessage('Okay! Thanks for Playing!', '');
    })
  }
}
