class Square {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.hasBeenConnected = false;
    }
}

function draw() {
    squares.forEach(function(squere) {
        ctx.beginPath();
        ctx.fillStyle = squere.color;
        ctx.fillRect(squere.x, squere.y, squere.size, squere.size);
        ctx.stroke();
    });
    isSeeingIndexes = false;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function restartCanvas() {
    connections = [];
    connectionIndex = 0;
    squares.forEach(function(square) {
        square.hasBeenConnected = false;
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

function nextLayer() {
    window.location.href = "file:///C:/Users/tomer/Documents/GitHub/The_Console/Prototype/Layer_2/Layer_2.html";
}

function continueHint() {
    text.innerHTML+= "<br>Okay, I got something. You need to connect the squares that are the same color. How do you do that? Well I'm not sure."
}

function delveDeeper() {
    if (hasDecoded) {
        theConsole.contentWindow.postMessage ("print Beginning transfer...", "*")
        setTimeout(nextLayer, 1000);
    } else {
        theConsole.contentWindow.postMessage("print Access denied", "*");
    }
}

function displayIndexes() {
    restartCanvas();
    isSeeingIndexes = true;
    squares = shuffle(squares);
    for (let i = 0; i < squares.length; i++) {
        var square = squares[i];
        ctx.fillStyle = "#000000";
        ctx.font = "40px Ariel";
        ctx.fillText(i.toString(), square.x + (square.size * 1.25), square.y + (square.size / 5));
        ctx.stroke();
        window.setTimeout(restartCanvas, 4000);
    }
    hasSeenIndexes = true;
}

function connectSquares(indexOne, indexTwo) {
    var squareOne = squares[indexOne];
    var squareTwo = squares[indexTwo];
    if (hasDecoded) {
        theConsole.contentWindow.postMessage("print Already deocoded layer", "*");
        text.innerHTML = "What are you doing? We already unlocked the layer!";
        return;
    }
    if (isSeeingIndexes){
        theConsole.contentWindow.postMessage("print Illegal action. Try again later.", "*")
    }
    if (!hasSeenIndexes) {
        text.innerHTML = "How exactly do you know the indexes? Messing around like this could mess things up!";
        return;
    }
    if (!squareOne.hasBeenConnected && !squareTwo.hasBeenConnected) {
        ctx.moveTo(squareOne.x + (squareOne.size / 2), squareOne.y + (squareOne.size / 2));
        ctx.lineTo(squareTwo.x + (squareTwo.size / 2), squareTwo.y + (squareTwo.size / 2));
        ctx.stroke();
        connections[connectionIndex] = [indexOne, indexTwo];
        squareOne.hasBeenConnected = true;
        squareTwo.hasBeenConnected = true;
    } else {
        theConsole.contentWindow.postMessage("print One or both of the squares are already connected.", "*");
    }
}

function submit() {
    var correct = true;
    if (connections.length == 3) {
        connections.forEach(function(connection) {
            var squareOne = squares[connection[0]];
            var squareTwo = squares[connection[1]];
            if (squareOne.color != squareTwo.color) {
                correct = false;
            }
        });
    }

    if (correct) {
        theConsole.contentWindow.postMessage("print Layer decoded.", "*");
        text.innerHTML = "Yes! You managed to break the first lock!<br>Now just type theConsole.delveDeeper() to get to the next lock!";
        hasDecoded = true;
    } else {
        theConsole.contentWindow.postMessage("print Incorrect.", "*");
    }
}

function hint() {
    text.innerHTML = "Ok, i'll try to dig in the source code and find something.";
    setTimeout(continueHint, 3000);
}

function whatDoIDo() {
    if (hasDecoded) {
        text.innerHTML = "Just type theConsole.delveDeeper() to get to the next lock!";
    } else {
        text.innerHTML = "all of the commands you need are in the object <i>lock</i>. Just see what commands are in there" +
        "and try to figure out what you need to do.<br>If you want to talk to me or ask for hints just" +
        "use the object <i>speak</i>";
    }
}

var canvas = document.getElementById("canvas");
var text = document.getElementById("text");
var theConsole = document.getElementById("helper");
var ctx = canvas.getContext("2d");
var squares = [new Square(25, 25, "#FF0000", 100), new Square(175, 25, "#0000FF", 100), new Square(25, 175, "#0000FF", 100),
               new Square(175, 175, "#FF0000", 100), new Square(25, 325, "#00FF00", 100), new Square(175, 325, "#00FF00", 100)];
var connections = [];
var connectionIndex = 0;
var hasDecoded = false;
var hasSeenIndexes = false;
var isSeeingIndexes = false;

window.addEventListener("message", function(event) {
    if (event.data.substring(0, 5) === "lock.") {
        let func = event.data.substring(5, event.data.length);
        if (func === "displayIndexes()") {
            displayIndexes();
        } else if (func.substring(0, 15) === "connectSquares(") {
            let paras = func.substring(func.search(/\(/) + 1, func.search(/\)/));
            let paraOne = "";
            let paraTwo = "";
            let hasSeenParaOne = false;
            for (let i = 0; i < paras.length; i++) {
                let char = paras.charAt(i);
                if (hasSeenParaOne && char != " ") {
                    paraTwo += char;
                } else if (char === ",") {
                    hasSeenParaOne = true;
                } else if (char != " ") {
                    paraOne += char
                }
            }
            let indexOne = parseInt(paraOne);
            let indexTwo = parseInt(paraTwo);
            
            if (indexOne > 6 || indexTwo > 6 || indexOne == NaN || indexTwo == NaN) {
                theConsole.contentWindow.postMessage("paraerr", "*");
            } else {
                connectSquares(indexOne, indexTwo);
            }
        } else if (func === "submit()") {
            submit();
        } else {
            theConsole.contentWindow.postMessage("error", "*");
        }
    } else if (event.data.substring(0, 6) === "speak.") {
        func = event.data.substring(6, event.data.length);
        if (func === "hint()") {
            hint();
        } else if (func === "whatDoIDo()") {
            whatDoIDo();
        } else {
            theConsole.contentWindow.postMessage("error", "*");
        }
    } else if (event.data.substring(0, 11) === "theConsole.") {
        if (event.data.substring(11, event.data.length) === "delveDeeper()") {
            delveDeeper();
        } else {
            theConsole.contentWindow.postMessage("error", "*");
        }
    } else {
        theConsole.contentWindow.postMessage("error", "*");
    }
}, false);

theConsole.onload = function() {
    theConsole.contentWindow.postMessage("size 370,850", "*");
}

draw();
