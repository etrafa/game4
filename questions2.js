"using strict";

const playButtonEl = document.querySelector(".hexagon-shape");
const menuContainerEl = document.querySelector(".menu-container");
const spinnerContainerEl = document.querySelector(".spinner-container");
const spinnerButtonEl = document.querySelector(".spinner-button");
const spinnerWheelEl = document.querySelector(".spinner-wheel");
const spinWheelTextEl = document.querySelector(".spin-wheel-text");
const buttonContainerEl = document.querySelector(".question-options");
const questionTypeContainer = document.querySelector(".question-type");
const questionTypeTextEl = document.querySelector(".question-type-text");
const questionTextEl = document.querySelector(".question-text");
const firstOptionEl = document.querySelector(".first-option");
const secondOptionEl = document.querySelector(".second-option");
const thirdOptionEl = document.querySelector(".third-option");
const fourthOptionEl = document.querySelector(".fourth-option");
const answerCheckerText = document.querySelector(".answer-checker-text");
const nextQuestionButton = document.querySelector(".next-question-button");
const questionContainer = document.querySelector(".question-container");
const userAnswerContainer = document.querySelector(".user-answer-counter");
const userCorrectAnswerEl = document.querySelector(".user-correct-answer");
const userWrongAnswerEl = document.querySelector(".user-wrong-answer");
const questionLeftEl = document.querySelector(".question-left");

let questionType,
  randomNumber,
  correctAnswer,
  randomQuestionNumber,
  questionAnswers;
let userCorrectAnswerCounter = 0;
let userWrongAnswerCounter = 0;
let questionLeftCounter = 10;

answerCheckerText.style.display = "none";
nextQuestionButton.style.display = "none";
questionContainer.style.display = "none";

const spinWheelDegrees = [
  { degree: 25, questionType: "science", category: 17 },
  { degree: 75, questionType: "movie", category: 11 },
  { degree: 125, questionType: "geography", category: 22 },
  { degree: 175, questionType: "history", category: 23 },
  { degree: 225, questionType: "art", category: 25 },
  { degree: 280, questionType: "sports", category: 21 },
  { degree: 340, questionType: "random", category: 20 },
];

const backgroundType = () => {
  if (questionType === "science") {
    questionTypeContainer.style.backgroundColor = "#5CB85C";
  } else if (questionType === "movie") {
    questionTypeContainer.style.backgroundColor = "#B94AA2";
  } else if (questionType === "geography") {
    questionTypeContainer.style.backgroundColor = "#3B9AC7";
  } else if (questionType === "history") {
    questionTypeContainer.style.backgroundColor = "#F0AD4E";
  } else if (questionType === "art") {
    questionTypeContainer.style.backgroundColor = "#D9534F";
  } else if (questionType === "sports") {
    questionTypeContainer.style.backgroundColor = "#DF691A";
  } else if (questionType === "randomly") {
    questionTypeContainer.style.backgroundColor = `#684399`;
  }
};

const selectQuestionType = () => {
  randomNumber = Math.trunc(Math.random() * 7);
  spinWheelTextEl.textContent = "We're choosing a question for you...";
  spinnerWheelEl.classList.add("spinner-wheel-active");
  setTimeout(() => {
    spinnerWheelEl.classList.remove("spinner-wheel-active");
    spinnerWheelEl.classList.add("spinner-wheel-active-fast");
  }, 200);
  setTimeout(() => {
    spinnerWheelEl.classList.remove("spinner-wheel-active-fast");
    spinnerWheelEl.style.transform = `rotate(${spinWheelDegrees[randomNumber].degree}deg)`;
    spinWheelTextEl.textContent = `You will be asked ${spinWheelDegrees[randomNumber].questionType} question.`;
    questionType = spinWheelDegrees[randomNumber].questionType;
  }, 200);
  setTimeout(() => {
    spinWheelTextEl.textContent = "Get Ready...";
  }, 220);
  setTimeout(() => {
    spinnerContainerEl.style.display = "none";
    questionContainer.style.display = "block";
    questionTextEl.style.display = "block";
    fetchHistoryQuestion(spinWheelDegrees[randomNumber].category);
  }, 240);
};

const resetTheSettings = () => {
  questionContainer.style.display = "none";
  spinnerContainerEl.style.display = "block";
  spinWheelTextEl.textContent = "SPIN THE WHEEL TO CHOOSE QUESTION TYPE.";
  answerCheckerText.style.display = "none";
  buttonContainerEl.style.display = "block";
  nextQuestionButton.style.display = "none";
  userAnswerContainer.style.display = "none";
  firstOptionEl.style.backgroundColor = "#fff";
  secondOptionEl.style.backgroundColor = "#fff";
  thirdOptionEl.style.backgroundColor = "#fff";
  fourthOptionEl.style.backgroundColor = "#fff";
  firstOptionEl.classList.remove("correct-answer-animation");
  secondOptionEl.classList.remove("correct-answer-animation");
  thirdOptionEl.classList.remove("correct-answer-animation");
  fourthOptionEl.classList.remove("correct-answer-animation");
};

const showCorrectAnswer = () => {
  if (firstOptionEl.textContent === correctAnswer) {
    firstOptionEl.classList.add("correct-answer-animation");
    firstOptionEl.style.backgroundColor = "#00ff00";
  } else if (secondOptionEl.textContent === correctAnswer) {
    secondOptionEl.classList.add("correct-answer-animation");
    secondOptionEl.style.backgroundColor = "#00ff00";
  } else if (thirdOptionEl.textContent === correctAnswer) {
    thirdOptionEl.classList.add("correct-answer-animation");
    thirdOptionEl.style.backgroundColor = "#00ff00";
  } else if (fourthOptionEl.textContent === correctAnswer) {
    fourthOptionEl.classList.add("correct-answer-animation");
    fourthOptionEl.style.backgroundColor = "#00ff00";
  }
};

spinnerButtonEl.addEventListener("click", () => {
  selectQuestionType();
});

const fetchHistoryQuestion = (category) => {
  fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
  ).then((response) =>
    response.json().then((data) => {
      console.log(data);
      randomQuestionNumber = Math.trunc(Math.random() * 9 + 1);
      questionTypeTextEl.textContent = questionType.toUpperCase();
      questionAnswers = [
        data.results[randomQuestionNumber].correct_answer,
        data.results[randomQuestionNumber].incorrect_answers,
      ]
        .flat()
        .sort(() => Math.random() - 0.5);
      console.log(questionAnswers);

      correctAnswer = data.results[randomQuestionNumber].correct_answer;
      console.log(correctAnswer);
      firstOptionEl.textContent = questionAnswers[0];
      secondOptionEl.textContent = questionAnswers[1];
      thirdOptionEl.textContent = questionAnswers[2];
      fourthOptionEl.textContent = questionAnswers[3];
      questionTextEl.innerHTML = data.results[randomQuestionNumber].question;
      console.log(questionTextEl.innerHTML);
      backgroundType();
    })
  );
};

const correctAnswerChecker = (target, button) => {
  if (target === correctAnswer) {
    console.log("correct");
    questionTextEl.style.display = "none";
    answerCheckerText.style.display = "block";
    answerCheckerText.textContent = "CORRECT";
    answerCheckerText.style.color = "#00ff00";
    nextQuestionButton.style.display = "block";
    questionLeftCounter = questionLeftCounter - 1;
    questionLeftEl.textContent = questionLeftCounter;
    userCorrectAnswerCounter = userCorrectAnswerCounter + 1;
    userCorrectAnswerEl.textContent = userCorrectAnswerCounter;
    setTimeout(() => {
      answerCheckerText.style.display = "none";
      userAnswerContainer.style.display = "block";
      buttonContainerEl.style.display = "none";
      questionTypeTextEl.textContent = "RESULTS";
    }, 5000);
  } else {
    console.log("incorrect");
    button.style.backgroundColor = "#ff0000";
    questionTextEl.style.display = "none";
    answerCheckerText.textContent = "WRONG";
    answerCheckerText.style.color = "#ff0000";
    answerCheckerText.style.display = "block";
    nextQuestionButton.style.display = "block";
    questionLeftCounter = questionLeftCounter - 1;
    questionLeftEl.textContent = questionLeftCounter;
    userWrongAnswerCounter = userWrongAnswerCounter + 1;
    userWrongAnswerEl.textContent = userWrongAnswerCounter;
    setTimeout(() => {
      answerCheckerText.style.display = "none";
      userAnswerContainer.style.display = "block";
      buttonContainerEl.style.display = "none";
      questionTypeTextEl.textContent = "RESULTS";
    }, 5000);
  }
};

const finalResult = () => {};

firstOptionEl.addEventListener("click", () => {
  correctAnswerChecker(firstOptionEl.textContent, firstOptionEl);
  showCorrectAnswer();
});
secondOptionEl.addEventListener("click", () => {
  correctAnswerChecker(secondOptionEl.textContent, secondOptionEl);
  showCorrectAnswer();
});
thirdOptionEl.addEventListener("click", () => {
  correctAnswerChecker(thirdOptionEl.textContent, thirdOptionEl);
  showCorrectAnswer();
});
fourthOptionEl.addEventListener("click", () => {
  correctAnswerChecker(fourthOptionEl.textContent, fourthOptionEl);
  showCorrectAnswer();
});

nextQuestionButton.addEventListener("click", () => {
  resetTheSettings();
});

// const correctCharacter = (target) => {
//   target = target
//     .replaceAll("&rsquo;", "'")
//     .replaceAll("&ldquo;", `"`)
//     .replaceAll("&rdquo;", `"`)
//     .replaceAll("&quot;", `"`)
//     .replaceAll("&#039;", "'")
//     .replaceAll("&deg;", "°")
//     .replaceAll("&uuml;", "ü");
//   console.log(target);
// };
