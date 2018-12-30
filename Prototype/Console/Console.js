var theConsole = document.getElementById("console");
var input = document.getElementById("input");
function onKeyPress(e) {
    if (e.which == 13) {
        window.parent.postMessage(input.value, "*");
        printToConsole(input.value, true);
    }
}

function printToConsole(output, isInput = false) {
    var para = input.parentNode;
    para.removeChild(input);
    if (isInput) {
        para.appendChild(document.createTextNode(output));
    } else {
        theConsole.removeChild(para);
        para = document.createElement("p");
        para.innerHTML = "&#62" + output;
        theConsole.appendChild(para);
    }
    var newLine = document.createElement("p");
    var newInput = document.createElement("textarea");
    newInput.id = "input";
    newInput.rows = 1;
    newInput.cols = 100;
    newInput.onkeypress = onKeyPress;
    newLine.innerHTML = "&#60";
    newLine.appendChild(newInput);
    theConsole.appendChild(newLine);
    input = newInput;
}
