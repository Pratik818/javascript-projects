const songs = [
    { name: "Song 1", src: "song1.mp3" },
    { name: "Song 2", src: "song2.mp3" },
    { name: "Song 3", src: "song3.mp3" }
];

let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const songTitle = document.getElementById("song-title");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress");
const timeDisplay = document.getElementById("time");

function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.innerText = songs[index].name;
    audio.load();
}

loadSong(currentIndex);

playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerText = "▶ Play";
    } else {
        audio.play();
        playPauseBtn.innerText = "⏸ Pause";
    }
    isPlaying = !isPlaying;
});

nextBtn.addEventListener("click", () => {
    currentIndex = isShuffle ? Math.floor(Math.random() * songs.length) : (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.innerText = "⏸ Pause";
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.innerText = "⏸ Pause";
});

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.backgroundColor = isShuffle ? "lime" : "";
});

audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    timeDisplay.innerText = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
});

progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

audio.addEventListener("ended", () => {
    nextBtn.click();
});
