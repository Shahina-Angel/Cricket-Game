(function (){
    var runsArr = [0,1,2,3,4,6, "nb", "wb", "out"];
    var overs = 0;
    var score = 0;
    var timer;

    function bowl() {
        console.log("enter")
        let ind = Math.floor((Math.random() * 9));
        if (ind !== 6 && ind !== 7 && ind !== 8) {

        } else {
            score = score + runsArr[ind];
            document.getElementById("score").innerText = score;
        }
    }

    timer = setInterval(bowl, 1000);

})();