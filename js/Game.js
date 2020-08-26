/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }
    
    /**
     * start the game and init
     */

    startGame() {

        //hide the overlay
        startScreen.style.display = "none";

        //create an instance of the phrase
        game.activePhrase = new Phrase(game.getRandomPhrase());

        //add the phrase to the display
        game.activePhrase.addPhraseToDisplay();
    }

    /**
     * create the phrases for the game 
     */
    
    createPhrases() {

        const phrases = [ 
            "YOU SHALL NOT PASS", 
            "and he lived happily ever after",
            "May the Force be with you",
            "What about second breakfast"
        ];

        //turn each item in the array into a new instance of Phrase
        return phrases.map(phrase => new Phrase(phrase));
    }

    /**
     * get a random phrase 
     */

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)].phrase;
    }

    /**
     * the interaction of the button selected
     * @param {html} - the button selected
     */

    handleInteraction(event) {
        let buttonSelected = event;

        //disable the button
        buttonSelected.disabled = true;

        //remove the cursor pointer 
        buttonSelected.style.cursor = "initial";

        //check if the letter is in the phrase
        game.activePhrase.checkLetter(buttonSelected);
    }

    /**
     * remove a heart in the meter and update the miss count 
     */

    removeLife() {

        //find the next live heart and turn it into a lost heart
        for (let i = 0; i < hearts.length; i++) {
            if (hearts[i].src.endsWith("liveHeart.png")) {
                hearts[i].src = "images/lostHeart.png";
                break;
            }
        }

        //up the miss count
        this.missed++;

        //if all of the active hearts are gone, game is lost
        if (this.missed === hearts.length) {
            this.gameOver("lose");
        }
    }

    /**
     * check if the player has won the game
     */

    checkForWin() {

        //all of the letter elements in the phrase
        const phraseLI = document.querySelectorAll("#phrase ul li");

        //current guessed string
        let currentString = "";

        //convert node list into an array
        [...phraseLI].forEach(letter => {

            //if letter was found, add it to the current guessed string
            if (letter.classList.contains('show')) {
                currentString += letter.innerHTML;
            }
            else {
                //if it is a space or if it has not been guessed, add a space
                currentString += " ";
            }
        });

        //if current guessed string matches the active phrase, player wins
        if (currentString === this.activePhrase.phrase) {
            this.gameOver("win");
        }
    }

    /**
     * game over experience based on game status
     * @param {string} gameStatus - win or lose string
     */

    gameOver(gameStatus) {
        //put back the overlay 
        startScreen.style.display = "flex";

        //update overlay color based on game status
        startScreen.className = gameStatus;

        //set the game over message based on game status
        const gameOverMessage = document.getElementById("game-over-message");
        gameOverMessage.innerText = gameStatus === "win" ? "Great job, you win!" : "Better luck next time!";

        //reset the board
        this.resetGame();
    }

    /**
     * reset the game so player can play again
     */

    resetGame() {
        const phraseLI = document.querySelectorAll("#phrase ul li");

        //remove all of the li elements
        [...phraseLI].forEach(letter => {
            letter.remove();
        });

        //remove all of the interaction classes and enable the button
        qwertyButtons.forEach(button => {
            button.className = "key";
            button.style.cursor = "pointer";
            button.disabled = false;
        });

        //reset the heart meter
        for (let i = 0; i < hearts.length; i++) {
            hearts[i].src = "images/liveHeart.png";
        }

        //reset the miss count
        this.missed = 0;
    }
 }