// questions data 
const questions = [
  {id:1, hint:"Which language structures web pages?", answer:"html", score:1},
  {id:2, hint:"Tag for hyperlink?", answer:"a", score:1},
  {id:3, hint:"External CSS file tag?", answer:"link", score:1.5},
  {id:4, hint:"CSS property for text color?", answer:"color", score:1},
  {id:6, hint:"Unordered list tag?", answer:"ul", score:1},
  {id:7, hint:"What do you call notes in HTML code?", answer:"comment", score:1},
  {id:9, hint:"Print to console in JS?", answer:"log", score:1},
  {id:10, hint:"Which keyword declares a variable in JS?", answer:"let", score:1.75},
  {id:12, hint:"Create button tag?", answer:"button", score:1},
  {id:13, hint:"JS function to stop execution?", answer:"return", score:1.5},
  {id:14, hint:"Make text bold in HTML?", answer:"b", score:1}
];

const $ = document,
  letterBoxContainer = $.querySelector('.letter-grid'),
  attemptsLeftElem = $.querySelector('.info-value.attempts'),
  scoreValueElem = $.querySelector('.info-value.score'),
  currentGuessElem = $.querySelector('.current-word-value'),
  hintTextElem = $.querySelector('.hint-text'),
  continueBtn = $.querySelector('.action-btn.primary-btn'),
  tryAgainBtn = $.querySelector('.action-btn secondary-btn'),
  toastBox = $.querySelector('.toast');


let attempts = 3;
const score = 0;

attemptsLeftElem.textContent = attempts;
scoreValueElem.textContent = score;

// show hint method 
const showRandomHint = () => {

  letterBoxContainer.innerHTML = '';
  let randomNum = Math.floor(Math.random() * questions.length);
  let hintObj = questions[randomNum];
  let { hint, answer } = hintObj;
  
  hintTextElem.textContent = hint;

  for (let i = 1; i <= answer.length; i++) {
    letterBoxContainer.insertAdjacentHTML('beforeend', `<input type="text" class="letter-box" maxlength="1"/>`);
  }

}
                          
showRandomHint();

// guess word 
const guessWord = (event) => {
  let letterBoxes = $.querySelectorAll('.letter-box');

  if (event.target.classList.contains('letter-box')) {

    currentGuessElem.textContent = '';

    letterBoxes.forEach((input, index) => {
      if (input.value.length === 1 && index < letterBoxes.length - 1) {
        letterBoxes[index + 1].focus();
      }

      const allFilled = Array.from(letterBoxes).every(i => i.value.length > 0);
      continueBtn.disabled = !allFilled;

      input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
          letterBoxes[index - 1].focus();
        }
      });

      currentGuessElem.textContent += letterBoxes[index].value;

    });


  }
}



letterBoxContainer.addEventListener('input', guessWord);