window.onload = Initalize();




function Initalize()
{
    LoadJsonData();
}




var channelData;
function LoadJsonData()
{
    readJSON("data/channel.json", channelLoadComp);
    
}

function channelLoadComp(text)
{
    console.log("channelLoadComp");

    channelData = JSON.parse(text);
    setScreen();
}

function setScreen()
{
    if (channelData == null) return;

    document.getElementById("content").style.width = channelData["data"][0]["chnWidth"] + 'px';
    document.getElementById("content").style.height = channelData["data"][0]["chnHeight"] + 'px';

    for (i = 0; i < channelData["data"][0]["chnZone"].length; i++)
    {
        var newdiv = document.createElement("div");
        newdiv.id = "screen_"+i;
        newdiv.innerHTML =
            '<video id="video_' + i + '" width="100%" height="100%" autoplay="true" loop="true">' +
            '<source id="sourceVideo" src="null" type=""></source>'
            +'</video > ';
        
        newdiv.style.width = channelData["data"][0]["chnZone"][i]["zoneWidth"];
        newdiv.style.height = channelData["data"][0]["chnZone"][i]["zoneHeight"];

        document.getElementById("content").appendChild(newdiv);
    }
    
}


function readJSON(file, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var counter = 0;

function onTestDown()
{
    var path = "";
    counter++;
    if (counter % 2 == 0)
    {
        path = "meida/Flowers - 66823.mp4";
    } else {
        path = "meida/Cane - 31180.mp4";
    }

    var getVideo = document.getElementById("video_0");
    var getSource = document.getElementById("sourceVideo");

    getSource.setAttribute("src", path);
    getSource.setAttribute("type", "video/mp4");
    getVideo.load();
    getVideo.play();
}