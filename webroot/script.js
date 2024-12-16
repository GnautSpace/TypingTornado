class App {
  constructor() {
    let words = ["galaxy", "nebula", "loft", "fjord", "pious", "relic", "rodeo", "meteor", "comet", "heist","stardust", "orbit","jaunt","jiffy","ledge","flank","stark","yacht"];
    let powerUpWords = ["supernova", "blackhole", "quasar", "pulsar","derby","flank","rubric","elixir"];
    let currentWord = "";
    let score = 0;
    let timer = 30;
    let interval;
    let powerUpInterval;
    let powerUpActive = false;

    const wordDisplay = document.getElementById("word-display");
    const userInput = document.getElementById("user-input");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("end-screen");
    const finalScore = document.getElementById("final-score");
    const startButton = document.getElementById("start-btn");
    const newGameButton = document.getElementById("new-game-btn");

    function getWordWithBlanks(word) {
      const index = Math.floor(Math.random() * word.length);
      return word.slice(0, index) + '_' + word.slice(index + 1);
    }
    function checkGuess() {
      const guess = guessInput.value.trim().toLowerCase();
      if (guess === currentWord) {
        score++;
        scoreDisplay.textContent = score;
        currentWord = words[Math.floor(Math.random() * words.length)];
        wordDisplay.textContent = getWordWithBlanks(currentWord);
        guessInput.value = '';
      }
    }


    function startGame() {
      startScreen.style.display = "none";
      gameScreen.style.display = "block";
      resetGame();
      generateWord();
      interval = setInterval(updateTimer, 1000);
      powerUpInterval = setInterval(spawnPowerUpWord, 10000); 
    }

    function resetGame() {
      score = 0;
      timer = 30;
      powerUpActive = false;
      scoreDisplay.textContent = `Score: ${score}`;
      timerDisplay.textContent = `Time: ${timer}s`;
      userInput.value = "";
    }
    function updateTimer() {
      timer--;
      timerDisplay.textContent = `Time: ${timer}s`;
      if (timer <= 0) {
        endGame();
      }
    }
    
    function generateWord() {
      if (powerUpActive) return;
    
      if (wordDisplay.textContent) {
        wordDisplay.classList.add("swept-away");
        setTimeout(() => {
          wordDisplay.classList.remove("swept-away");
        }, 1500); 
      }
    
      currentWord = words[Math.floor(Math.random() * words.length)];
      wordDisplay.textContent = getWordWithBlanks(currentWord);
    }
    
    function spawnPowerUpWord() {
      powerUpActive = true;
      currentWord = powerUpWords[Math.floor(Math.random() * powerUpWords.length)];
      wordDisplay.innerHTML = `<span class="power-up">${currentWord}</span>`;
      wordDisplay.classList.add("power-up-glow");
      
      setTimeout(() => {
        if (powerUpActive) {
          
          const tornado = document.createElement("div");
          tornado.className = "tornado";
          document.body.appendChild(tornado);

          wordDisplay.classList.add("swept-away");
          setTimeout(() => {
            tornado.remove();
            wordDisplay.textContent = "";
            generateWord(); 
          }, 2000); 
        }
      }, 5000); 
      
    }
    function checkInput() {
      if (userInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        if (powerUpActive) {
          score += 10; 
          showConfetti();
          powerUpActive = false;
          wordDisplay.classList.remove("power-up-glow");
        } 
        else {
          score += 5;
        }
        scoreDisplay.textContent = `Score: ${score}`;
        userInput.value = "";
        generateWord();
      }
    }

    function endGame() {
      clearInterval(interval);
      clearInterval(powerUpInterval);
      
      const tornado = document.createElement("div");
      tornado.className = "tornado";
      document.body.appendChild(tornado);

      wordDisplay.classList.add("swept-away");
      setTimeout(() => {
        tornado.remove();
        wordDisplay.textContent = ""; 
        gameScreen.style.display = "none";
        endScreen.style.display = "block";
        finalScore.textContent = `Your final score: ${score}`;
      }, 2000); 
    }
    

    function showConfetti() {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1000);
    }
    
    startButton.addEventListener("click", startGame);
    newGameButton.addEventListener("click", () => location.reload());
    userInput.addEventListener("input", checkInput);
  }
}

new App();
