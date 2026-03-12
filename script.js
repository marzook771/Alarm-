let alarmTime = "";
let alarmPeriod = "";
let expectedNumber = 1;
let alarmInterval;

function setAlarm() {
    alarmTime = document.getElementById("alarmTime").value;
    alarmPeriod = document.getElementById("ampm").value;

    document.getElementById("status").innerText =
        "Alarm set for " + alarmTime + " " + alarmPeriod;

    checkAlarm();
}

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

function startAlarm() {
    clearInterval(alarmInterval);
    document.getElementById("alarmSound").play();
    document.getElementById("gameBox").style.display = "block";
    createPuzzle();
}

function createPuzzle() {
    let numbers = [1, 2, 3, 4, 5];
    numbers.sort(() => Math.random() - 0.5);

    let container = document.getElementById("puzzleContainer");
    container.innerHTML = "";
    expectedNumber = 1;

    numbers.forEach(num => {
        let btn = document.createElement("button");
        btn.innerText = num;
        btn.className = "puzzleBtn";
        btn.onclick = () => checkPuzzle(num, btn);
        container.appendChild(btn);
    });
}

function checkPuzzle(num, btn) {
    if (num === expectedNumber) {
        btn.disabled = true;
        btn.style.background = "green";
        expectedNumber++;

        if (expectedNumber > 5) {
            stopAlarm();
        }
    } else {
        alert("❌ Wrong order! Restarting puzzle.");
        createPuzzle();
    }
}

function stopAlarm() {
    document.getElementById("alarmSound").pause();
    document.getElementById("gameBox").style.display = "none";
    alert("🎉 Puzzle Solved! Alarm Stopped!");
}
let canClick = true;   // control speed

function checkPuzzle(num, btn) {

    if (!canClick) return;   // stop fast clicking

    if (num === expectedNumber) {

        canClick = false;  // disable clicking temporarily

        btn.disabled = true;
        btn.style.background = "green";
        expectedNumber++;

        // ⏳ 30 SECOND WAIT
        setTimeout(() => {
            canClick = true;  // allow next click after 30 seconds
        }, 30000);   // 🔥 30 seconds

        if (expectedNumber > 5) {
            setTimeout(stopAlarm, 500);
        }

    } else {
        alert("❌ Wrong order! Restarting puzzle.");
        createPuzzle();
    }
}
