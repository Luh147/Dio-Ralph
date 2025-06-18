 window.onload = function() {
 const bgMusic = document.getElementById("bgMusic");

 bgMusic.volume = 0.1;
  
bgMusic.play().catch(e => {
console.log("Autoplay bloqueado. A música só tocará após interação do usuário.");
 });
  
 document.body.addEventListener("click", () => {
bgMusic.play();
});
};


const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null, 
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 65,
    },
};


function countDown(){
    state.values.curretTime--;
     state.view.timeleft.textContent = state.values.curretTime; 

    if (state.values.curretTime <= 0){
        alert("Game Over Meu Amigo! O Seu Resultado foi: " + state.values.result);
    }
}


function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
       if(square.id === state.values.hitPosition){
        state.values.result++
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
       }   
        });
    });
}

function initialize() {
    moveEnemy();
    randomSquare();
    addListenerHitBox();
}

initialize();