window.onload = playGame;
let randValue; // set the random value as a global flag variable
function playGame() {
   console.log("game loaded");
   randValue = Math.floor(Math.random() * 100); //generates random value on start
   //getting all the dom elements that are needed for the game as variables local to playGame()
   const form = document.forms[0];
   const game = document.querySelector(".game");
   const result = document.querySelector(".result");
   const status = document.querySelector(".status");
   const trials = document.querySelector(".trials");
   const restart = document.querySelector(".restart");
   const bar = document.querySelector(".bar");
   let error = document.querySelector(".error");
   // setting flag variables
   let statusText;
   let statusColor;
   let numberOfTrial = 0; //initial number of trials
   trials.textContent = numberOfTrial;
   let lastGuessDifference = 0; //initial guess difference
   form.guess.addEventListener("click", (e) => {
      error.textContent = ""; //reset validation error message on click
   });
   form.guess.addEventListener("keypress", (e) => {
      error.textContent = ""; //reset validation error message on keypress
   });
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (status.textContent.includes("game won")) {
         return; //stop the game if the player already won
      }
      if (formValidated()) {
         //proceed if the input is valid
         const guess = form.guess.value.trim();
         const differece = Math.abs(guess - randValue); //absolute diff b/w user guess $ randValue
         bar.style.height = `${Math.abs(differece - 100)}%`; //set progress bar height
         if (guess == randValue) {
            statusText = `game won in ${numberOfTrial + 1} trials`;
            status.style.background = "white";
            statusColor = "purple";
            game.style.background = statusColor;
            game.style.color = "white";
         } else {
            if (lastGuessDifference < differece) {
               statusText = "colder";
               statusColor = "cyan";
            } else if (lastGuessDifference > differece) {
               statusText = "hotter";
               statusColor = "red";
            } else if (lastGuessDifference == differece) {
               statusText = "neither colder nor hoter";
               statusColor = "black";
            }
         }
         status.textContent = statusText; //set status text based on user's play
         status.style.color = statusColor; //set status text color accordingly
         bar.style.background = statusColor; //set progress bar color accordingly
         result.classList.add("flash"); //flash the results for visuals
         setInterval(() => {
            result.classList.remove("flash");
         }, 300); //remove flash class after 300 miliseconds
         console.log(guess, randValue, differece); // CHEAT......
         lastGuessDifference = differece; //set the difference to be used for calculation
         numberOfTrial++; //increase number of trials after a triall
         trials.textContent = numberOfTrial; //set number of trials on the screen
      } else {
         formValidated(); //if input is not valid display validation error
         return; // and quit
      }
   });
   //function to restart the game
   restart.addEventListener("click", () => {
      randValue = Math.floor(Math.random() * 100); //generate a new random value
      form.reset(); //reset the input
      status.textContent = ""; //reset status text
      error.textContent = ""; //reset validation error test
      numberOfTrial = 0; //reset number of trials
      trials.textContent = numberOfTrial;
      lastGuessDifference = 0; // reset number last guess difference
      bar.style.background = "";
      bar.style.height = ""; // and reset progress bar
      game.style.background = "";
      game.style.color = "";
   });

   //function to validate the form
   function formValidated() {
      const value = form.guess.value.trim();
      let errorText;
      const errDisp = () => (error.textContent = errorText); //method to set err text in each case
      if (value.length < 1 || value == "") {
         errorText = "the input is empty 👆";
         errDisp();
         return false;
      } else if (value < 0 || value > 100 || value.length > 3) {
         errorText = "a number between 0 and 100 is required 👆";
         errDisp();
         return false;
      } else if (isNaN(value)) {
         errorText = "a number is required 👆";
         errDisp();
         return false;
      } else {
         return true;
      }
   }
}
//thanks! writting this code was fun and iteresting for me 🥂
