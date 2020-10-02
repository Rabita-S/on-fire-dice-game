// Create variables for the game state
let initialScore1 = 0;
let initialScore2 = 0;
let player1Score = initialScore1;
let player2Score = initialScore2;
let startingPlayerToggle = true; //ALLOWS STARTING TURN TO CHANGE FROM PLAYER TO PLAYER EACH GAME
let player1Turn = startingPlayerToggle;
let player1OnFire = false
let player2OnFire = false

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const player1name = document.getElementById("player1name")
const player2name = document.getElementById("player2name")
const player1fire = document.getElementById("fire1")
const player2fire = document.getElementById("fire2")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}



/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    // **********************************************PLAYER ON FIRE**************************
        if(player1Score > 22 && player1OnFire === false) {
        player1fire.style.display = "inline-block"
        player1name.classList.add("fire")
        player1OnFire = true;
        initialScore1 = 3;
        
    } else if (player2Score > 22 && player2OnFire === false){
        player2fire.style.display = "inline-block"
        player2name.classList.add("fire")
        player2OnFire = true;
        initialScore2 = 3;
    }
    
    // *********************************PLAYER WINNING AND LOSING FIRE*************************
    if (player1Score >= 20) {
        message.textContent = "Player 1 Won 🥳"
        showResetButton()
        if(player2OnFire){
            initialScore2 = 0;
            player2name.classList.remove("fire")
            player2fire.style.display = "none"
            player2OnFire = false;
        }
    }  else if (player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉"
        showResetButton()
        if(player1OnFire){
            initialScore1 = 0;
            player1name.classList.remove("fire")
            player1fire.style.display = "none"
            player1OnFire = false;
        }
    }
    player1Turn = !player1Turn
})
 
resetBtn.addEventListener("click", function(){
    reset()
})

function playerTurn(){
        if(player1Turn){
            message.textContent = "Player 1 Turn"
        }else {
            message.textContent = "Player 2 Turn"
        }
}

function reset() {
    player1Score = initialScore1;
    player2Score = initialScore2;
    startingPlayerToggle = !startingPlayerToggle;
    player1Turn = startingPlayerToggle;
    playerTurn()
    player1Scoreboard.textContent = player1Score
    player2Scoreboard.textContent = player2Score
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"    
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
}


