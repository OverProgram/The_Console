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

var canvas = document.getElementById("canvas");
var text = document.getElementById("text");
var ctx = canvas.getContext("2d");
var squares = [new Square(25, 25, "#FF0000", 100), new Square(175, 25, "#0000FF", 100), new Square(25, 175, "#0000FF", 100),
               new Square(175, 175, "#FF0000", 100), new Square(25, 325, "#00FF00", 100), new Square(175, 325, "#00FF00", 100)];
var connections = [];
var connectionIndex = 0;
var hasDecoded = false;
var hasSeenIndexes = false;
var isSeeingIndexes = false;
var theConsole = {
    delveDeeper() {
        if (hasDecoded) {
            console.log ("Beginning transfer...")
            setTimeout(nextLayer, 1000);
        } else {
            console.log("Access denied");
        }
    }
};
var lock = {
    displayIndexes() {
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
    },

    connectSquares(indexOne, indexTwo) {
        var squareOne = squares[indexOne];
        var squareTwo = squares[indexTwo];
        if (hasDecoded) {
            console.log("Already deocoded layer");
            text.innerHTML = "What are you doing? We already unlocked the layer!";
            return;
        }
        if (isSeeingIndexes){
            console.log("Illegal action. Try again later.")
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
            console.log("One or both of the squares are already connected.");
        }
    },

    submit() {
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
            console.log("Layer decoded.");
            text.innerHTML = "Yes! You managed to break the first lock!<br>Now just type theConsole.delveDeeper() to get to the next lock!";
            hasDecoded = true;
        } else {
            console.log("Incorrect.");
        }
    }
};
draw();
