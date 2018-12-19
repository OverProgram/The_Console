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
        ctx.fillStyle = squere.color;
        ctx.fillRect(squere.x, squere.y, squere.size, squere.size);
        ctx.stroke();
    });
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function restartCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

var canvas = document.getElementById("canvas");
var text = document.getElementById("text");
var ctx = canvas.getContext("2d");
var squares = [new Square(25, 25, "#FF0000", 100), new Square(175, 25, "#FF0000", 100)];
var connections = [];
var connectionIndex = 0;
var hasDecoded = false;
var console = {
    displayIndexes() {
        text.innerHTML = "";
        squares = shuffle(squares);
        for (let i = 0; i < squares.length; i++) {
            var square = squares[i];
            ctx.fillStyle = "#000000";
            ctx.font = "40px Ariel";
            ctx.fillText(i.toString(), square.x + (square.size * 1.25), square.y + (square.size / 5));
            ctx.stroke();
            window.setTimeout(restartCanvas, 1000);
        }
    },

    connectSquares(indexOne, indexTwo) {
        if (hasDecoded = true) {
            return;
        }
        if (!squareOne.hasBeenConnected && !squareTwo.hasBeenConnected) {
            var squareOne = squares[indexOne];
            var squareTwo = squares[indexTwo];
            ctx.moveTo(squareOne.x + (squareOne.size / 2), squareOne.y + (squareOne.size / 2));
            ctx.lineTo(squareTwo.x + (squareTwo.size / 2), squareTwo.y + (squareTwo.size / 2));
            ctx.stroke();
            connections[connectionIndex] = [indexOne, indexTwo];
            squareOne.hasBeenConnected = true;
            squareTwo.hasBeenConnected = true;
        } else {
            text.innerHTML = "One or both of the squares are already connected.";
        }
    },

    submit() {
        var correct = true;
        connections.forEach(function(connection) {
            var squareOne = squares[connection[0]];
            var squareTwo = squares[connection[1]];
            if (squareOne.color != squareTwo.color) {
                correct = false;
            }
        });

        if (correct) {
            text.innerHTML = "Layer decoded.";
            hasDecoded = true;
        } else {
            text.innerHTML = "Incorrect.";
        }
    }
};
draw();
