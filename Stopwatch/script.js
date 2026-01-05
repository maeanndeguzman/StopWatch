const display = document.getElementById("display");
const historyList = document.getElementById("history");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let startTime = 0;
let elapsedTime = 0;
let running = false;
let rafId = null;

/* Format time as MM:SS.HH (hundredths) */
function formatTime(ms) {
    const totalHundredths = Math.floor(ms / 10);
    const minutes = Math.floor(totalHundredths / 6000);
    const seconds = Math.floor((totalHundredths % 6000) / 100);
    const hundredths = totalHundredths % 100;

    return (
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(hundredths).padStart(2, "0")
    );
}

/* Phone-style animation loop */
function tick(timestamp) {
    if (!running) return;

    elapsedTime = timestamp - startTime;
    display.textContent = formatTime(elapsedTime);

    rafId = requestAnimationFrame(tick);
}

/* Start / Resume */
startBtn.addEventListener("click", () => {
    if (running) return;

    running = true;
    startTime = performance.now() - elapsedTime;
    rafId = requestAnimationFrame(tick);
});

/* Pause */
pauseBtn.addEventListener("click", () => {
    if (!running) return;

    running = false;
    cancelAnimationFrame(rafId);

    const li = document.createElement("li");
    li.textContent = formatTime(elapsedTime);
    historyList.prepend(li);
});

/* Reset */
resetBtn.addEventListener("click", () => {
    running = false;
    cancelAnimationFrame(rafId);

    elapsedTime = 0;
    display.textContent = "00:00.00";
    historyList.innerHTML = "";
});
