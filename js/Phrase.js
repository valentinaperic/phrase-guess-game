/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * adds letter placeholders to the board
     */

    addPhraseToDisplay() {

        //unordered list of the phrase
        const phraseUL = document.getElementById("phrase").firstElementChild;

        const randomPhrase = this.phrase;
        
        for (let char of randomPhrase) {

            //one li element for each letter or space 
            let phraseLI = document.createElement('li'); 
            phraseLI.innerText = char;

            //check if it is a space
            if (char === " ") {
                phraseLI.classList = `space`;
            }
            else {
                phraseLI.classList = `hide letter ${char}`;
            }

            //attach to the li
            phraseUL.appendChild(phraseLI);  
        }
    }

    /**
     * check if letter guessed is in the phrase
     * @param {html} currentLetter - button element
     */

    checkLetter(currentLetter) {

        //check if letter is in the phrase
        if(this.phrase.includes(currentLetter.innerText)) {
            currentLetter.classList.add("chosen");
            this.displayLetter(currentLetter.innerText);
            game.checkForWin();
        }
        else {
            currentLetter.classList.add("wrong");
            game.removeLife();
        }
    }

    /**
     * display the letter in the correct phrase position(s)
     * @param {string} currentLetter - current letter guessed correctly
     */

    displayLetter(currentLetter) {
        const lettersList = document.querySelectorAll(".letter"); 

        //go through the phrase and display the letter guessed correctly
        for (let letter of lettersList) {
            if (letter.innerText === currentLetter) {
                letter.classList.remove("hide");
                letter.classList.add("show");
            }
        }
    }
}