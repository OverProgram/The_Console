const NATRUAL = "Images/natrual.png";
const BLUE = "Images/blue.png";
const RED = "Images/red.png";
const GREEN = "Images/green.png";
const YELLOW = "Images/yellow.png";
const LOST = "Images/lost.png";
var simon = document.getElementById ("simon");
var scoreText = document.getElementById ("score");
var text = document.getElementById ("text");
var score = 0;
var pattern = [];
var patternIndex = 0;
var hasDisplayedPattern = false;
var hasLost = false;
var hasDecodedLayer = false;

function displayPattern(index) {
    if (index < pattern.length && index >= 0){
        switch (pattern[index]) {
            case 0:
                simon.src = BLUE;
                break;
            case 1:
                simon.src = RED;
                break;
            case 2:
                simon.src = GREEN;
                break;
            case 3:
                simon.src = YELLOW;
                break;
        }
        window.setTimeout(displayPattern, 1000, index + 1);
    } else if (index == pattern.length) {
        hasDisplayedPattern = true;
        simon.src = NATRUAL;
    }
}

function play() {
    scoreText.innerHTML = "score: " + score;
    pattern[patternIndex] = Math.floor (Math.random() * 4);
    patternIndex++;
    displayPattern (0);
}

function nextLayer() {
    window.location.href = "file:///C:/Users/tomer/Documents/GitHub/The_Console/Prototype/Layer_3/Layer_3.html";
}

var theConsole = {
    delveDeeper() {
        if (hasDecodedLayer) {
            console.log ("Beginning transfer...")
            setTimeout(nextLayer, 1000);
        } else {
            console.log("Access denied");
        }
    }
};

var lock = {
    start() {
        score = 0;
        pattern = [];
        hasDisplayedPattern = false;
        hasLost = false;
        play();
    },

    submitPattern(patternString) {
        if (!hasDisplayedPattern) {
            console.log ("Still displaying pattern or has not displayed pattern yet.");
            return;
        }

        if (hasLost) {
            console.log ("Cannot submit pattern after loss.");
        }
        var currantWord = "";
        var cuurantPattern = 0;
        for (let i = 0; i < patternString.length; i++) {
            let currantChar = patternString.charAt(i);
            if (currantChar == ",") {
                if ((currantWord == "blue" && pattern[cuurantPattern] != 0) || (currantWord == "red" && pattern[cuurantPattern] != 1) || 
                (currantWord == "green" && pattern[cuurantPattern] != 2) || (currantWord == "yellow" && pattern[cuurantPattern] != 3)) {
                    simon.src = LOST;
                    window.setTimeout(function() {
                        simon.src = NATRUAL;
                    }, 500);
                    hasLost = true;
                    console.log ("Incorrect. Start from beginning.");
                    return;
                } else {
                    cuurantPattern++;
                }
            } else if (currantChar != " ") {
                currantWord += currantChar.toLowerCase();
            }
        }
        
        score++;
        if (score < 10) {
            scoreText.innerHTML += "<i class = \"fas fa-check\"></i>"
            window.setTimeout (play, 1000);
        } else {
            hasDecodedLayer = true;
            console.log ("Layer decoded.");
        }
    }
}; 
