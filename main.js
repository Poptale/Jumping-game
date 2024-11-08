//cursor code starts here
const dot = document.querySelector("[data-cursor-dot]");
const outline = document.querySelector("[data-cursor-outline]");
window.addEventListener("mousemove", (e)=> {
    const posX = e.clientX;
    const posY = e.clientY;
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;
    outline.animate({
        top: `${posY}px`,
        left:  `${posX}px`
    }, {duration: 200, fill: "forwards"});
});

//game code starts from here
const character = document.querySelector(".character");
const block = document.querySelector(".block");
const container = document.querySelector(".container");
const tryAgain = document.querySelector(".tryAgain");
const gameOver = new Audio("gameover.mp4");
const jumpsound = new Audio("jumpsound2.mp4");
let scoredashboard = document.querySelector(".scoredashboard");

let score = 0;

function jump() {
    if(character.classList != "animate"){
        character.classList.add("animate");
        jumpsound.currentTime = 0;
        jumpsound.play();
    };
    setTimeout(function () {
        character.classList.remove("animate");
    }, 500);
};

document.addEventListener("keydown", (e) => {
    if(e.keyCode === 38) {
        score++;
        scoredashboard.innerText = score;
        jump();
    };
});

let check = setInterval(() => {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft < 250 && blockLeft > 200 && characterTop >= 441){
       character.style.display = "none";
       block.style.display = "none";
       block.style.animation = "none";
       tryAgain.style.display = "flex";
       document.querySelector("p").style.display = "flex";
       gameOver.play();
       score = 0;
       clearInterval(check);
    };
}, 10);