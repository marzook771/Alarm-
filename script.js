let alarmTime = "";
let alarmPeriod = "";
let expectedNumber = 1;
let alarmInterval;
let canClick = true;
let volumeInterval;

// SET ALARM
function setAlarm() {

    alarmTime = document.getElementById("alarmTime").value;
    alarmPeriod = document.getElementById("ampm").value;

    document.getElementById("status").innerText =
        "Alarm set for " + alarmTime + " " + alarmPeriod;

    checkAlarm();
}


// CHECK CURRENT TIME
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

    let alarm = document.getElementById("alarmSound");

    alarm.volume = 1;
    alarm.play();

    document.getElementById("gameBox").style.display = "block";

    createPuzzle();

    let stopButton = document.getElementById("stopBtn");

    stopButton.style.display = "none";

    // show stop button after 20 seconds
    setTimeout(() => {

        stopButton.style.display = "block";

        // hide after 10 seconds
        setTimeout(() => {

            stopButton.style.display = "none";

        }, 20000);

    }, 20000);


    // FORCE VOLUME TO MAX
    volumeInterval = setInterval(() => {

        if (alarm.volume !== 1) {
            alarm.volume = 1;
        }

    }, 1000);

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


function checkPuzzle(num, btn) {

    if (!canClick) return;

    if (num === expectedNumber) {

        canClick = false;

        btn.disabled = true;
        btn.style.background = "green";

        expectedNumber++;

        // wait 15 seconds before next number
        setTimeout(() => {
            canClick = true;
        }, 15000);

        if (expectedNumber > 5) {

            setTimeout(stopAlarm, 500);

        }

    } 
    else {

        alert("❌ Wrong number! Puzzle restarting from 1.");

        // reset puzzle completely
        expectedNumber = 1;

        createPuzzle();

    }

}


// MANUAL STOP
function manualStop(){

    let alarm = document.getElementById("alarmSound");

    alarm.pause();

    clearInterval(volumeInterval);

    document.getElementById("gameBox").style.display = "none";

    alert("Alarm stopped manually");

}


// STOP ALARM AFTER PUZZLE
function stopAlarm() {

    let alarm = document.getElementById("alarmSound");

    alarm.pause();

    clearInterval(volumeInterval);

    document.getElementById("gameBox").style.display = "none";

    alert("🎉 Puzzle Solved! Alarm Stopped!");

}
