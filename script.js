let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
const timeDisplay = document.getElementById("time-display");
const startStopBtn = document.getElementById("start-stop-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsList = document.getElementById("laps-list");

// Start or Stop the stopwatch
startStopBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000 / 60);
        startStopBtn.textContent = "Stop";
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timer);
        startStopBtn.textContent = "Start";
        isRunning = false;
        lapBtn.disabled = true;
    }
});

// Reset the stopwatch
resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00";
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
    lapsList.innerHTML = "";
});

// Record Lap Time
lapBtn.addEventListener("click", () => {
    const lapTime = timeDisplay.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(li);
});

// Update the stopwatch display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    timeDisplay.textContent = formattedTime;
}

// Format time in HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}
