const button = document.getElementById("clickBtn");
const counter = document.getElementById("counter");
const mult = document.getElementById("multiplier");
const timeLeft = document.getElementById("timeLeft");
const hs = document.getElementById("highscore");
const title = document.getElementById("titleText");

let alertText;

let score = 0;
let clicks = 0;
let multiplier = 1;
let gameActive = false;
let timeLimit = 15;
let time = timeLimit;
let highscore = 0;
let oldhighscore = 0;

let countdownInterval;
let randomizeInterval;

function refreshButton() {
    button.style.border = "#ffffff solid 3px";
    button.style.backgroundColor = "#505050";
    button.textContent = "Click";
    button.style.fontSize = "10pt";
}

function refreshScore() {
    counter.style.color = "#fff"
}

function refreshHighscore() {
    hs.style.color = "#fff"
}

function refreshMultiplier() {
    mult.style.color = "#fff"
}

function refreshTime() {
    timeLeft.style.color = "#fff"
}

function flip() {
    if (gameActive==true) {
        let oldMultiplier = multiplier;
        if (score < 10) {
            multiplier=1;
        } else if (score >= 500) {
            multiplier=5;
        } else if (score >= 150) {
            multiplier=4;
        } else if (score >= 50) {
            multiplier=3;
        } else if (score >= 10) {
            multiplier=2;
        }
        if (oldMultiplier < multiplier) {
            mult.style.color = "#33ff33"
            setTimeout(refreshMultiplier, 100)
        }
        score+=multiplier;
        clicks++;
        counter.textContent = "Score: "+ score;
        mult.textContent = "Score per click: " + multiplier;
        if (score > highscore) {
            highscore = score;
            hs.style.color = "#33ff33"
            setTimeout(refreshHighscore, 100)
        }
        hs.textContent = "Highscore: "+highscore;
        button.style.border = "10px solid #ffffff";
        button.style.backgroundColor = "#aaaaaa";
        button.textContent = "[ Click ]"
        button.style.fontSize = "12pt"
        counter.style.color = "#33ff33";
        setTimeout(refreshButton, 100)
        setTimeout(refreshScore, 100)
    } else {
        clicks = 0;
        oldhighscore = highscore;
        if (score > highscore) {
            highscore = score;
        }
        score = 0;
        hs.textContent = "Highscore: "+highscore;
        gameActive = true;
        time = timeLimit;
        title.style.fontSize = 0;
        mult.style.fontSize = "25pt";
        hs.style.fontSize = "25pt";
        counter.style.fontSize = "25pt";
        timeLeft.style.fontSize = "25pt";
        title.style.paddingTop = 0;
        flip();
        countdownInterval = setInterval(countdown, 100);
        randomizeInterval = setInterval(newPos, 1500);
        setTimeout(endGame, timeLimit*1000);
    }
}

function newPos() {
    if (gameActive==true) {
        const x = Math.floor(Math.random() * 90);
        const y = Math.floor(Math.random() * 75) + 15;
        button.style.left = x + '%';
        button.style.top = y + '%';
    }
}

function countdown() {
    if (time > 0 && gameActive) {
        time-=0.1;
        timeLeft.textContent = "Time Left: " + Math.floor(time*10)/10 + "s";
        if (Math.floor(time*10)/10 % 1 == 0) {
            timeLeft.style.color = "#ff0000";
            setTimeout(refreshTime, 100);
        }
    }
}

function endGame() {
    if (gameActive==true) {
        gameActive = false;
        alertText = 'In '+ timeLimit + ' seconds you clicked the button ' + clicks + ' times and got ' + score + ' points!';
        if (oldhighscore < highscore)
            alertText = alertText + ("\nYou have beaten your old highscore of " + oldhighscore + ". Your new highscore is: " + highscore)
        alert(alertText);
        counter.textContent = "";
        mult.textContent = "Refresh Page to Play Again"
        timeLeft.textContent = ""
        button.style.top = "60%";
        button.style.left = "45%";
        title.style.fontSize = "30pt";
        mult.style.fontSize = 0;
        hs.style.fontSize = 0;
        counter.style.fontSize = 0;
        timeLeft.style.fontSize = 0;
        title.style.paddingTop = "35px";
        clearInterval(randomizeInterval)
        clearInterval(countdownInterval)
    }
}