let audio = new Audio();
audio.src = "./audio/Resolution - Wayne Jones.mp3"

const container = document.getElementById("background");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let audioCtx = null;
let audioSource = null;
let analyser = null;
let bufferLength = null;
let dataArray = null;
let barWidth = null;

const playButton = document.getElementById("play");
playButton.addEventListener("click", function() {
    audio.play();
    if (audioCtx === null) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioSource = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 128;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        barWidth = canvas.width / bufferLength;
    }
    animate();
});

const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", function() {
    audio.pause();
    cancelAnimationFrame();
});

function animate() {
    let x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    let barHeight;
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = "white";
        // const red = (i * barHeight) / 10;
        // const green = i * 4;
        // const blue = barHeight / 4 - 12;
        // ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
        ctx.fillRect(canvas.width - x, canvas.height - barHeight, barWidth, barHeight);
    }

    requestAnimationFrame(animate);
}