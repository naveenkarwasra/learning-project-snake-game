let start = document.querySelector("#start")
let grid = document.querySelector(".grid")
let scoreDisplay = document.getElementById("score")
let squeres = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 30
let appleIndex = 0
let score = 0
let intervalTime = 800
let speed = 0.9
let timerId = 0



function creatGrid() {
    for (i = 0; i < width * width; i++) {
        let gridSqueres = document.createElement("div")
        gridSqueres.classList.add("squeres")
        grid.appendChild(gridSqueres)
        squeres.push(gridSqueres)
    }
}
creatGrid()
currentSnake.forEach(index => squeres[index].classList.add("snake"))


function startGame() {
    currentSnake.forEach(index => squeres[index].classList.remove("snake"))    
    squeres[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    direction = 1
    score = 0
    scoreDisplay.textContent = score
    intervalTime = 800
    createApple()
    currentSnake.forEach(index => squeres[index].classList.add("snake"))    
    timerId = setInterval(move, intervalTime)
}
function move() {
    if ((currentSnake[0] + width >= width * width && direction === 10) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        squeres[currentSnake[0] + direction].classList.contains("snake"))
        return clearInterval(timerId)

    let tail = currentSnake.pop()
    squeres[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)

    if (squeres[currentSnake[0]].classList.contains("apple")) {
        squeres[currentSnake[0]].classList.remove("apple")
        squeres[tail].classList.add("snake")
        currentSnake.push(tail)
        createApple()
        score = Math.floor((score + 1)*1.5)
        scoreDisplay.textContent = score
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }

    squeres[currentSnake[0]].classList.add("snake")
}




function createApple() {
    do {
        appleIndex = Math.floor(Math.random() * squeres.length)
    } while (squeres[appleIndex].classList.contains("snake"))
    squeres[appleIndex].classList.add("apple")
}
createApple()
function control(e) {
    if (e.keyCode === 37) {

        direction = -1
    }
    else if (e.keyCode === 38) {

        direction = -width
    }
    else if (e.keyCode === 39) {

        direction = 1
    }
    else if (e.keyCode === 40) {

        direction = +width
    }
}
document.addEventListener("keydown", control)
start.addEventListener("click", startGame)

const helpBtn = document.getElementById("help")
const helpMsg = document.getElementById("help-box")
const helpInputBtn = document.getElementById("help-box-ok-btn")
helpBtn.addEventListener("click", () => {
    helpMsg.style.display = "block"
})
helpInputBtn.addEventListener("click", () => {
    helpMsg.style.display = "none"
})