const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startButton = document.querySelector('.btn__reset');
const ul = document.querySelector("ul");
const overlay = document.getElementById("overlay");


let missed = 0;


//phrases
const phrases = [
 "may the force be with you",
 "say hello to my little friend",
 "read them and weep",
 "i would like to see the baby",
 "you talking to me"
];


// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    let phrase = getRandomPhraseAsArray(phrases)
    addPhraseToDisplay(phrase);
});

// return a random phrase from an array
const getRandomPhraseAsArray = (arr)  => {
    const randomPhrase = Math.floor( Math.random() * arr.length );
      return arr[randomPhrase].split("");  
  } 



// adds the letters of a string to the display
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.textContent = arr[i];
        ul.append(li);
        if (li.textContent !== " " ) {
          li.className = "letter";
        } else {
          li.className = "space";
        }
      }
    }

// check if a letter is in the phrase 
const checkLetter = button => {
  const Letter = ul.children;
  let match = null;
  for (let i = 0; i < Letter.length; i++) {
   if (button.textContent === Letter[i].textContent) {
    Letter[i].classList.add('show');
    match = Letter[i].textContent;

   }

 }
return match;  
}

// listen for the onscreen keyboard to be clicked  
qwerty.addEventListener('click', (e) => {
  const button = e.target;
  const imgs =document.querySelectorAll('img');
  let letterFound;
  if (e.target.tagName === "BUTTON") {
     e.target.className = 'chosen';
     e.target.disabled = true;
     letterFound = checkLetter(button);
     if (letterFound === null) {
         button.style.backgroundColor = "orchid";
         imgs[missed].src = "images/lostHeart.png";
         missed++;
     }
  }
    checkWin();

}); 

// check if the game has been won or lost
 const checkWin = ()  => {
   let correctLetter = document.getElementsByClassName('letter');
   let showLetter = document.getElementsByClassName('show');
   

   if (correctLetter.length === showLetter.length) {
     overlay.className = ('win');
     overlay.firstElementChild.textContent = "You're a Winner!";
     overlay.style.display = 'flex';
     phrase.style.display = 'none';
     startButton.textContent = "Play Again?";
     restart();
    } else if (missed >=5) {
       overlay.className = ('lose');
       overlay.firstElementChild.textContent = "Oh No, You lost.";
       overlay.style.display = 'flex';
       phrase.style.display = 'none';
       startButton.textContent = "Play Again?";
       restart();
   }    
}

// Restart the game
 const restart = () => {
     startButton.addEventListener('click', () => {
     location.reload();
    });
}








