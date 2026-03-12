let alarmTime = "";
let alarmPeriod = "";
let expectedNumber = 1;
let alarmInterval;
let canClick = true;

// SET ALARM
function setAlarm() {
    alarmTime = document.getElementById("alarmTime").value;
    alarmPeriod = document.getElementById("ampm").value;

    document.getElementById("status").innerText =
        "Alarm set for " + alarmTime + " " + alarmPeriod;

    checkAlarm();
}

// CHECK TIME
function checkAlarm() {
    alarmInterval = setInterval(() => {

        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        let currentPeriod = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12;

        let formattedTime =
            String(hours).padStart(2, '0') + ":" +
            String(minutes).padStart(2, '0');

        if (formattedTime === alarmTime && currentPeriod === alarmPeriod) {
            startAlarm();
        }

    }, 1000);
}

// START ALARM
function startAlarm() {
    clearInterval(alarmInterval);

    document.getElementById("alarmSound").play();
    document.getElementById("gameBox").style.display = "block";

    createPuzzle();
}

// CREATE PUZZLE
function createPuzzle() {

    let numbers = [1,2,3,4,5];

    numbers.sort(() => Math.random() - 0.5);

    let container = document.getElementById("puzzleContainer");

    container.innerHTML = "";

    expectedNumber = 1;
    canClick = true;

    numbers.forEach(num => {

        let btn = document.createElement("button");

        btn.innerText = num;
        btn.className = "puzzleBtn";

        btn.onclick = () => checkPuzzle(num, btn);

        container.appendChild(btn);

    });
}

// PUZZLE CHECK WITH 30 SECOND DELAY
function checkPuzzle(num, btn) {

    if (!canClick) return;

    if (num === expectedNumber) {

        canClick = false;

        btn.disabled = true;
        btn.style.background = "green";

        expectedNumber++;

        // WAIT 30 SECONDS BEFORE NEXT CLICK
        setTimeout(() => {
            canClick = true;
        }, 30000);

        if (expectedNumber > 5) {

            setTimeout(stopAlarm, 500);

        }

    } 
    else {

        alert("❌ Wrong order! Restarting puzzle.");

        createPuzzle();

    }
}

// STOP ALARM
function stopAlarm() {

    document.getElementById("alarmSound").pause();

    document.getElementById("gameBox").style.display = "none";

    alert("🎉 Puzzle Solved! Alarm Stopped!");

}
