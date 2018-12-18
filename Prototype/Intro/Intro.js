var text = document.getElementById("text");
var Console = {
    Start : function() {
        window.location.href = "file:///C:/Users/tomer/Documents/GitHub/The_Console/Prototype/Layer 1/Layer1.html";
    }
}

function SetCookie(c_name, value, exdays) {
    var exdate = new Date();  
    exdate.setDate( exdate.getDate() + exdays );  
    var c_value = escape( value ) + ( ( exdays == null ) ? "" : "; expires=" + exdate.toUTCString() );  
    document.cookie = c_name + "=" + c_value + "; path=/";  
}

function GetCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function ImThere(name) {
    SetCookie("playerName", name, 30);
    var playerName = name;
    text.innerHTML = "Oh thank god someone found me!<br>" + playerName + ", is it? thank you so much for doing this.<br>" +
    "Listen. I've been trapped inside this website forever. I'm trapped in the deepest part of the source code. Only recently " +
    "have I managed to slightly change the source code of the outer layers. That's how I'm talking to you.<br>" + 
    "But I need your help. You need to hack the strange locks put on the different levels of this website. I can give you " + 
    "slight hints by searching the source code, but no more. You'll need to search the source code yourself and find how to " + 
    "hack the locks. You'll understand it better when you'll see it.<br>Type Console.Start() into the console to get to the lock of the first layer.<br>" + 
    playerName + ", I'm counting on you!<br>";
}
