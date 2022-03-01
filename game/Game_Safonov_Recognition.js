
let CurCards=[1,2,3,4,5,6,7,8,9,10,11];
let curRightCard = 0;

let curUser = "";
let usernames = "";

let curHardness = 2;
let curScore = 0;

let sample = document.querySelector('.sample');
let answersContainer = document.querySelector('.answers');
let gameInstructContainer = document.querySelector('.instruction-container');


if (localStorage.getItem('usernames')) {
    usernames = localStorage.getItem('usernames');
}

if (!localStorage.getItem('curuser')) {
    let authForm = document.querySelector('.authform-container');

    authForm.style.display = "flex";
} else {
    curUser = localStorage.getItem('curuser');
    document.querySelector('.top-game-container .up .right .right-best-score span').innerText = localStorage.getItem(curUser);
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
}

function reauth() {
    let authForm = document.querySelector('.authform-container');
    authForm.style.display = 'flex';


    clearInterval(CurTimer);
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
        answersContainer.innerHTML +=  `<div class="answerspics" style="background-image: url(${CurCards[i]}.png); transform: rotate(${randomInteger(0, 360)}deg); filter: blur(${randomInteger(3, 12)}px) invert(${randomInteger(0, 2)/10});"></div>`
    }

    sampleImage.style.backgroundImage = `url(${CurCards[curRightCard]}.png)`;

    document.querySelectorAll('.answers .answerspics').forEach(element => {
        element.addEventListener("click", endGame);
    });

    ChangeTimer(curHardness * 3);
    
}

function endGame(e) {
    
    let upScoreContainer = document.querySelector('.up .timer-and-score .up-cur-score-container span');
    let answers = document.querySelectorAll('.answers .answerspics');
    let answerNum = 0;

    for (let i = 0; i < curHardness; i++) {
        if (answers[i] == e.target)
            answerNum = i;
    }

    if (answerNum == curRightCard) 
        curScore += curHardness;
    else 
        curScore -= curHardness;
    
    upScoreContainer.innerText = curScore;

    if (localStorage.getItem(curUser) < curScore){
        localStorage.setItem(curUser, curScore);
        document.querySelector('.top-game-container .up .right .right-best-score span').innerText = localStorage.getItem(curUser);
    }

    if( curScore < 0){
        clearInterval(CurTimer);
        endFailure();
    }
    else{
        clearInterval(CurTimer);
        startGame()
    }
        
}

function endFailure() {
    let endGameContainer = document.querySelector('.end-game');
    let upScoreContainer = document.querySelector('.up .timer-and-score .up-cur-score-container span');


    endGameContainer.style.display = "flex";

    if(curScore<0)
        curScore=0;

    endGameContainer.querySelector('.end-game-cur-score span').innerText = curScore;
    endGameContainer.querySelector('.end-game-best-score span').innerHTML = localStorage.getItem(curUser);
    upScoreContainer.innerText = localStorage.getItem(curUser);

    curScore = 0;
    upScoreContainer.innerText = curScore;
    clearInterval(CurTimer);
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

if (localStorage.getItem('theme') == '1') {
    document.querySelector("body").classList.add("bodytheme")
}