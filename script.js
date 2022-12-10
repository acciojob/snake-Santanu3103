// to draw board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context; 

//to draw snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let snakeBody = [];

// to set direction
let directionX = 0;
let directionY = 0;


//to draw food
let foodX;
let foodY;

let gameOver = false;

window.onload = function() {
    board = document.getElementById("gameContainer");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

   
    document.addEventListener("keyup", (e)=>{
        if (e.code == "ArrowUp" && directionY != 1) {
            directionX = 0;
            directionY = -1;
        }
        else if (e.code == "ArrowDown" && directionY != -1) {
            directionX = 0;
            directionY = 1;
        }
        else if (e.code == "ArrowLeft" && directionX != 1) {
            directionX = -1;
            directionY = 0;
        }
        else if (e.code == "ArrowRight" && directionX != -1) {
            directionX = 1;
            directionY = 0;
        }
    });

    foodLocation();
    setInterval(display, 290);
}

function display() {
    if (gameOver === true) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

     if (foodX==snakeX && foodY==snakeY) {
        snakeBody.push([foodX,foodY]);
        foodLocation();
     }
     
     // to move body with body
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

     if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX = snakeX + directionX*blockSize;
    snakeY = snakeY + directionY*blockSize;

    for (let i = 0; i < snakeBody.length; i++){
     context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    context.fillRect(snakeX, snakeY, blockSize, blockSize);


    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

}



function  foodLocation() {
    
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
