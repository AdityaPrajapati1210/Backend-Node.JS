let gameArr = [];
let userArr = [];

let gamestart = false;
let h3 = document.querySelector("h3");
let color = ["yellow" ,"blue","red","green"];

let level = 0;
// start the game by pressing any key
document.addEventListener("keypress" , ()=>{
    if(gamestart == false){
        console.log("Game is started");
        gamestart = true;
        levelup();
    }
})

function gameflash(btn){
    btn.classList.add("white");
    setTimeout(function(){
        btn.classList.remove("white")
    },300);
}
function userflash(btn){
    btn.classList.add("white");
    setTimeout(function(){
        btn.classList.remove("white")
    },300);
}

// btn press by user
function levelup(){
    level++;
    h3.innerText = `Level ${level}`;

    let ranidx = Math.floor(Math.random()*4);
    let ranclr = color[ranidx];
    let btn = document.querySelector(`.${ranclr}`);
    gameflash(btn);
    gameArr.push(ranclr);
    userArr = [];
};

function checkClick(idx){
   if(gameArr[idx] === userArr[idx]){
        console.log("same value");
        if(userArr.length == gameArr.length){
            setTimeout(levelup, 1000);
            
        }
   }else{
        h3.innerText = `game over! You reach level ${level}.... Press any key to start the game. `;
        level = 0;
        userArr = [];
        gameArr = [];
        gamestart = false;
   }
}

function btnpress(){
    let btn = this;
    userflash(btn);

    console.log(btn);
    let color = btn.getAttribute("id");
    userArr.push(color);

    checkClick(userArr.length-1);

}

// select all buttons
let btns = document.querySelectorAll(".btn");
for(let btn of btns){
    btn.addEventListener("click",btnpress);
}

