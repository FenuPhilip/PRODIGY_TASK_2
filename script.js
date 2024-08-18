let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

const setTimerBtn = document.getElementById('setTimerBtn');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);
    
    return (
        (hours ? (hours < 10 ? '0' + hours : hours) + ':' : '') +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + ':' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds)
    );
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
    startStopBtn.textContent = 'Pause';
    isRunning = true;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    elapsedTime = 0;
    laps.innerHTML = '';
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        laps.appendChild(lapElement);
    }
}

function setTimer() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    const timerDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (timerDuration > 0) {
        startStopwatch();
        setTimeout(function() {
            stopStopwatch();
            alert('Timer has ended!');
        }, timerDuration);
    } else {
        alert('Please set a valid timer duration.');
    }
}

startStopBtn.addEventListener('click', function () {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
setTimerBtn.addEventListener('click', setTimer);
