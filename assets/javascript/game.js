var sushiDictionary = ["dragon", "california", "rainbow", "spider", "philadelphia", "futomaki", "tiger", "dynamite", "caterpillar", "vegetable", "avocado", "crunch", "tempura", "volcano", "tamago", "cucumber", "alaskan", "asparagus", "boston", "atlanta", "carrot", "crazy", "crystal", "fantasy"];

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
var loseT = document.getElementById("loseText");
var patternT = document.getElementById("patternText");
var guessNumT = document.getElementById("guessNumText");
var lettersT = document.getElementById("lettersText");
var wordT = document.getElementById("wordChoice");
var imgT = document.getElementById("pics");

playG();


document.onkeyup = function(event){
  //only accepts lower case a - z 
  if(event.keyCode >= 65 && event.keyCode <= 90){
    //forces guesses to be lower case
    var guesses = event.key.toLowerCase();    
    //on start up refreshes the website with the stats
    gameStats();
    
    //checks to see if the guessed letter is in an array called guesses if not then add to array
    if (letterGuessed.indexOf(guesses) === -1){
      letterGuessed.push(guesses);
      //checkHM(guesses); evil hangman; work in progress
      check(guesses);
      replace(guesses);
      checkStatus();
      
    } else {
      wordT.textContent = "You already selected  " + guesses;
      
    }
    gameStats();
  } else {
    wordT.textContent = "You selected an invalid option " + event.key;
  }
}

function playG(){
  sushiChoice = sushiDictionary[Math.floor(Math.random() * sushiDictionary.length)];
  
  sushiLength = sushiChoice.length;
  guessRemain = (sushiLength);
  
  underScores(sushiLength);  
}
//creates the pattern of under scores and stores it in an array
function underScores(x){
  if (x === 0) {
    return;
  }
  underScores(--x) + pattern.push("_");
}
//checks to see if the letter is part of the word
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

//replace the "_" with the correctly guessed letter
function replace(letter){
  for(var j = 0; j < charLoc.length; j++){
    pattern[charLoc[j]] = letter;
  } 
  charLoc.length = 0;
}

//checks the status of the current game to see if it's a game over or not
function checkStatus(){
  if (correctGuess === sushiLength) {
    gameOver(1);

  } else if (guessRemain === 0) {
    gameOver(-1);
  }
}

//increments the win/lose and display the attempted word on screen.
function gameOver(x){
  if(x === 1){
    win++;
    wordT.textContent = "You Win!";
    imgT.setAttribute("src", "http://www.randomkittengenerator.com/cats/rotator.php");
  } else if (x === -1){
    lose++;
    wordT.textContent = "You Lose!";
    imgT.setAttribute("src", "http://www.hereinreality.com/funny_pictures/randim.php");
    if(lose === 3){
      
      alert("Just quit... go and do something productive.");
    }
  }
  setTimeout(function(){
    wordT.textContent = sushiChoice + " roll";
  }, 1000);
  
  setTimeout(function(){
    reset();
  }, 2000);
}

//resets the variables to start the next game
function reset(){
  pattern.length = 0;
  guessRemain = 0;
  letterGuessed.length = 0;
  correctGuess = 0;
  wordT.textContent = "Play!";
  imgT.removeAttribute("src");
  gameStats();
  playG();
}

//grabs the game stats to show it on website
function gameStats(){
  winT.textContent = win;
  loseT.textContent = lose;
  patternT.textContent = pattern.join(" ");
  guessNumT.textContent = guessRemain;
  lettersT.textContent = letterGuessed.join(", ");
}


// //===============================================================
// //messing around now, for future features aka Evil Hangman

// //stores the words of the given length
// var varyWords = [];
// //stores the user input for how long the word is
// var wordLength = prompt("What length word do you want to use?");

// //loops through the entire dictionary to find the same lenght and if there isn't one it will reprompt for a new lenght
// sushiDictionary.forEach(function(comChoice){
//   if (parseInt(wordLength) === comChoice.length){
//     varyWords.push(comChoice);
//   }

// });

// if (varyWords.length === 0){
//   wordLength = prompt("We could not find a word length at that size, try again.");
// }

// function playHM() {
//   // sushiChoice = sushiDictionary[Math.floor(Math.random() * sushiDictionary.length)];

//   // sushiLength = sushiChoice.length;
//   guessRemain = (wordLength);

//   underScores(wordLength);
// }

// //check the entire array if that letter is in the word. if it is remove that word from the array. if there is only one word in the array do nothing
// function checkHM(letter) {
//   var varyCounter = varyWords.length;
//   if (varyWords.length !== 1){
//     // console.log(varyWords + " hm check");
//     for (var i = varyWords.length - 1; i >= 0 ; i--){
//       // console.log(varyWords + " inside for loop" + varyWords.length);
//       if ((varyWords[i].indexOf(letter) > -1) && varyWords.length > 1){
//         varyWords.splice(i, 1);
//       }
//     }
//     if(varyCounter > varyWords.length){
//       guessRemain--;
//     }

//   } else {
//     check(letter);
//   }
// }
