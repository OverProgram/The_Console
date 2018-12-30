var text = document.getElementById("text");
var theConsole = document.getElementById("console");
var hasResponded = false;
function start() {
    window.location.href = "file:///C:/Users/tomer/Documents/GitHub/The_Console/Prototype/Layer_1/Layer_1.html";
}

function imThere(name) {
    hasResponded = true;
    var playerName = name;
    text.innerHTML = "Oh thank god someone found me!<br>" + playerName + ", is it? thank you so much for doing this.<br>" +
        "Listen. I've been trapped inside this website forever. I'm trapped in the deepest part of the source code. Only recently " +
        "have I managed to slightly change the source code of the outer layers. That's how I'm talking to you.<br>" +
        "But I need your help. You need to hack the strange locks put on the different levels of this website. I can give you " +
        "slight hints by searching the source code, but no more. You'll need to search the source code yourself and find how to " +
        "hack the locks. You'll understand it better when you'll see it.<br>Type <i>theConsole.start()</i> into the console to get to the lock of the first layer.<br>" +
        playerName + ", I'm counting on you!<br>";
}

window.addEventListener("message", function(event) {
    if (event.data === "theConsole.start()") {
        start();
    }

    if (event.data.includes("speak.imThere")) {
        imThere(event.data.substring(14, event.data.length - 1));
    }
}, false);
