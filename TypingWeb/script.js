const wordEl=document.getElementById('word');
const textEl=document.getElementById('text');
const scoreEl=document.getElementById('score');
const timeEl=document.getElementById('time');

const btnLevelEl=document.getElementById('level-btn');
const settingsEl=document.getElementById('settings');
const levelFormEl=document.getElementById('level-form');
const levelEl=document.getElementById('level');
const gameoverEl=document.getElementById('gameover-container');

const words=["เศรษฐี","แมว","หมู","ไก่","เครื่องคิดเลข","จักรยาน"];
// words = เก็บคำ wordEl = แสดงผล

let randomText;
let score=0;
let time=5;//easy => 15 , medium => 10,hard => 5
const saveMode=localStorage.getItem('mode') !==null ?localStorage.getItem('mode') : 'medium';

let level='medium';

const timeInterval=setInterval(updateTime,1000);

function getRamdomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

function displayWordToUI(){
    randomText=getRamdomWord();
    wordEl.innerHTML = randomText;
    timeEl.innerHTML=time;
}
textEl.addEventListener('input',(e)=>{
    const inputText=e.target.value;

    if(inputText === randomText){
        if(saveMode == 'easy'){
            time+=5;
        }else if(saveMode == 'medium'){
            time+=3;
        }else{
            time+=2;
        }
        displayWordToUI();
        updateScore();
        e.target.value='';
    }
});

function updateScore(){
    score+=10
    scoreEl.innerHTML=score;
}

function updateTime(){
    time--;
    timeEl.innerHTML=time;

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}
function gameOver(){
    gameoverEl.innerHTML=`
    <h1>Game Over</h1>
    <p>Your Score = ${score} point</p>
    <button class="gameOver" onclick="location.reload()">Play Again</button>
    `;
    gameoverEl.style.display='flex'
}
btnLevelEl.addEventListener('click',()=>{
    settingsEl.classList.toggle('hide');
});


levelEl.addEventListener('change',(e)=>{
    level=e.target.value;
    localStorage.setItem("mode",level);
});

function startGame(){
    levelEl.value=saveMode;
    if(saveMode == 'easy'){
        time=15;
    }else if(saveMode == 'medium'){
        time=10;
    }else{
        time=5;
    }
    displayWordToUI();
}
startGame();
textEl.focus();