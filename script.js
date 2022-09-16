let startQuizBtn = document.querySelector(".startBtn");
let timeBarEl = document.querySelector(".timerBar");

let timerEl = document.querySelector("#timeRemaining");
let intervalId;
let timer = 60;
let questionEl = document.getElementById("questionSlot");
let choiceContainer = document.getElementById("answers");
let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let choiceD = document.getElementById("D");
let container = document.querySelector(".container");
let currentQuestionIndex = 0;

function showTimeBar() {
  if (timeBarEl.style.visibility === "hidden") {
    timeBarEl.style.visibility = "visible";
  } else {
    timeBarEl.style.visibility = "hidden";
  }
}

function startTimer() {
  intervalId = setInterval(function () {
      timer--;
      timerEl.textContent = timer;
      
      if (timer <= 0) {
          timeBarEl.style.visibility = "hidden";
          clearInterval(intervalId);
          gameEnds();
        }
    }, 1000);
}

function deductTime() {
    timer -= 10;
}

startQuizBtn.addEventListener("click", gameStarts);

function gameStarts() {
  startScreenEl.setAttribute("class", "hideA");
  showTimeBar();
  startTimer();
  showQuizCon.classList.add("showA");
  renderQuestion();
}

let questions = [
    {
        question: "Which letter comes first ",
        choices: ["X", "K", "C", "D"],
        answer: "C",
      },
      { question: "What is 1+1-1-1?", 
      choices: ["0", "2", "1", "1.5"], 
      answer: "0" },
      {
        question: "How much wood could a wood chuck chug if a wood chuck could chug wood? (use google)",
        choices: ["200 pounds", "300pounds", "700pounds", "1000pounds"],
        answer: "700pounds",
      },
      {
        question: "Who is 'The Muffin Man'",
        choices: ["Frederic Thomas Linwood", "Shrek", "Lord Farquah", "Santa Claus"],
        answer: "Frederic Thomas Linwood",
      },
];

var startScreenEl = document.getElementById("startQuiz");
var showQuizCon = document.querySelector(".quizContainer");

choiceContainer.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    verifyAnswer(event);
  }
});

function verifyAnswer(event) {
  if (
    questions[currentQuestionIndex] &&
    questions[currentQuestionIndex].answer === event.target.textContent
  ) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    deductTime();
    currentQuestionIndex++;
    renderQuestion();
  }
}
      
function renderQuestion() {
  if (currentQuestionIndex >= questions.length || timer <= 0) {
    score = timer;
    timer = 0;
    let scoreEl = document.querySelector("#totalScore");
    scoreEl.textContent = score;
    gameEnds();

    return;
  } else {
    questionEl.textContent = questions[currentQuestionIndex].question;
    choiceA.textContent = questions[currentQuestionIndex].choices[0];
    choiceB.textContent = questions[currentQuestionIndex].choices[1];
    choiceC.textContent = questions[currentQuestionIndex].choices[2];
    choiceD.textContent = questions[currentQuestionIndex].choices[3];
  }
}

function gameEnds() {
  document.querySelector(".quizContainer").innerHTML = "";
  document.querySelector(".gameOver").style.display = "block";
}

let showScore = document.querySelector(".displayScore");
let saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let userName = document.querySelector("#name");
  let initial = userName.value;
  if (initial === "") {
    console.log("no value entered");
  } else {
    let finalScore = { initials: initial, score: score };
    console.log(finalScore);
    let allScores = localStorage.getItem("allScores");
    if (allScores === null) {
      allScores = [];
    } else {
      allScores = JSON.parse(allScores);
    }
    allScores.push(finalScore);
    let newScore = JSON.stringify(allScores);

    localStorage.setItem("allScores", newScore);
    for (let i = 0; i < allScores.length; i++) {
      var createLi = document.createElement("li");
      localStorage.getItem("allScores", newScore);
      createLi.innerHTML = allScores[i].initials + " " + allScores[i].score;
      showScore.appendChild(createLi);
    }
  }
});