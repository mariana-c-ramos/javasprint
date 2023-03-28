// PROJECT #1 SNAKE GAME
const board = document.querySelector('.play-board');
const scoreDisplay = document.querySelector('.score');
const scoreHighestDisplay = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');



let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
scoreHighestDisplay.innerText = `Highest Score: ${highScore}`;

const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30) +1;
    foodY = Math.floor(Math.random() * 30) +1;
}

const handleGameOver = () =>{
    clearInterval(setIntervalId)
    alert("GAME OVER! Press OK to replay...");
    location.reload();
}

const startGame = () =>{
    if(gameOver) return handleGameOver();
    let htmlMarkeup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(foodX === snakeX && foodY === snakeY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY])
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreDisplay.innerText = `Score: ${score}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // Will shift forward the elements of the snake body
        snakeBody[i] = snakeBody[i - 1]  
    }
    snakeBody[0] = [snakeX, snakeY]; // updates the first element of snake body to the current snake position

    //Update the snake's head position
    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Adds a div each time we eat the food
        htmlMarkeup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    board.innerHTML = htmlMarkeup;
}

const changeDiretion = (e) =>{
    if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    } else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    // calling changeDirection on each key click
    key.addEventListener("click", () => changeDiretion({ key: key.dataset.key}))
})

changeFoodPosition();
setIntervalId = setInterval(startGame, 125); //125 makes it look like the movement is more "dragged"
document.addEventListener("keydown", changeDiretion);