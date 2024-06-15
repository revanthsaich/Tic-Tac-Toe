let boxes = document.querySelectorAll(".box");
let reset = document.getElementById("reset");
let result =document.getElementById("result");
let turn = "X";
let gameOver = false;
const xIndicator = document.querySelector(".X");
const oIndicator = document.querySelector(".O");

function highlightTurn() {
    if (turn === "X") {
        xIndicator.style.backgroundColor = "#dc143c";
        xIndicator.style.color="#fffcfd";
        oIndicator.style.backgroundColor = "#fffcfd";
        oIndicator.style.color="#000000";
    } else {
        xIndicator.style.backgroundColor = "#fffcfd";
        xIndicator.style.color="#000000";
        oIndicator.style.backgroundColor = "#dc143c";
        oIndicator.style.color="#fffcfd";
    }
}


boxes.forEach(e =>{
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        if(!gameOver && e.innerHTML === ""){
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    })
})
function changeTurn(){
    if(turn === "X"){
        turn = "O";
    }
    else{
        turn = "X";
    }
    highlightTurn();

}

function checkWin(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 != "" && v0 === v1 && v0 === v2){
            gameOver = true;
            result.innerHTML=turn+" Wins";
            reset.style.display="flex";
        for(j = 0; j<3; j++){
            boxes[winConditions[i][j]].style.backgroundColor = "#808080"
        }
    }
    }
}

function checkDraw(){
    if(!gameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        if(isDraw){
            gameOver = true;
            result.innerHTML = "Draw";
            reset.style.display = "flex"
        }
    }
}
reset.addEventListener("click",()=>{
    gameOver=false;
    turn="X";
    result.innerHTML="";

    boxes.forEach(e=>{
        e.innerHTML="";
        e.style.removeProperty("background-color");
    }
    )
    highlightTurn();
    reset.style.display="none";
})
