const boxes = document.querySelectorAll(".box");
const finalStatus = document.querySelector(".status");
const btnRestart = document.querySelector("#restart");

let x = "<img src='../images/2.png'>";
let o = "<img src='../images/1.png'>";

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;

init();
function init() {
  boxes.forEach((box) => {
    box.addEventListener("click", boxClick);
    btnRestart.addEventListener("click", restartGame);
    finalStatus.textContent = `${player} Your Turn`;
    running = true;
  });
}

function boxClick() {
  let index = this.dataset.index;
  if (options[index] != "" || !running) {
    return;
  }

  updateBox(this, index);
  checkWinner();
}

function updateBox(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}

function changePlayer() {
    player=(player=='X')? "O" :"X";
    currentPlayer=(currentPlayer==x)? o :x;
    finalStatus.textContent = `${player} Your Turn`;
}

function checkWinner() {
  let isWon = false;

  for (let i=0;i<win.length; i++) {
    const condition = win[i]; //[0,1,2]
    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];

    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }

    if (box1 == box2 && box2 == box3) {
      isWon = true;

      boxes[condition[0]].classList.add('win');
      boxes[condition[1]].classList.add('win');
      boxes[condition[2]].classList.add('win');

      finalStatus.classList.add('active');
    }
  }

if(isWon)
{
    finalStatus.textContent=`${player} Won the game ..`;
    running=false;
}
else if(!options.includes(""))
{
    finalStatus.textContent=`Game Draw...!`;
    running=false;
}
else{
    changePlayer();
}

}

function restartGame() {
options = ["", "", "", "", "", "", "", "", ""];
currentPlayer = x;
player = "X";
running = true;
finalStatus.textContent = `${player} Your Turn`;


boxes.forEach((box)=>{
box.innerHTML="";
box.classList.remove('win');
});

finalStatus.classList.remove('active');
}
