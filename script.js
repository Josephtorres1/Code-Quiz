const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const saveButton = document.getElementById("save-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const countdown = document.getElementById("countdown");
const form = document.getElementById("initials");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
saveButton.addEventListener("click", saveScore);
startButton.addEventListener("click", startCountdown);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  countdown.classList.remove("hide");
  countdown.innerText = "60";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function startCountdown() {
  var seconds = document.getElementById("countdown").textContent;
  var countdown = setInterval(function () {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (
      seconds <= 0 ||
      shuffledQuestions.length - 1 < currentQuestionIndex + 1
    ) {
      clearInterval(countdown);
      questionContainerElement.classList.add("hide");
      form.classList.remove("hide");
      saveButton.classList.remove("hide");
    }
  }, 1000);
}

function saveScore() {
  var highscores = [];
  highscores.push(countdown.textContent);
  console.log(highscores);
  saveButton.classList.add("hide");
  countdown.classList.add("hide");
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
  localStorage.setItem("highscores", JSON.stringify(highscores));
  var storedScores = JSON.parse(localStorage.getItem("highscores"));
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Which operator assigns a value in JavaScript?",
    answers: [
      { text: "=", correct: false },
      { text: "==", correct: true },
      { text: "<=", correct: false },
      { text: "()", correct: false },
    ],
  },
  {
    question: "What does CSS do for HTML?",
    answers: [
      { text: "Provides more HTML", correct: false },
      { text: "Does the work for you", correct: false },
      { text: "Allows the app to be mobile responsive", correct: false },
      {
        text: "Describes how HTML elements are to be displayed",
        correct: true,
      },
    ],
  },
  {
    question: "The following is true about arrays EXCEPT:",
    answers: [
      {
        text: "Array elements do not always have to be the same type",
        correct: true,
      },
      {
        text:
          "The variables in the array are ordered and each have an index beginning from 0",
        correct: false,
      },
      {
        text: "The direct superclass of an array type is Object",
        correct: false,
      },
      {
        text:
          "An array is an indexed collection of data elements of the same type",
        correct: false,
      },
    ],
  },
  {
    question: "Commonly used data types do NOT include:",
    answers: [
      { text: "Booleans", correct: true },
      { text: "Strings", correct: false },
      { text: "Numbers", correct: false },
      { text: "They do not include any of these", correct: false },
    ],
  },
  {
    question: "The condition in an if/else statement is enclosed within",
    answers: [
      { text: "Quotes", correct: false },
      { text: "Curly brackets", correct: false },
      { text: "Square brackets", correct: false },
      { text: "Parantheses", correct: true },
    ],
  },
];
