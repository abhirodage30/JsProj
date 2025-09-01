const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakesElement = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

// set values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakesCount = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "Footsteps echoed in the silent hallway.",
    "A candle flickered before finally dying out.",
    "The radio played a song no one seemed to know.",
    "An old book smelled faintly of dust and rain.",
    "The wind rattled the shutters against the wall.",
    "Someone scribbled hurried notes on a napkin.",
    "A door creaked open but no one entered.",
    "The clock ticked loudly in the empty room.",
    "Shadows danced across the walls as the light flickered.",
    "A distant thunderstorm rumbled ominously."
  ];

  const randomIndex = Math.floor(Math.random() * paragraph.length);

  typingText.innerHTML = "";
  for (const char of paragraph[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => input.focus());
}

// Handle user input
function initTyping(e) {
  const charElements = typingText.children;
  const typedChar = input.value.charAt(charIndex);

  if (e.inputType === "deleteContentBackward" && charIndex > 0) {
    charIndex--;
    const charElement = charElements[charIndex];

    if (charElement.classList.contains("incorrect")) {
      mistakesCount--;
      mistakesElement.textContent = mistakesCount;
    }

    charElement.classList.remove("correct", "incorrect", "active");
    charElement.classList.add("active");
    cpm.textContent = charIndex - mistakesCount;
    return;
  }

  if (charIndex < charElements.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(updateTime, 1000);
      isTyping = true;
    }

    const charElement = charElements[charIndex];

    if (charElement.textContent === typedChar) {
      charElement.classList.add("correct");
    } else {
      mistakesCount++;
      charElement.classList.add("incorrect");
    }

    charIndex++;
    if (charIndex < charElements.length) {
      charElements[charIndex].classList.add("active");
    }

    mistakesElement.textContent = mistakesCount;
    cpm.textContent = charIndex - mistakesCount;

    if (charIndex === charElements.length) {
      clearInterval(timer);
      input.value = "";
    }
  } else {
    clearInterval(timer);
    input.value = "";
  }
}



function updateTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.textContent = timeLeft;
    const wordsPerMinute = Math.round(
      ((charIndex - mistakesCount) / 5) / (maxTime - timeLeft) * 60
    );
    wpm.textContent = wordsPerMinute;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  mistakesCount = 0;
  isTyping = false;
  input.value = "";
  time.textContent = timeLeft;
  mistakesElement.textContent = mistakesCount;
  cpm.textContent = 0;
  wpm.textContent = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", resetGame);
loadParagraph();
