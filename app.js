
const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
const startButton = document.getElementById("start-button");
const gameBoard = document.querySelector("#game");
let jumping = 0;
let counter = 0;

// making the animation run a different hole placement every animation 

const buildWalls = () => setTimeout(
    hole.addEventListener('animationiteration', () => {
        const random = Math.random() * 3;
        const top = (random * 100) + 150;
        hole.style.top = -(top) + "px";
        counter++;
    }), 10000);

// creating "gravity" so that character will fall if not being "clicked/jumping"
const setGravity = () => setInterval(function () {
    const characterTop =
        parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (jumping == 0) {
        character.style.top = (characterTop + 3) + "px";
    }

    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    // var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    const cTop = -(500 - characterTop);

    // if character hits a block then its game over but if you hit a block and a hole is there then your good 
    // if you hit the bottom then its game over 

    if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
        alert("Game Over. Score: " + counter);
        character.style.top = 100 + "px";
        counter = 0;
    }
}, 10);

// making the jumping function, allowing gravity to stop if the character is jumping
function jump() {
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
        var characterTop =
            parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        //making sure the character cant jump all the above the blocks 
        if ((characterTop > 6) && (jumpCount < 15)) {
            character.style.top = (characterTop - 5) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}

startButton.addEventListener('click', () => {
    gameBoard.style.display = "block";
    buildWalls()
    setGravity()
})

