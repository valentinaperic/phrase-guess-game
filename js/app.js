/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();

//start game button
const resetButton = document.getElementById("btn__reset");

//keyboard buttons
const qwertyButtons = document.querySelectorAll(".key");

//start screen overlay
const startScreen = document.getElementById("overlay");

//convert nodeList to array and reverse it (so hearts can disapear at the right side)
const hearts = [...document.querySelectorAll(".tries img")].reverse();

//start the game
resetButton.addEventListener("click", game.startGame);

//click event listener for each of the buttons on keyboard
qwertyButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        game.handleInteraction(e.target);
    });
});
