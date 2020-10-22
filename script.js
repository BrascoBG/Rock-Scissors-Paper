const chooseOption = (option) => {
  let humanChoice = option.id;
  let compChoice = numberToChoice(randomNumber());
  let result = decideWinner(humanChoice, compChoice);
  let message = finalMessage(result);
  rpsFrontEnd(humanChoice, compChoice, message);
};

const randomNumber = () => {
  return Math.floor(Math.random() * 3);
};

const numberToChoice = (number) => {
  return ["rock", "scissors", "paper"][number];
};

const decideWinner = (humanChoice, compChoice) => {
  let rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };
  let humanScore = rpsDatabase[humanChoice][compChoice];
  let computerScore = rpsDatabase[compChoice][humanChoice];
  return [humanScore, computerScore];
};

const finalMessage = ([humanScore, computerScore]) => {
  if (humanScore === 0) {
    return { message: "You Lost!", color: "red" };
  } else if (humanScore === 0.5) {
    return { message: "Draw", color: "yellow" };
  } else if (humanScore === 1) {
    return { message: "You Won!", color: "green" };
  }
};

const rpsFrontEnd = (humanImage, compImage, message) => {
  const imageDataBase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  let humanDiv = document.createElement("div");
  let computerDiv = document.createElement("div");
  let messageDiv = document.createElement("div");
  let resetButton = document.createElement("div");

  humanDiv.innerHTML = `<img src="${imageDataBase[humanImage]}" />`;
  computerDiv.innerHTML = `<img src="${imageDataBase[compImage]}" />`;
  messageDiv.innerHTML = `<h1 style="color: ${message.color};">${message.message}</h1>`;
  resetButton.innerHTML =
    "<button onclick='newGameHandler()'>New Game</button>";

  document
    .querySelector(".options")
    .appendChild(humanDiv)
    .classList.add("shadow__blue");

  document.querySelector(".options").appendChild(messageDiv);

  document
    .querySelector(".options")
    .appendChild(computerDiv)
    .classList.add("shadow__red");

  document.querySelector(".container").appendChild(resetButton);
};

const newGameHandler = () => {
  location.reload();
};
