let audio = new Audio();
audio.src = "./audio/Resolution - Wayne Jones.mp3"

const playButton = document.getElementById("play");
playButton.addEventListener("click", function() {
    audio.play();
})