// questions data 
const questions = [
  {id:1, hint:"Which language structures web pages?", answer:"html", score:1.5},
  {id:2, hint:"Tag for hyperlink?", answer:"a", score:1.5},
  {id:3, hint:"External CSS file tag?", answer:"link", score:2},
  {id:4, hint:"CSS property for text color?", answer:"color", score:1.5},
  {id:5, hint:"Unordered list tag?", answer:"ul", score:1.5},
  {id:6, hint:"JS keyword for variable?", answer:"let", score:2},
  {id:7, hint:"Print to console in JS?", answer:"log", score:1.5},
  {id:8, hint:"Make text bold in HTML?", answer:"b", score:1.5},
  {id:9, hint:"HTML element for image?", answer:"img", score:2},
  {id:10, hint:"HTML element for paragraph?", answer:"p", score:1.5},
  {id:11, hint:"CSS to hide element?", answer:"none", score:2},
  {id:12, hint:"CSS property for margin?", answer:"margin", score:2},
  {id:13, hint:"JS function to stop execution?", answer:"return", score:2},
  {id:14, hint:"Tag for table row?", answer:"tr", score:1.5},
  {id:15, hint:"Tag for table data?", answer:"td", score:1.5},
  {id:16, hint:"HTML tag for list item?", answer:"li", score:1.5},
  {id:17, hint:"CSS to make text italic?", answer:"italic", score:2},
  {id:18, hint:"JS keyword for constant?", answer:"const", score:2},
  {id:19, hint:"JS keyword for function?", answer:"function", score:2},
  {id:20, hint:"CSS property for font size?", answer:"px", score:1.5}
];

// dom elements 
const $ = document,
  letterBoxContainer = $.querySelector('.letter-grid'),
  attemptsLeftElem = $.querySelector('.info-value.attempts'),
  scoreValueElem = $.querySelector('.info-value.score'),
  currentGuessElem = $.querySelector('.current-word-value'),
  hintTextElem = $.querySelector('.hint-text'),
  continueBtn = $.querySelector('.action-btn.primary-btn'),
  toastBox = $.querySelector('.toast'),
  modalElem = $.querySelector('.modal-overlay'),
  finalScoreElem = $.querySelector('.modal-overlay strong'),
  tryGameAgainBtn = $.querySelector('.modal-btn');


// initial variables
let attempts = 3;
let score = 0;
let currentQuestionObj = questions[Math.floor(Math.random() * questions.length)];


// initial values 
attemptsLeftElem.textContent = attempts;
scoreValueElem.textContent = score;
hintTextElem.textContent = currentQuestionObj.hint;


const generateLetterBoxes = () => {
  letterBoxContainer.innerHTML = '';
  for (let i = 1; i <= currentQuestionObj.answer.length; i++) {
    letterBoxContainer.insertAdjacentHTML('beforeend', `<input type="text" class="letter-box" maxlength="1"/>`)
  }
}

generateLetterBoxes();

// handle letter boxes functionality 
const handleLetterInput = () => {
  const letterBoxes = $.querySelectorAll('.letter-box');
  letterBoxes[0].focus();

  letterBoxes.forEach((letterBox, index) => {

    letterBox.addEventListener('input', () => {

      currentGuessElem.textContent = Array.from(letterBoxes)
        .map(box => box.value)
        .join('');

      if (letterBox.value.length === 1 && index < letterBoxes.length - 1) {
        letterBoxes[index + 1].focus();
      }

      continueBtn.disabled = !Array.from(letterBoxes).every(box => box.value.length > 0);

    });

    letterBox.addEventListener('keydown', (event) => {
      if (event.key === "Backspace" && letterBox.value === "" && index > 0) {
        letterBoxes[index - 1].focus();
      }
    });

  });

};

handleLetterInput();

// handle user guess 
const checkGuess = () => {
  const letterBoxes = $.querySelectorAll('.letter-box');
  let allFilled = Array.from(letterBoxes).every(letterBox => letterBox.value.length > 0);
  let userGuess = currentGuessElem.textContent;

  if (!allFilled) {
      showToast('error', 'Invalid Data', `Please fill all boxes.`);
  } else if (allFilled && userGuess && userGuess.toLowerCase() === currentQuestionObj.answer.toLowerCase()) {
    score += currentQuestionObj.score;
    scoreValueElem.textContent = score;
    currentQuestionObj = questions[Math.floor(Math.random() * questions.length)];
    hintTextElem.textContent = currentQuestionObj.hint;

    showToast('success', 'Correct Guess!', 'Well done! You found the right word.');
    setTimeout(() => {
      clearData(letterBoxes, currentGuessElem);
      generateLetterBoxes();
      handleLetterInput();
    }, 2000);

  } else {
    attempts--;
    attemptsLeftElem.textContent = attempts;

    showToast('error', 'Invalid Word', `Please enter a valid ${letterBoxes.length}-letter word.`);
    setTimeout(() => {
      clearData(letterBoxes, currentGuessElem);
      generateLetterBoxes();
      handleLetterInput();
    }, 2000);

    if (attempts <= 0) {
      modalElem.classList.add('show');
      finalScoreElem.textContent = score;
    }

  }
  
}

// show and hide toast box
const showToast = (type, title, message) => {
  toastBox.className = `toast toast-${type} show`;

  const titleElement = toastBox.querySelector('.toast-title');
  const messageElement = toastBox.querySelector('.toast-message');

  if (titleElement) titleElement.textContent = title;
  if (messageElement) messageElement.textContent = message;

  setTimeout(() => {
    toastBox.classList.remove('show');
  }, 3000);

}

// handle clear user guess data 
const clearData = (letterBoxes, userGuessElem) => {
  letterBoxes.forEach(box => box.value = '');
  userGuessElem.textContent = '';
}

const startGameAgain = () => {
  const letterBoxes = $.querySelectorAll('.letter-box');
  modalElem.classList.remove('show');

  attempts = 3;
  score = 0;
  currentQuestionObj = questions[Math.floor(Math.random() * questions.length)];
  attemptsLeftElem.textContent = attempts;
  scoreValueElem.textContent = score;
  hintTextElem.textContent = currentQuestionObj.hint;

  clearData(letterBoxes, currentGuessElem);
  generateLetterBoxes();
  handleLetterInput();
}

// trigger the enter key for the check guess method 
document.addEventListener('keydown', (event) => {
  if (event.key === "Enter") checkGuess();
})

continueBtn.addEventListener('click', checkGuess);
tryGameAgainBtn.addEventListener('click', startGameAgain);