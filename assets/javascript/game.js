var sushiDictionary = ["dragon", "california", "rainbow", "spider", "philadelphia", "futomaki", "tiger", "dynamite", "caterpillar", "vegetable"];

var win = 0; 
var lose = 0;
var sushiChoice; //automatically changes after new play
var sushiLength; //automatically changes after new play
var guessRemain; //automatically changes after new play
var pattern = []; //needs a reset
var letterGuessed = []; //needs a reset
var charLoc = []; //needs a reset
var correctGuess = 0; //needs a reset
var winT = document.getElementById("winText");
var patternT = document.getElementById("patternText");
var guessNumT = document.getElementById("guessNumText");
var lettersT = document.getElementById("lettersText");
//winText, patternText, guessNumText, lettersText
play();
//create a function method to start from scratch and encapsulate 
//if playing again reset sushi choice, length, and underscores, remove word from dictionary 

function play(){
  sushiChoice = sushiDictionary[Math.floor(Math.random() * sushiDictionary.length)];
  
  sushiLength = sushiChoice.length;
  guessRemain = (sushiLength);

  //recursive underscores and stores them in an array
  underScores(sushiLength);
  
}
function underScores(x){
  if (x === 0) {
    return;
  }
  underScores(--x) + pattern.push("_");
}
//meat of the game #Guesses (sushiLength + 3), #guessesremaining, lettersGuessed, win/lose 

document.onkeyup = function(event){

  var guesses = event.key;
  gameStats();

  if (letterGuessed.indexOf(guesses) === -1){
    letterGuessed.push(guesses);

    //check function
    check(guesses);
    //replace _ with guess resets charLoc array to empty
    replace(guesses);
    // console.log("char loc " + charLoc);
    checkStatus();

  } else {
    console.log("you already used that letter " + guesses);

  }
  gameStats();

}

function check(letter){

  for(var i = 0; i < sushiLength; i++){
    if (letter === sushiChoice.charAt(i)) {
      charLoc.push(i);
      correctGuess++;
    }
  }

  if(charLoc.length === 0){
    guessRemain--;

  }
  
}

function replace(letter){

  for(var j = 0; j < charLoc.length; j++){
    pattern[charLoc[j]] = letter;
  } 
  charLoc.length = 0;

}

function checkStatus(){
  if (correctGuess === sushiLength) {
    //gameOver and resets arrays
    gameOver(1);

  } else if (guessRemain === 0) {
    //gameOver and resets arrays

    gameOver(-1);
  }
}

function gameOver(x){

  if(x === 1){
    console.log("you win!");
    win++;

  } else if (x === -1){
    console.log("you lose!");
    lose++;
  }
  reset();

}

function reset(){
  pattern.length = 0;
  guessRemain = 0;
  letterGuessed.length = 0;
  correctGuess = 0;
  play();
}

function gameStats(){
  winT.textContent = win;
  patternT.textContent = pattern;
  guessNumT.textContent = guessRemain;
  lettersT.textContent = letterGuessed;
}