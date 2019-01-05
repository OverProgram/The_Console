function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

var theConsole = document.getElementById("console");
var api = document.getElementById("api");
window.addEventListener("message", function(event) {
    if (event.data.substring(0, 4) === "con ") {
        window.parent.postMessage(event.data.substring(4, event.data.length), "*");
    } else {
        if (event.data.substring(0, 5) === "size ") {
            let height = event.data.substring(5, event.data.search(/,/)) + "px";
            let width = event.data.substring(event.data.search(/,/) + 1, event.data.length) + "px";
            theConsole.style.height = height;
            theConsole.style.width = width;   
            api.style.height = height;
            api.style.width = width;
        } else {
            theConsole.contentWindow.postMessage(event.data, "*");
        }
    }
}, false);

