const gifSets = {
  intro: ["./gifs/tokito-yippee_intro.gif", "./gifs/intro_22.gif"],
  yes: ["./gifs/yes33.gif", "./gifs/yes3.gif", "./gifs/yes334.gif"],
  no: [
    "./gifs/no222.gif",
    "./gifs/no11.gif",
    "./gifs/no23.gif",
    "./gifs/no233.gif",
    "./gifs/no24.gif",
    "./gifs/no44gif.gif",
  ],
};

const funnyNoMessages = [
  "I respect your dramatic refusal, but I still have one more very important question.",
  "That was a very brave 'no'—I am still choosing to believe it was a joke.",
  "I am starting to think this is your 'cute' strategy, and I have to admit it's working.",
  "Please take a moment to admire the intensity of this emotional campaign.",
  "I am now fully committed to making this adorable disaster very difficult to ignore.",
  "This is no longer a no; this is a challenge, and I have accepted it with full heart energy.",
];

const introScene = document.getElementById("introScene");
const mainScene = document.getElementById("mainScene");
const introYesBtn = document.getElementById("introYesBtn");
const mainGif = document.getElementById("mainGif");
const yesGallery = document.getElementById("yesGallery");
const questionText = document.getElementById("questionText");
const funnyNote = document.getElementById("funnyNote");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let rejectionCount = 0;
const allNoCount = gifSets.no.length;
let floatTimer = null;

function cycleGif(setKey, index = 0) {
  const gifs = gifSets[setKey];
  mainGif.src = gifs[Math.abs(index) % gifs.length];
}

function updateSizes() {
  const yesScale = Math.min(1.8, 1 + rejectionCount * 0.22);
  const noScale = Math.max(0.45, 1 - rejectionCount * 0.12);

  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.style.transform = `scale(${noScale})`;
  noBtn.style.marginLeft = `${rejectionCount * 8}px`;
}

function showAllYesGifs() {
  mainGif.classList.add("hidden");
  yesGallery.classList.add("visible");
  yesGallery.innerHTML = gifSets.yes
    .map((src) => `<img src="${src}" alt="Yes reaction gif" />`)
    .join("");
}

function resetMainGif() {
  mainGif.classList.remove("hidden");
  yesGallery.classList.remove("visible");
  yesGallery.innerHTML = "";
}

function floatNoButton() {
  clearInterval(floatTimer);
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();

  noBtn.classList.add("floating-no");
  noBtn.style.position = "absolute";
  noBtn.style.zIndex = "20";

  const move = () => {
    const maxX = Math.max(20, containerRect.width - 180);
    const maxY = Math.max(20, containerRect.height - 120);
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.transform = "scale(0.7)";
  };

  move();
  floatTimer = setInterval(move, 700);
}

function startMainFlow() {
  introScene.classList.add("hidden");
  mainScene.classList.remove("hidden");
  resetMainGif();
  cycleGif("intro", 1);
  questionText.textContent = "Will you be my Valentine?";
  funnyNote.textContent = "I promise this is completely serious business.";
  rejectionCount = 0;
  clearInterval(floatTimer);
  noBtn.classList.remove("floating-no");
  noBtn.style.position = "relative";
  noBtn.style.left = "0px";
  noBtn.style.top = "0px";
  noBtn.style.zIndex = "auto";
  updateSizes();
}

introYesBtn.addEventListener("click", startMainFlow);

yesBtn.addEventListener("click", () => {
  if (rejectionCount >= allNoCount) {
    showAllYesGifs();
    questionText.textContent = 'You win. I am officially over the moon, thanks for being my Valentine Lorena 💖';
    funnyNote.textContent = "The full squad has arrived, and I am completely delighted.";
    yesBtn.textContent = "Yes! 💖";
    yesBtn.style.transform = "scale(1.8)";
    noBtn.classList.add("hidden");
    return;
  }

  cycleGif("yes", 0);
  questionText.textContent = 'Yeah! You just made my whole day Lorena 💖';
  funnyNote.textContent = "I knew this would end well. You are officially my favorite human.";
  yesBtn.textContent = "Yes! 💖";
  yesBtn.style.transform = "scale(1.5)";
  noBtn.classList.remove("hidden");
});

noBtn.addEventListener("click", () => {
  rejectionCount += 1;

  if (rejectionCount > allNoCount) {
    floatNoButton();
    questionText.textContent = "This is now a full-blown chase scene...";
    funnyNote.textContent = "The button has escaped. Respect the chaos.";
    return;
  }

  cycleGif("no", rejectionCount - 1);
  const message = funnyNoMessages[Math.min(rejectionCount - 1, funnyNoMessages.length - 1)];
  questionText.textContent =
    rejectionCount === 1
      ? "Aww, really?"
      : rejectionCount === 2
        ? "Come on, pretty please?"
        : "You are making this very difficult...";
  funnyNote.textContent = message;

  if (rejectionCount >= allNoCount) {
    questionText.textContent = "I have officially reached maximum dramatic refusal...";
    funnyNote.textContent = "You have exhausted the no-gifs, so I am switching to “impossible-to-click” mode.";
    floatNoButton();
  }

  updateSizes();
});

updateSizes();
