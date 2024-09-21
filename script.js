let boxes=document.querySelectorAll('.box')
let resettBtn=document.querySelector('#reset')
let newBtn=document.querySelector('#new')
let msgContainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg")
let btnCount=0

// player X,player O
let turnO=true // turn of O

const winPatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box clicked")
        if(turnO==true){
            box.innerText='O'
            turnO=false
        }
        else{
            box.innerText='X'
            turnO=true
        }
        box.disabled=true   // if button clicked can't change again so button is disabled
        btnCount++
        if(btnCount==9){ //draw condition
            drawnMatch()
        }

        checkWinner()
    })
})

const checkWinner=()=>{
    for(let patterns of winPatterns){
        // boxes=array of all boxes
        // patterns=array of indices of box
        let pos1Value=boxes[patterns[0]].innerText
        let pos2Value=boxes[patterns[1]].innerText
        let pos3Value=boxes[patterns[2]].innerText

        if(pos1Value!="" && pos2Value!="" && pos3Value!=""){
            if(pos1Value === pos2Value && pos2Value === pos3Value){
                console.log("winner")
                disableBoxes()
                showWinner(pos1Value)
            }
        }
    }
}

const drawnMatch=()=>{
    msg.innerText="Match Drawn, play again"
    msgContainer.classList.remove("hide")
    btnCount=0
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false
        box.innerText=""
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is player ${winner}`
    msgContainer.classList.remove("hide")

}

const resetGame=()=>{
    turnO=true;
    enableBoxes()
    msgContainer.classList.add("hide")
    btnCount=0
}


newBtn.addEventListener("click",resetGame)
resettBtn.addEventListener("click",resetGame)