const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
const pressStart = document.getElementById("pressStart")
const gameOver = document.getElementById("gameOver")
const up = document.getElementById("up")
const right = document.getElementById("right")
const down = document.getElementById("down")
const left = document.getElementById("left")
let squares = []
let currentSnake = [2,1,0] // array elements in reverse so I can refer to index 0 as snake head
let direction = 1
const width = 20
let appleIndex = 0
let score = 0
let intervalTime = 100
let speed = 0.9
let timerId = 0

function createGrid() {
    for (let i=0; i < width*width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    gameOver.style.display = "none"
    pressStart.style.display = "none"
    currentSnake = [2,1,0]
    score = 0
    //re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 250
    generateApple()
    //re add the class of snake to new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake hits bottom
        (currentSnake[0] % width === width-1 && direction === 1) || // if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || // if snake hits top
        squares[currentSnake[0] + direction].classList.contains('snake') // if snake collapses into itself
    ) return endGame()

    //remove last element from currentSnake array
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    //add square in direction it is moving
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')

    //when snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow snake array
        currentSnake.push(tail)
        //generate new apple
        generateApple()
        //add to score
        score++
        scoreDisplay.textContent = score
        //speed up snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 

function control(e) {
    switch (e.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
            direction = +width
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            direction = -width
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            direction = -1
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            direction = 1
            break;
    }
}

function endGame() {
    clearInterval(timerId)
    gameOver.style.display = "block"
}

// mobile controls
function mobileUp() {
    direction = -width
}
function mobileRight() {
    direction = 1
}
function mobileDown() {
    direction = +width
}
function mobileLeft() {
    direction = -1
}

createGrid()
scoreDisplay.textContent = score
document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)
up.addEventListener('click', mobileUp)
right.addEventListener('click', mobileRight)
down.addEventListener('click', mobileDown)
left.addEventListener('click', mobileLeft)

