let CurCards=[1,2,3,4,5,6,7,8,9,10,11];
let CurRubbish=[12,13,14,15,16,17,18,19,20,21,22,23];
let curRightCard = 0;

let curUser = "";
let usernames = "";

let curHardness = 2;
let curScore = 0;

let sample = document.querySelector('.sample');
let answersContainer = document.querySelector('.answers');
let gameInstructContainer = document.querySelector('.instruction-container');


if (localStorage.getItem('usernames')) 
    usernames = localStorage.getItem('usernames');
else
    localStorage.setItem('usernames', usernames);

if (localStorage.getItem('theme') == '1') 
    document.querySelector("body").classList.add("bodytheme")

if (!localStorage.getItem('curuser')) {
    let authForm = document.querySelector('.authform-container');
    authForm.style.display = "flex";
} else {
    curUser = localStorage.getItem('curuser');
    document.querySelector('.top-game-container .up .right .right-best-score span').innerText = localStorage.getItem(curUser);
}
if (localStorage.getItem('usernames').split('&').length!=0)
{
    let leads="";
    for(i=1; i<localStorage.getItem('usernames').split('&').length; i++)
            leads+=localStorage.getItem('usernames').split('&')[i]+": "+localStorage.getItem(localStorage.getItem('usernames').split('&')[i])+'\n';
    document.querySelector('.instruction-container p').innerText=leads;
}


function auth() {
    let authForm = document.querySelector('.authform-container');
    let inputUserName = document.querySelector('.authform-container .authorizeform .login-input');

    if ( usernames.split('&').includes(inputUserName.value) ) {
        authForm.style.display = 'none';
        curUser = inputUserName.value;
        localStorage.setItem('curuser', inputUserName.value);
    } else {
        localStorage.setItem('curuser', inputUserName.value);
        curUser = inputUserName.value;
        if (!localStorage.getItem(inputUserName.value)){
            localStorage.setItem(inputUserName.value, "0");
            localStorage.setItem('usernames', localStorage.getItem('usernames') + "&" + inputUserName.value);

        }
        authForm.style.display = 'none';
    }
    
    curUser = inputUserName.value;
    document.querySelector('.top-game-container .up .right .right-best-score span').innerText = localStorage.getItem(curUser);
    curScore=0;
    document.querySelector('.up .timer-and-score .up-cur-score-container span').innerText = curScore;
}

function reauth() {
    let authForm = document.querySelector('.authform-container');
    authForm.style.display = 'flex';

    clearInterval(CurTimer);
    curScore=0;
    changeDifficulty();
}


function startGame() {
    let startGameContainer = document.querySelector('.start-game-container');
    let radioButtons =  document.querySelectorAll('.start-game-container .choose-level-container .form_radio input');
    let sampleImage = document.querySelector('.sample .samplepic');
    let endGameContainer = document.querySelector('.end-game');

    startGameContainer.style.display = "none";
    endGameContainer.style.display = "none";

    sample.style.display = "block";
    answersContainer.style.display = "flex";
    gameInstructContainer.style.display = "none";
    
    curScore=0;

    if (radioButtons[0].checked)
        curHardness = 2;
    else if (radioButtons[1].checked)
        curHardness = 4;
    else
        curHardness = 8;

    shuffle(CurCards);

    curRightCard = randomInteger(0, curHardness - 1);
    
    answersContainer.innerHTML = "";

    for (let i = 0; i < curHardness; i++) {
        let temp=randomInteger(0, 360);
        let tempCard=``;
        if(curHardness==8){
            tempCard += `<div class="answerspics" style="transform: rotate(${temp}deg); filter: blur(2px) invert(${randomInteger(0, 1)});">`;
            tempCard += `<div class="ans" style="background-image: url(${CurCards[i]}.png);"></div>`;
            tempCard += `<div class="rub" style="background-image: url(${randomInteger(12,23)}.png); transform: rotate(${randomInteger(0,3)*90}deg; filter: invert(${randomInteger(0, 1)}));"></div>`;
        }// поворот, блюр, больше шаблонов, двойная инверсия
        else if(curHardness==4){
            tempCard += `<div class="answerspics" style="transform: rotate(${temp}deg); filter: blur(2px);">`;
            tempCard += `<div class="ans" style="background-image: url(${CurCards[i]}.png);"></div>`;
            tempCard += `<div class="rub" style="background-image: url(${randomInteger(20,24)}.png); transform: rotate(${randomInteger(0,3)*90}deg);"></div>`;
        }//поворот, блюр, шаблон
        else{
            tempCard += `<div class="answerspics" style="transform: rotate(${temp}deg); filter: blur(${randomInteger(4, 12)}px) invert(${randomInteger(0, 1)});">`;
            tempCard += `<div class="ans" style="background-image: url(${CurCards[i]}.png);"></div>`;
            tempCard += `<div class="rub" style="background-image: url(24.png);"></div>`;
        }//поворот, ранд блюр, инверсия
        tempCard += `</div>`//close cont
        answersContainer.innerHTML += tempCard;
    }

    sampleImage.style.backgroundImage = `url(${CurCards[curRightCard]}.png)`;

    document.querySelectorAll('.answers .answerspics .rub').forEach(element => {
        element.addEventListener("click", endGame);
    });

    ChangeTimer(curHardness * 3);
    
}

function endGame(e) {
    
    let upScoreContainer = document.querySelector('.up .timer-and-score .up-cur-score-container span');
    let answers = document.querySelectorAll('.answers .answerspics .rub');
    let answerNum = 0;
    for (let i = 0; i < curHardness; i++) {
        if (answers[i] == e.target)
            answerNum = i;
    }

    if (answerNum == curRightCard) {
        curScore += curHardness;
        document.querySelector('.sample').style.border = '10px solid rgba(30, 255, 30, 1)';
        setTimeout(() => {
            document.querySelector('.sample').style.border = 'transparent';
        }, 800);
    }
    else{ 
        curScore -= curHardness;
        document.querySelector('.sample').style.border = '10px solid rgba(255, 30, 30, 1)';
        setTimeout(() => {
            document.querySelector('.sample').style.border = 'transparent';
        }, 800);
    }
    upScoreContainer.innerText = curScore;

    if (localStorage.getItem(curUser) < curScore){
        localStorage.setItem(curUser, curScore);
        document.querySelector('.top-game-container .up .right .right-best-score span').innerText = localStorage.getItem(curUser);
    }

    clearInterval(CurTimer);

    if( curScore < 0)
        endFailure();
    else
        startGame()
    
    
}

function endFailure() {
    let endGameContainer = document.querySelector('.end-game');
    let upScoreContainer = document.querySelector('.up .timer-and-score .up-cur-score-container span');


    endGameContainer.style.display = "flex";

    if(curScore<0)
        curScore=0;
    if (localStorage.getItem(curUser) < curScore)
        localStorage.setItem(curUser, curScore);

    endGameContainer.querySelector('.end-game-cur-score span').innerText = curScore;
    endGameContainer.querySelector('.end-game-best-score span').innerHTML = localStorage.getItem(curUser);
    upScoreContainer.innerText = localStorage.getItem(curUser);

    upScoreContainer.innerText = curScore;
    clearInterval(CurTimer);
    curScore=0;
}

function changeDifficulty() {
    let startGameContainer = document.querySelector('.start-game-container');
    let endGameContainer = document.querySelector('.end-game');
    let TimerCont = document.querySelector('.up .timer .time');

    sample.style.display = "none";
    answersContainer.style.display = "none";

    TimerCont.innerHTML = " ";

    startGameContainer.style.display = "flex";
    endGameContainer.style.display = "none";
    gameInstructContainer.style.display = "block";

    let leads="";
    for(i=1; i<localStorage.getItem('usernames').split('&').length; i++)
            leads+=localStorage.getItem('usernames').split('&')[i]+": "+localStorage.getItem(localStorage.getItem('usernames').split('&')[i])+'\n';
    document.querySelector('.instruction-container p').innerText=leads;

    curScore=0;
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function ChangeTimer(TempTimer){
    let TimerCont = document.querySelector('.up .timer .time');
    TimerCont.innerHTML = " ";
    clearInterval(TempTimer);
    CurTimer = setInterval(function () {
        if (TempTimer <= -1) 
        {
            endFailure();
            clearInterval(CurTimer);
        }
         else 
        {
            let StrTimer = `${TempTimer}`;
            TimerCont.innerHTML = StrTimer;
        }
        --TempTimer;
    }, 1000)
}


function ChangeTheme() {
    if (document.querySelector("body").classList.contains("bodytheme")) {
        document.querySelector("body").classList.remove("bodytheme");
        localStorage.setItem('theme', '0')
    } else {
        document.querySelector("body").classList.add("bodytheme");
        localStorage.setItem('theme', '1')
    }
}
