//Cheeky few globals
progressBarResolution = 0;
distanceMode = 1;
teamMode = false;

async function getData() {

    username = document.getElementById("username").value;
    progressBarResolution = document.getElementById("progressBarResolution").value;

    setDistanceMode();
    
    const url = `https://www.interstellarshareware.net/vhsApi/collectData/${username}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        if (!teamMode) {
            processStats(result["user"]["totals"]);
        } else {
            processStats(result["user"]["team"]["totals"]);
        }

    } catch (error) {
        console.log(error);
        showErrorBox();
    } 

}

function showErrorBox(){
    document.getElementById("mainStats").hidden = true;
    document.getElementById("errOther").hidden = false;
}

function showStatsBox(){
    document.getElementById("mainStats").hidden = false;
    document.getElementById("errOther").hidden = true;
}

function processStats(result){

    //Process raw stats into the units I need

    _keys = result["keys"];
    _keysMJ = _keys * 1.65;
    _keysJ = _keysMJ/1000;
    _keysKJ = _keysJ/1000;

    _clicks = result["clicks"];

    _dataGB = (result["download_mb"]+result["upload_mb"])/1024;
    _dataTB = _dataGB/1024;
    _dataPB = _dataTB/1024;

    _scrolls = result["scrolls"];
    _scrollsRotations = _scrolls/24;
    _scrollsDistanceMiles = _scrolls*1.04/12/5280;

    _mouseDistanceMiles = result["distance_miles"];

    _words = result["words"];

    _uptimeRaw = result["uptime_seconds"];
    _uptimeTotalHours = _uptimeRaw/60/60;

    //These variables are not the time converted to these units, but these unit components of the total time
    _uptimeSeconds = _uptimeRaw%60;
    _uptimeMinutes = Math.trunc(_uptimeRaw/60)%60;  //oh this is gonna get unruly
    _uptimeHours = Math.trunc(_uptimeRaw/60/60)%24;
    _uptimeDays = Math.trunc(_uptimeRaw/60/60/24)%30;
    _uptimeMonths = Math.trunc(_uptimeRaw/60/60/24/30)%12;
    _uptimeYears = Math.trunc(_uptimeRaw/60/60/24/30/12);   //Jesus wept, and truly honest to god I couldn't tell you if this is correct
    //After I did this and while I was doing other other time calculations I discovered Date can 
    //do this automatically, but frankly this is morbidly beautiful and I will not be changing it

    //Set main stat displays
    document.getElementById("totalKeys").innerText = new Intl.NumberFormat().format(_keys);
    document.getElementById("totalClicks").innerText = new Intl.NumberFormat().format(_clicks);
    document.getElementById("totalData").innerText = new Intl.NumberFormat().format(_dataGB);
    document.getElementById("totalScrolls").innerText = new Intl.NumberFormat().format(_scrolls);
    document.getElementById("totalMouse").innerText = new Intl.NumberFormat().format(_mouseDistanceMiles*distanceMode);
    document.getElementById("totalWords").innerText = new Intl.NumberFormat().format(_words);
    document.getElementById("totalUptime").innerText = `${_uptimeYears}y ${_uptimeMonths}m ${_uptimeDays}d ${_uptimeHours}h ${_uptimeMinutes}m ${_uptimeSeconds}s`


    //Alright kel lock the fuck in
    //Keys
    standardData("linuxKeys", _keys, 2224000000);
    standardData("wikiKeys", _keys, 30600000000);
    //Keys-energy
    standardData("potatoKeys", _keysJ, 2.69568);
    standardData("aabatteryKeys", _keysJ, 12500);
    standardData("vbatteryKeys", _keys, 19440);
    standardData("waterKeys", _keysKJ, 225);
    standardData("coffeeKeys", _keysJ, 8368);
    standardData("grapesKeys", _keysKJ, 288);
    standardData("bigmacKeys", _keysKJ, 2400);
    standardData("weedKeys", _keysKJ, 19.3);
    standardData("caloriesKeys", _keysJ, .239);
    //Clicks
    standardData("wikiClicks", _clicks, 7224747);
    standardData("scihubClicks", _clicks, 88343822);
    noPercentData("minecraftClicks", _clicks, 15120000000);
    noPercentData("bitsmallClicks", _clicks, 2147483647);
    noPercentData("bitlargeClicks", _clicks, 9223372036854780000);
    //Data
    standardData("blurayData", _dataGB, 50);
    standardData("netflixData", _dataGB, 7);
    standardData("wikitextData", _dataGB, 24.7);
    standardData("scihubData", _dataTB, 100);
    standardData("wikimediaData", _dataTB, 987.41);
    noPercentData("trafficData", _dataTB, 402740000);
    //Scrolls
    justData("rotationsScroll", _scrollsRotations);
    justData("distanceScroll", _scrollsDistanceMiles*distanceMode);
    //Mouse Distance
    standardData("footballDistance", _mouseDistanceMiles, 0.0568182);
    standardData("mtkeaMouse", _mouseDistanceMiles, 5.498);
    standardData("spaceDistance", _mouseDistanceMiles, 62);
    standardData("littleMouse", _mouseDistanceMiles, 500);
    standardData("shireMouse", _mouseDistanceMiles, 1779);
    standardData("usaMouse", _mouseDistanceMiles, 2892);
    standardData("nileMouse", _mouseDistanceMiles, 4132);
    standardData("chinaMouse", _mouseDistanceMiles, 13170.7);
    standardData("australiaMouse",_mouseDistanceMiles, 16010);
    standardData("earthMouse", _mouseDistanceMiles, 24901.461);
    standardData("moonMouse", _mouseDistanceMiles, 238855);
    standardData("lightMouse", _mouseDistanceMiles, 186282);
    standardData("marsMouse", _mouseDistanceMiles, 140000000);
    //Words
    standardData("guideWords", _words, 46333);
    standardData("leavesWords", _words, 190373);
    standardData("warWords", _words, 587287);
    standardData("wikiWords", _words, 5125583368);
    
    //Time, oh boy
    _currentTime = Date.now()/1000; //Divide by 1000 to convert to seconds
    _kelCookieClickerTime = _currentTime - toTimestamp(new Date('9/6/2016')); // m/d/y
    _y2kTime = _currentTime - toTimestamp(new Date('1/1/2000'));
    _doomTime = _currentTime - toTimestamp(new Date('12/10/1993'));
    _berlinWallTime = _currentTime - toTimestamp(new Date('11/9/1989'));
    _marioTime = _currentTime - toTimestamp(new Date('09/13/1985'));
    _lightBulbTime = _currentTime - toTimestamp(new Date('10/21/1879'));

    justData("wageTime", _uptimeTotalHours * 7.25);
    standardData("cookieTime", _uptimeRaw, _kelCookieClickerTime);
    standardData("y2kTime", _uptimeRaw, _y2kTime);
    standardData("doomTime", _uptimeRaw, _doomTime);
    standardData("berlinTime", _uptimeRaw, _berlinWallTime);
    standardData("marioTime", _uptimeRaw, _marioTime);
    standardData("lightTime", _uptimeRaw, _lightBulbTime);



    showStatsBox();
}


function standardData(name, currentTotal, targetTotal){

    //Calculate the totals
    count = currentTotal/targetTotal;   //Total count of the stat
    tillNextTarget = currentTotal%targetTotal;  //How long until the user hits the target again
    percentCompletion = tillNextTarget/targetTotal*100; //Percentage of next target complete
    percentFilledBar = Math.trunc(percentCompletion/(100/progressBarResolution));    //How many rectangles in the bar are filled
    percentEmptyBar = progressBarResolution-percentFilledBar;  //How many aren't

    //Do some fuckin magic
    document.getElementById(name).innerText = count.toFixed(3);
    document.getElementById(name+"Percent").innerText = percentCompletion.toFixed(2)+"%";
    //And now some absolute wizardry
    document.getElementById(name+"Bar").innerHTML = "&block;".repeat(percentFilledBar) + "&blk14;".repeat(percentEmptyBar);

}

function noPercentData(name, currentTotal, targetTotal){
    //Calculate the totals
    count = currentTotal/targetTotal;   //Total count of the stat
    tillNextTarget = currentTotal%targetTotal;  //How long until the user hits the target again
    percentCompletion = tillNextTarget/targetTotal*100; //Percentage of next target complete
    percentFilledBar = Math.trunc(percentCompletion/(100/progressBarResolution));    //How many rectangles in the bar are filled
    percentEmptyBar = progressBarResolution-percentFilledBar;  //How many aren't

    document.getElementById(name).innerText = percentCompletion.toFixed(2)+"%";
    //And now some absolute wizardry
    document.getElementById(name+"Bar").innerHTML = "&block;".repeat(percentFilledBar) + "&blk14;".repeat(percentEmptyBar);
}

function justData(name, currentTotal){
    document.getElementById(name).innerText = new Intl.NumberFormat().format(currentTotal.toFixed(2));
}

const toTimestamp = date => Math.floor(date.getTime()/1000); //Divide by 1000 keeps everything in seconds

function setDistanceMode(){

    valueText = document.getElementById("distanceMode").value;

    if (valueText == "Kilometers"){
        distanceMode = 1.60934; //Kilometers in a miles
        document.getElementById("distanceUnit").innerText = "Kilometers";
        document.getElementById("scrollDistance").innerText = "kilometers!";
    } else if (valueText == "Miles"){
        distanceMode = 1;
        document.getElementById("distanceUnit").innerText = "Miles";
        document.getElementById("scrollDistance").innerText = "miles!";
    }

}

function kelsStats(){

    if (teamMode) {toggleTeamMode()};

    document.getElementById("username").value = "InterstellarKellen";
    getData();
}

function toggleTeamMode(){
    teamMode = !teamMode;
    document.getElementById("wordsTab").hidden = teamMode;
    document.getElementById("teamModeCheck").checked = teamMode;
}