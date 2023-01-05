const difficultiSection = document.querySelector("#select-difficulty");
const gameSection = document.querySelector("#game");
const numInput = gameSection.children.numInput;
const feedbackElement = gameSection.children.feedback;
const difficultiSectionButtons = document.querySelector(
  "#select-difficulty ul"
);

const resultBox = document.querySelector("#result");
const resultIcon = document.querySelector("#resultIcon");
const resultText = document.querySelector("#resultText");
const heartsElement = document.querySelector("#hearts");
const timerElement = document.querySelector("#timer");
const winIcons = ["😍", "🎉", "🥳", "🤩", "😁"];
const looseIcons = ["😥", "😲", "😔", "😭", "😫"];

const gameOptions = {
  difficulty: null,
  hearts: 5,
  randNumber: null,
  timer: null,
  interval: null,
};

function gameOver(isWinner) {
  clearInterval(gameOptions.interval);
  if (isWinner) {
    resultIcon.innerHTML =
      winIcons[Math.floor(Math.random() * winIcons.length)];
    resultText.innerHTML = `آفرین درست حدس زدی عدد ${gameOptions.randNumber} بود.`;
  } else {
    resultIcon.innerHTML =
      looseIcons[Math.floor(Math.random() * looseIcons.length)];
    resultText.innerHTML = `متاسفانه باختی عدد  ${gameOptions.randNumber} بود.`;
  }

  resultBox.classList.remove("hidden");
  resultBox.classList.add("popup");

  setTimeout(() => {
    resultBox.classList.remove("popup");
  }, 2000);

  gameOptions.difficulty = null;
  gameOptions.hearts = 5;
  gameOptions.randNumber = null;
  updateSections();
}

difficultiSectionButtons.addEventListener("click", (e) => {
  if (e.target.localName === "li") {
    gameOptions.difficulty = e.target.id;
  }

  setRandNumber();
  updateSections();
  startTheGame();
});

function setRandNumber() {
  switch (gameOptions.difficulty) {
    case "easy":
      return (gameOptions.randNumber = Math.floor(Math.random() * 20) + 1);
    case "normal":
      return (gameOptions.randNumber = Math.floor(Math.random() * 30) + 1);
    case "hard":
      return (gameOptions.randNumber = Math.floor(Math.random() * 50) + 1);
  }
}

function updateSections() {
  if (gameOptions.difficulty) {
    difficultiSection.className = "hidden";
    gameSection.classList.remove("hidden");
  } else {
    gameSection.className = "hidden";
    difficultiSection.classList.remove("hidden");
  }
  feedbackElement.innerHTML = "";
}

function showDifficulty() {
  const titleElement = gameSection.children.title;
  console.log(gameSection.children.title);
  switch (gameOptions.difficulty) {
    case "easy":
      titleElement.innerHTML = "یک عدد بین 1 تا 20 حدس بزنید.";
      break;
    case "normal":
      titleElement.innerHTML = "یک عدد بین 1 تا 30 حدس بزنید.";
      break;
    case "hard":
      titleElement.innerHTML = "یک عدد بین 1 تا 50 حدس بزنید.";
  }
}

numInput.addEventListener("change", (e) => {
  const guess = +e.target.value;
  console.log(gameOptions);
  if (guess === gameOptions.randNumber) {
    gameOver(true);
  } else if (guess > gameOptions.randNumber) {
    feedbackElement.innerHTML = "نه ! عدد کمتر از ایناست...";
  } else {
    feedbackElement.innerHTML = "نه ! عدد بیشتر از ایناست...";
  }
  if (--gameOptions.hearts === 0) {
    gameOver(false);
  }
  heartsElement.innerHTML = "❤".repeat(gameOptions.hearts);
  e.target.value = "";
});

function startTimer() {
  switch (gameOptions.difficulty) {
    case "easy":
      gameOptions.timer = 20;
      break;
    case "normal":
      gameOptions.timer = 15;
      break;
    case "hard":
      gameOptions.timer = 10;
      break;
  }
  timerElement.innerHTML = gameOptions.timer;
  timerElement.style.color = "white";
  timerElement.style.fontSize = "50px";

  gameOptions.interval = setInterval(() => {
    gameOptions.timer--;
    timerElement.innerHTML = gameOptions.timer;
    if (gameOptions.timer <= 7) {
      timerElement.style.color = "yellow";
      timerElement.style.fontSize = "60px";
    }
    if (gameOptions.timer <= 3) {
      timerElement.style.color = "red";
      timerElement.style.fontSize = "70px";
    }
    if (gameOptions.timer === 0) {
      gameOver(false);
    }
  }, 1000);
}

function startTheGame() {
  showDifficulty();
  startTimer();
  numInput.focus();
  heartsElement.innerHTML = "❤".repeat(5);
}
