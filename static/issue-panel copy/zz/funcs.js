function randomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function writeToBlock(text) {
    BLOCK.innerHTML += text + "<br>";
}

function parse(v) {
    switch (phase) {
        case "Main Menu":
            if (v == 1) {
                //start game
                goToCourseSelection();
                phase = "Pick Course"
            }
            break;

        case "Pick Course":
            if (v == 1) {
                createCourse(9);
            }
            if (v == 2) {
                createCourse(18);
            }
            if (v == 3) {
                useCourse(0, 9);
            }
            if (v == 4) {
                useCourse(1, 9);
            }
            phase = "Pick Club"
            goToNextHole();
            break;

        case "Pick Club":
            if (v <= 5) {
                club = clubs[v - 1];
                goToShot();
                phase = "Take Shot"
            }
            if (v == "s") {
                currentHole.score = "Skipped";
                goToNextHole();
            }
            break;

        case "Take Shot":
            if (v > 0 && v < club.power + 1) {
                takeShot(v);
            }
            break;

        case "On Shot":
            if (v == 1) {
                if (ballLie == "green") {
                    goToPutt();
                } else {
                    phase = "Pick Club";
                    clearBlock();
                    showHole();
                    writeToBlock("");
                    showClubs();
                }
            }

            break;

        case "Putt":
            if (v > 0 && v < 50) {
                hitPutt(v);
            }
            break;

        case "Hole Out":
            if (v == 1) {
                goToNextHole();
            }
            break;

        case "End":
            goToCourseSelection();
            phase = "Pick Course"
    }
    INP.value = "";
}

function clearBlock() {
    BLOCK.innerHTML = "";
}