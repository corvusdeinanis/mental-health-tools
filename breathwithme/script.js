const sequence = [
  "1",
  "relax",
  "2",
  "relax",
  "3",
  "relax",
  "4",
  "relax",
  "5",
  "relax",
  "6",
  "relax",
  "7",
  "relax",
  "8",
  "relax",
  "8",
  "relax",
  "7",
  "relax",
  "6",
  "relax",
  "5",
  "relax",
  "4",
  "relax",
  "3",
  "relax",
  "2",
  "relax",
  "1",
  "relax"
];

const circle = document.getElementById("circle");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const endMessage = document.getElementById("endMessage");

async function awaitTimeout(callback, milliseconds = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      callback();
      resolve();
    }, milliseconds);
  });
}

function finishExercise() {
  startButton.removeAttribute("disabled");
  endMessage.innerHTML = "Well done. You've got this.";
}

function animate(item) {
  circle.innerText = item;
  if (item === "relax") {
    circle.className = "circle";
  } else {
    circle.classList.add("circle-big", "circle-" + item);
  }
}

async function animateAllAsync() {
  startButton.setAttribute("disabled", true);
  endMessage.innerHTML = "";

  // Start the exercise after a small delay
  await awaitTimeout(animate.bind(null, sequence[0]), 1000);
  
  // iterate through the rest of the sequence, giving the animation enough time to complete
  let counter = 1;
  while (counter < sequence.length) {
    await awaitTimeout(animate.bind(null, sequence[counter]), 3000);
    counter += 1;
  }

  await awaitTimeout(finishExercise, 3000);
}

startButton.addEventListener("click", animateAllAsync);
