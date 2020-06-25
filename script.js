var runsArr = [0, 1, 2, 3, 4, 6, "nb", "wd", "out"];
var timer = null;
var scoreCard = {
  overs: 0,
  runs: 0,
  bowler: "",
  wickets: 0,
  econ: 0,
  run0: 0,
  run4: 0,
  run6: 0,
  wd: 0,
  nb: 0,
};
var ballCount = 0;

var teamA = {};
var teamB = {};

var bowlerInd = 10;
var batsmanIndex = 0;

createPlayes("teamA", teamAPlayers);
createPlayes("teamB", teamBPlayers);

document.getElementById("bname").innerText =
  teamA.runs == undefined
    ? teamBPlayers[bowlerInd].name
    : teamAPlayers[bowlerInd].name;

function createPlayes(id, arr) {
  let divcon = document.getElementById(id);
  let ul = document.createElement("ul");
  for (var i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    li.innerText = arr[i].name;
    ul.append(li);
  }
  divcon.append(ul);
}

function startBowling() {
  document.getElementById("btn1").style.display = "none";
  document.getElementById("btn2").style.display = "block";
  document.getElementById("scoreCard").style.display = "flex";
  document.getElementById("msg1").style.display = "block";
  document.getElementById("msg1").innerText =
    teamA.runs == undefined ? "India Batting" : "Australia Batting";
  document.getElementById("teamcon").style.display = "none";
  document.getElementById("inningsResult").style.display = "none";
  timer = setInterval(bowl, 1000);
}

function stopBowling() {
  clearInterval(timer);
  timer = null;
  document.getElementById("btn1").style.display = "block";
  document.getElementById("btn2").style.display = "none";
  document.getElementById("msg1").innerText = "Drinks Break!!";
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 9);
}

function bowl() {
  if (timer == null) return;
  let data = runsArr[generateRandomNumber()];

  switch (data) {
    case 0:
      scoreCard.run0++;
      break;
    case 4:
      addRuns(data);
      scoreCard.run4++;
      updateUI("run4", scoreCard.run4);
      updatePlayerScore("run4", data);
      break;
    case 6:
      addRuns(data);
      scoreCard.run6++;
      updateUI("run6", scoreCard.run6);
      updatePlayerScore("run6", data);
      break;
    case "nb":
      addRuns(1);
      scoreCard.nb++;
      updateUI("nb", scoreCard.nb);
      updatePlayerScore("nb", data);
      break;
    case "wd":
      addRuns(1);
      scoreCard.wd++;
      updateUI("wd", scoreCard.wd);
      updatePlayerScore("wd", data);
      break;
    case "out":
      scoreCard.wickets++;
      updateUI("wickets", scoreCard.wickets);
      updatePlayerScore("out", document.getElementById("bname").innerText);
      batsmanIndex++;
      if (scoreCard.wickets == 10) {
        updatePlayerScore("overs", 0);
        endInnings();
      }
      break;
    default:
      addRuns(data);
      updatePlayerScore("runs", data);
      break;
  }

  if (data != "nb" || data != "wd") addBalls();
}

function addRuns(val) {
  scoreCard.runs = scoreCard.runs + val;
  if (teamA.runs && teamA.runs < scoreCard.runs) endInnings();
  updateUI("runs", scoreCard.runs);
}

function updateUI(id, val) {
  document.getElementById(id).innerText = val;
}

function addBalls() {
  if (timer == null) {
    return;
  }

  ballCount++;
  let temp =
    ballCount && ballCount % 6 == 0
      ? ballCount / 6
      : (scoreCard.overs + 0.1).toFixed(1);

  scoreCard.overs = +temp;

  updateUI("overs", scoreCard.overs);

  if (scoreCard.overs % 4 == 0) {
    updatePlayerScore("overs", 4);
    bowlerInd--;
    document.getElementById("bname").innerText =
      teamA.runs == undefined
        ? teamBPlayers[bowlerInd].name
        : teamAPlayers[bowlerInd].name;
  }
  if (scoreCard.overs == 20) endInnings();
}

function updatePlayerScore(type, val) {
  let batsmen = teamA.runs == undefined ? teamAPlayers : teamBPlayers;
  let bowlers = teamA.runs == undefined ? teamBPlayers : teamAPlayers;

  switch (type) {
    case "run4":
      batsmen[batsmanIndex]["runs"] = batsmen[batsmanIndex]["runs"] + val;
      bowlers[bowlerInd]["bruns"] = bowlers[bowlerInd]["bruns"] + val;
      batsmen[batsmanIndex][type]++;
      bowlers[bowlerInd]["brun4"]++;
      break;
    case "run6":
      batsmen[batsmanIndex]["runs"] = batsmen[batsmanIndex]["runs"] + val;
      bowlers[bowlerInd]["bruns"] = bowlers[bowlerInd]["bruns"] + val;
      batsmen[batsmanIndex][type]++;
      bowlers[bowlerInd]["brun6"]++;
      break;
    case "runs":
      batsmen[batsmanIndex]["runs"] = batsmen[batsmanIndex]["runs"] + val;
      bowlers[bowlerInd]["bruns"] = bowlers[bowlerInd]["bruns"] + val;
      break;
    case "overs":
      bowlers[bowlerInd]["bovers"] =
        val == 4
          ? val
          : calculateOvers(
              teamA.runs == undefined ? teamBPlayers : teamAPlayers,
              "bovers"
            );
      break;
    case "out":
      batsmen[batsmanIndex]["wicketBy"] = val;
      batsmen[batsmanIndex]["overs"] =
        batsmanIndex == 0
          ? scoreCard.overs
          : calculateOvers(
              teamA.runs == undefined ? teamAPlayers : teamBPlayers,
              "overs"
            );
      bowlers[bowlerInd]["bwickets"]++;
      break;
    case "nb":
      bowlers[bowlerInd]["nb"]++;
      batsmen[batsmanIndex]["runs"]++;
      bowlers[bowlerInd]["bruns"]++;
      break;
    case "wd":
      bowlers[bowlerInd]["wd"]++;
      batsmen[batsmanIndex]["runs"]++;
      bowlers[bowlerInd]["bruns"]++;
      break;
    default:
      break;
  }
}

function createHeader(temp) {
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");

  for (var j = 0; j < temp.length; j++) {
    let th = document.createElement("th");
    th.innerText = temp[j];
    tr.append(th);
  }

  thead.append(tr);
  return thead;
}

function displayBattingScoreCard(arr, msg) {
  let temp = ["Batsmen Name", "Runs", "Overs", "4s", "6s", "Wicket By"];
  let temp2 = ["name", "runs", "overs", "run4", "run6", "wicketBy"];

  let cont = document.getElementById("batting");

  let div = document.createElement("div");
  div.innerText = msg;
  div.className = "msgCls";
  cont.append(div);

  let tble = document.createElement("table");
  tble.id = "cricket";

  let tbody = document.createElement("tbody");

  for (var i = 0; i < arr.length; i++) {
    let tr = document.createElement("tr");
    for (var k = 0; k < temp2.length; k++) {
      let td = document.createElement("td");
      td.innerText = arr[i][temp2[k]];
      tr.append(td);
    }
    tbody.append(tr);
  }

  tble.append(createHeader(temp));
  tble.append(tbody);

  cont.append(tble);
}

function displayBowlingScoreCard(arr2, msg) {
  let temp = [
    "Bowler Name",
    "Overs",
    "Wickets",
    "Runs",
    "4s",
    "6s",
    "NB",
    "WD",
  ];
  let temp2 = [
    "name",
    "bovers",
    "bwickets",
    "bruns",
    "brun4",
    "brun6",
    "nb",
    "wd",
  ];

  let cont = document.getElementById("bowling");

  let div = document.createElement("div");
  div.innerText = msg;
  div.className = "msgCls";
  cont.append(div);

  let tble = document.createElement("table");

  let tbody = document.createElement("tbody");
  tble.id = "cricket";

  for (var i = 10; i >= 0; i--) {
    if (arr2[i].bovers == 0) continue;
    let tr = document.createElement("tr");
    for (var k = 0; k < temp2.length; k++) {
      let td = document.createElement("td");
      td.innerText = arr2[i][temp2[k]];
      tr.append(td);
    }
    tbody.append(tr);
  }

  tble.append(createHeader(temp));
  tble.append(tbody);

  cont.append(tble);
}

function calculateOvers(arr, key) {
  let temp = arr.reduce((sum, elm) => sum + elm[key], 0);
  let temp2 = (scoreCard.overs - temp).toFixed(1);
  return +temp2;
}

function endInnings() {
  stopBowling();
  document.getElementById("teamAResults").style.display = "block";
  document.getElementById("targetB").innerText = scoreCard.runs + 1;
  document.getElementById("inningsResult").style.display = "block";
  if (teamA.runs == undefined) {
    document.getElementById("scoreA").innerText =
      scoreCard.runs + "/" + scoreCard.wickets + ", Overs " + scoreCard.overs;
    teamA.runs = scoreCard.runs;
    teamA.wickets = scoreCard.wickets;
    teamA.overs = scoreCard.overs;
    displayBattingScoreCard(teamAPlayers, "India Batting");
    displayBowlingScoreCard(teamBPlayers, "Australia Bowling");
  } else {
    debugger;
    teamB.runs = scoreCard.runs;
    teamB.wickets = scoreCard.wickets;
    teamB.overs = scoreCard.overs;
    document.getElementById("btn1").style.display = "none";
    document.getElementById("btn2").style.display = "none";
    document.getElementById("scoreCard").style.display = "none";
    document.getElementById("scoreB").innerText =
      scoreCard.runs + "/" + scoreCard.wickets + ", Overs " + scoreCard.overs;

    let temp = document.getElementById("msg1");
    temp.className = "msgCls";
    if (teamA.runs == teamB.runs) {
      temp.innerText = "Tie Match";
    } else {
      teamA.runs > teamB.runs
        ? temp.innerText = "India won the Match"
        : temp.innerText = "Australia won the Match";
    }

    displayBattingScoreCard(teamBPlayers, "Australia Batting");
    displayBowlingScoreCard(teamAPlayers, "India Bowling");
  }

  refreshPage();
}

function refreshPage() {
  scoreCard = {
    overs: 0,
    runs: 0,
    bowler: "",
    wickets: 0,
    econ: 0,
    run0: 0,
    run4: 0,
    run6: 0,
    wd: 0,
    nb: 0,
  };
  ballCount = 0;
  bowlerInd = 10;
  batsmanIndex = 0;
  document.getElementById("runs").innerText = 0;
  document.getElementById("wickets").innerText = 0;
  document.getElementById("run4").innerText = 0;
  document.getElementById("run6").innerText = 0;
  document.getElementById("bname").innerText = teamAPlayers[bowlerInd].name;
  document.getElementById("overs").innerText = 0;
  document.getElementById("wd").innerText = 0;
  document.getElementById("nb").innerText = 0;
}
