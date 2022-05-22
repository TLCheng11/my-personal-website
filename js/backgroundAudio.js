// Link background music
let audio = new Audio();
audio.src = "./audio/Resolution - Wayne Jones.mp3"

// Setup background
const container = document.getElementById("background");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Setup audio visualizer variables
let audioCtx = null;
let audioSource = null;
let analyser = null;
let bufferLength = null;
let dataArray = null;
let barWidth = null;

// Initialize website entry effect and audio visualizer
const clickMe = document.getElementById("click_me");
clickMe.addEventListener("click", function() {
    document.getElementById("entrance").style.opacity = "0";
    clickMe.style.opacity = "0";
    setTimeout(function() {
        document.getElementById("entrance").style.zIndex = "-3";
        clickMe.style.zIndex = "-3";
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
    }, 2000);
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

// continue playing background music
const playButton = document.getElementById("play");
playButton.addEventListener("click", function() {
    audio.play();
    animate();
});

// pause background music
const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", function() {
    audio.pause();
    cancelAnimationFrame();
});

