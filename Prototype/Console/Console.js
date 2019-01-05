var theConsole = document.getElementById("console");
var input = document.getElementById("input");
var prevCommands = [];
var commandIndex = 0;
var currantIndex;
var inputEnabled = true;
function onKeyPress(e) {
    if (e.which == 13) {
        window.parent.postMessage("con " + input.value.toString(), "*");
        prevCommands.push(input.value);
        printToConsole(input.value, "input");
        commandIndex++;
        currantIndex = commandIndex;
    }
}

function onKeyDown(e) {
    if (e.which == 38 && currantIndex > 0) {
        currantIndex--;
        input.value = prevCommands[currantIndex];
    } else if (e.which == 40 && currantIndex < prevCommands.length - 1) {
        currantIndex++;
        input.value = prevCommands[currantIndex];
    }
}

function printToConsole(output, format = "") {
    var para = input.parentNode;
    para.removeChild(input);
    if (format === "input") {
        para.appendChild(document.createTextNode(output));
    } else {
        theConsole.removeChild(para);
        para = document.createElement("p");
        para.innerHTML = "&#62" + output;
        if (format === "err") {
            para.className = "error";
        }
        theConsole.appendChild(para);
    }

    if(inputEnabled) {
        newInputArea();
    }
}

window.addEventListener("message", function(event) {
    if (event.data.toString().substring(0, 6) === "print ") {
        printToConsole(event.data.substring(6, event.data.length));
    } else if (event.data.substring(0, 4) === "err ") {
        printToConsole(event.data.substring(4, event.data.length), "err");
    } else if (event.data === "error") {
        printToConsole("Error: Invalid command", "err");
    } else if (event.data === "paraerr") {
        printToConsole("Error: Invalid parameters", "err");
    } else if (event.data === "disable") {
        theConsole.removeChild(input.parentNode);
        inputEnabled = false;
    } else if (event.data === "enable") {
        newInputArea();
        inputEnabled = true;
    }
}, false);

function newInputArea() {
    var newLine = document.createElement("p");
    var newInput = document.createElement("textarea");
    newInput.id = "input";
    newInput.rows = 1;
    newInput.cols = 100;
    newInput.onkeypress = onKeyPress;
    newInput.onkeydown = onKeyDown;
    newLine.innerHTML = "&#60";
    newLine.appendChild(newInput);
    theConsole.appendChild(newLine);
    input = newInput;
}
