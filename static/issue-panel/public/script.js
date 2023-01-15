const INP = document.getElementById("inp");
const BLOCK = document.getElementById("block");
let phase = "Main Menu";
let currentCourse = [];
let courseName = "";
let currentHole;
let currentHoleNum = -1;
let ballYards = 0;
let ballLie = "fairway";
let strokes = 0;
let clubs = [{
        name: "Driver",
        power: 230,
        accuracy: 20
    },
    {
        name: "Wood",
        power: 200,
        accuracy: 10
    },
    {
        name: "Iron",
        power: 170,
        accuracy: 7
    },
    {
        name: "Wedge",
        power: 100,
        accuracy: 5
    },
    {
        name: "Secret",
        power: 500,
        accuracy: 0
    }
];
club = clubs[0];

document.addEventListener('keydown', function(event) {
    console.log(event.keyCode)
    if (event.keyCode == 13) {
        //enter key
        parse(INP.value);
    }
});

function generateHole() {
    let yards = randomFromRange(260, 600);
    let hazards = [];
    let par = 3;
    if (yards > 260) {
        par = 4
    };
    if (yards > 490) {
        par = 5
    };

    //create hazards
    //create bunker
    let start = Math.floor(randomFromRange(50, (yards - 50)));
    hazards.push({
        type: "Bunker",
        start: start,
        end: start + Math.floor(yards / 20)
    });

    console.log("Bunker at " + start + " yards");

    //create water
    start = Math.floor(randomFromRange(50, (yards - 50)));
    hazards.push({
        type: "Water",
        start: start,
        end: start + Math.floor(yards / 5)
    });

    console.log("Water at " + start + " yards");

    return {
        par: par,
        yards: yards,
        hazards: hazards,
        score: ""
    }
}

function createCourse(x) {
    for (i = 0; i < x; i++) {
        currentCourse.push(generateHole());
    }
    currentHole = currentCourse[0];
    courseName = "Random " + x + "H";
}

function useCourse(x, h) {
    for (i = 0; i < h; i++) {
        currentCourse.push(courses[x].holes[i]);
    }
    currentHole = currentCourse[0];
    courseName = courses[x].name;
}

function goToMainMenu() {
    clearBlock();
    writeToBlock("-- IysuGolf --");
    writeToBlock("");
    writeToBlock("(1) Play");
}

function goToCourseSelection() {
    currentCourse = [];
    currentHoleNum = -1;
    clearBlock();
    writeToBlock("Select Course")
    writeToBlock("");
    writeToBlock("(1) Random (9H)");
    writeToBlock("(2) Twilight (18H)");
    writeToBlock("(3) ArmyNavy G.C. (9H)");
    writeToBlock("(4) Splendido (9H)");
}

function goToNextHole() {
    currentHoleNum++;
    currentHole = currentCourse[currentHoleNum];
    strokes = 0;
    ballYards = 0;
    clearBlock();
    showHole();
    writeToBlock("");
    writeToBlock("Select A Club")
    showClubs();
    phase = "Pick Club";
    ballLie = "fairway";
}

function showHole() {
    writeToBlock("Hole " + (currentCourse.indexOf(currentHole) + 1) + " | Par " + currentHole.par + " (" + currentHole.yards + "y)");
    let t = theClass = "";
    let step = Math.floor(currentHole.yards / 20);
    for (i = 0; i < 20; i++) {
        theClass = "fairway";

        for (j = 0; j < currentHole.hazards.length; j++) {
            if (Math.floor(currentHole.hazards[j].start / step) <= i && Math.floor(currentHole.hazards[j].end / step) >= i) {
                theClass = currentHole.hazards[j].type;

            }
        }

        //ball on green
        if (ballYards >= currentHole.yards - step && ballYards <= currentHole.yards + step && ballYards !== currentHole.yards) {
            ballLie = "green";
        }

        if (Math.floor(ballYards / step) == i) {
            theClass = "ball";
        }

        if (i < step * 17) {
            t += "<span class=" + theClass + "><img src='hit2.png' />_</span>";
        }
    }
    t += "<span class=green>_<span>";
    t += "|";
    t += "<span class=green>_<span>";
    writeToBlock(t);

    // writeToBlock("<span class=grey>|__| = " + Math.floor(currentHole.yards / 10) + "y</span>");
    let chy = currentHole.yards;
    writeToBlock("<span class=grey>|_____|_____|_____|____|</span>");
    writeToBlock("<span class=grey>0y<span class=inv>__</span>" + Math.floor(chy / 4) +
        "y<span class=inv>__</span>" + Math.floor(chy / 4 * 2) + "y<span class=inv>__</span>" + Math.floor(chy / 4 * 3) + "y<span class=inv>_</span>" + chy + "y</span>")
    writeToBlock("");


    writeToBlock("Stroke " + (strokes + 1) + " | Rem. " + Math.abs(currentHole.yards - ballYards) + "y");
}

function determineLie() {
    let step = Math.floor(currentHole.yards / 20);
    for (i = 0; i < 20; i++) {
        for (j = 0; j < currentHole.hazards.length; j++) {
            console.log("Checking hazard: " + currentHole.hazards[j].start + " - " + currentHole.hazards[j].end);

            if (Math.floor(currentHole.hazards[j].start / step) <= i && Math.floor(currentHole.hazards[j].end / step) >= i) {
                console.log("Landed in hazard ")
                //ball landed in hazard
                if (Math.floor(ballYards / step) == i) {
                    ballLie = currentHole.hazards[j].type.toLowerCase();
                }
            }
        }

        //ball on green
        if (ballYards >= currentHole.yards - step && ballYards <= currentHole.yards + step && ballYards !== currentHole.yards) {
            ballLie = "green";
        }
    }
}

function showClubs() {
    writeToBlock("(1) Driver [230y]");
    writeToBlock("(2) Wood [200y]");
    writeToBlock("(3) Iron [170y]");
    writeToBlock("(4) Wedge [100y]");
}

function goToShot() {
    if (ballLie == "water") {
        ballLie = "fairway";
    }
    clearBlock();
    showHole();
    writeToBlock("");
    writeToBlock("How hard (in yards) to hit? | Max. " + club.power + "y");
}

function takeShot(v) {
    phase = "On Shot";
    let variance = Math.floor(Math.random() * club.accuracy);
    if (Math.random() < .5) {
        variance *= -1
    };

    if (ballLie == "bunker" && club !== clubs[3]) {
        variance -= Math.random() * 20;
    };
    if (ballLie == "rough" && club !== clubs[2]) {
        variance -= Math.random() * 20;
    }

    let distance = (parseInt(v) + variance);
    if (distance < 20) {
        distance = 21
    }
    let goal = distance + ballYards;

    let move = setInterval(() => {
        ballYards += Math.floor(distance / 20)
        clearBlock();
        showHole();
        console.log("Goal: " + goal + " | Yards: " + ballYards);

        if (ballYards >= goal) {
            determineLie();
            clearInterval(move);

            clearBlock();
            showHole();

            continueHole(distance);
        }
    }, 100)
}

function continueHole(distance) {
    if (ballLie == "water") {
        //chance for water bounce
        if (Math.random() < 0) {
            //bounce
            ballYards += 60;
            writeToBlock("Water Bounce!");
            determineLie();
        } else {
            ballYards = Math.floor(ballYards -= distance);
            strokes++;
            writeToBlock("In the water!");
        }
    } else if (ballLie == "bunker") {
        writeToBlock("In the bunker!");
    } else if (ballLie == "rough") {
        writeToBlock("In the rough!");
    } else if (ballLie == "green") {
        writeToBlock("On the green!");
    }

    if (ballYards > (currentHole.yards + 20)) {
        ballLie = "water";
        ballYards -= distance;
        strokes++;
        writeToBlock("Out of bounds!");
    } else if (ballYards > currentHole.yards && ballYards < (currentHole.yards + 20)) {
        discrep = ballYards - currentHole.yards;
        ballYards = currentHole.yards - discrep;
    }
    if (ballYards == currentHole.yards) {
        //made the hole
        madeThisHole();
        phase = "Hole Out";
    } else {
        writeToBlock("");
        writeToBlock("(1) Next Shot");
    }

    strokes++;
}

function goToPutt() {
    phase = "Putt";
    clearBlock();
    writeToBlock("Hole " + (currentCourse.indexOf(currentHole) + 1) + " | Par " + currentHole.par + " (" + currentHole.yards + "y)");
    let t = "<span class=green>__</span><span class=ball>_</span>";
    for (i = 0; i < currentHole.yards - ballYards; i++) {

        t += "<span class=green>_</span>";
    }
    writeToBlock(t + "<span class=hole>__</span><span class=green>__</span>");

    writeToBlock("Stroke " + (strokes + 1) + " | Rem. " + Math.abs(currentHole.yards - ballYards) + "y");

    writeToBlock("");
    writeToBlock("How hard (in yards) to hit?");
}

function hitPutt(v) {
    ballYards += parseInt(v);
    goToPutt();

    strokes++;

    if (ballYards >= currentHole.yards) {
        //made the hole
        madeThisHole();
    }
}

function madeThisHole() {
    clearBlock();
    phase = "Hole Out";
    let outcome = "";
    //figure out what it is
    if (strokes == currentHole.par) {
        outcome = "Par";
    }
    if (strokes == currentHole.par - 1) {
        outcome = "Birdie";
    }
    if (strokes == currentHole.par - 2) {
        outcome = "Eagle";
    }
    if (strokes == currentHole.par - 3) {
        outcome = "Albatross";
    }
    if (strokes == currentHole.par - 4) {
        outcome = "Condor";
    }
    if (strokes == 1) {
        outcome = "Hole In One";
    }
    if (strokes > currentHole.par) {
        outcome = strokes - currentHole.par + " over par";
    }

    currentCourse[currentHoleNum].score = outcome;

    writeToBlock("");
    if (ballLie == "green") {
        writeToBlock(outcome + "!");
    } else {
        writeToBlock("Chip-In " + outcome + "!");
    }
    writeToBlock("");
    if (currentCourse.length == currentHoleNum + 1) {
        //end
        end()
    } else {
        writeToBlock("(1) Next Hole");
    }
}

function end() {
    phase = "End";
    clearBlock();
    writeToBlock("Score Card : " + courseName);
    writeToBlock("----------");
    for (i = 0; i < currentCourse.length; i++) {
        writeToBlock("Hole " + (i + 1) + " | Par " + currentCourse[i].par + " - " + currentCourse[i].score);
    }
    writeToBlock("");
    writeToBlock("Enter anything to continue");
}
goToMainMenu();