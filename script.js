var runsArr = [0, 1, 2, 3, 4, 6, "nb", "wd", "out"];
var timer;
var scoreCard = {
    overs: 0,
    runs: 0,
    bowler: "",
    wickets: 0,
    econ: 0,
    run0: [],
    run4: [],
    run6: [],
    wd: 0,
    nb: 0
}
var ballCount = 0;

function generateRandomNumber() {
    let num = Math.floor((Math.random() * 9));
    console.log(num);
    return num;
}

function bowl() {
    let data = runsArr[generateRandomNumber()];

    switch (data) {
        case 0:
            scoreCard.run0++;
            updateUI("run0", scoreCard.run0);
            break;
        case 4:
            addRuns(data);
            scoreCard.run4++;
            updateUI("run4", scoreCard.run4);
            break;
        case 6:
            addRuns(data);
            scoreCard.run6++;
            updateUI("run6", scoreCard.run6);
            break;
        case "nb":
            addRuns(1);
                scoreCard.nb++;
                updateUI("nb", scoreCard.nb);
            break;
        case "wd":
                addRuns(1);
                scoreCard.wd++;
                updateUI("wd", scoreCard.wd);
            break;
            case "out":
                scoreCard.wickets++;
                updateUI("wickets", scoreCard.wickets);
            break;
        default:
            addRuns(data);
            break;
    }

    if (data != "nb" || data != "wd") addBalls();
}

function addRuns(val) {
    scoreCard.runs = scoreCard.runs + val;
    updateUI("runs", scoreCard.runs);
}

function updateUI(id, val) {
    document.getElementById(id).innerText = val;
}

function addBalls() {
    ballCount++;
    let temp = (ballCount && (ballCount % 6 == 0)) ?  ballCount / 6 : (+(scoreCard.overs + 0.1)).toFixed(1);
    scoreCard.overs = temp;
    updateUI("overs", scoreCard.overs);
}

function startBowling() {
    document.getElementById("btn1").style.display = "none";
    document.getElementById("btn2").style.display = "block";
    document.getElementById("scoreCard").style.display = "flex";
    timer = setInterval(bowl, 1000);
}

function stopBowling() {
    clearInterval(timer);
    document.getElementById("btn1").style.display = "block";
    document.getElementById("btn2").style.display = "none";
}