(() => {
    const progressBar = document.getElementById("seek-bar");
    const playBtn = document.getElementById("play-pause")
    const currentSong = document.querySelector("audio");
    const currentTime = document.getElementById("current-time");
    const fullTime = document.getElementById("full-time");
    const coverImg = document.getElementById("cover");

    let repeatBtn = document.getElementById("repeat");

    function updateProgress() {
        const tempSliderValue = progressBar.value; 
        
        // must be percentage cuz css use percentage to identify the transition/gradient/animation progress
        const progress = (tempSliderValue / progressBar.max) * 100;
       
        progressBar.style.background = `linear-gradient(to right, #000 ${progress}%, #d9d9d9 ${progress}%)`;
    }

    function playPause() {
        if (currentSong.paused) {
            currentSong.play();
            playBtn.className = "pause";
            coverImg.className = "music-cover-play";
        }
        else {
            currentSong.pause();
            playBtn.className = "play";
            coverImg.className = "music-cover";
        }
    }

    function repeatToggle() {
        if (repeatBtn.className == "no-repeat") {
            repeatBtn.className = "repeat";
        }
        else {
            repeatBtn.className = "no-repeat";
        }
    }

    function getDuration(time) {
        const minutes = Math.floor(time / 60 % 60).toString();
        const seconds = Math.floor(time % 60).toString().padStart(2,'0');

        return `${minutes}:${seconds}`
    }

    function updateTime() {
        currentTime.innerHTML = getDuration(currentSong.currentTime);
        progressBar.value = currentSong.currentTime;
    }

    function updatePlayer() {
        fullTime.innerHTML = getDuration(currentSong.duration);
        progressBar.max = currentSong.duration;
    }

    function updateSongProgress() {
        currentSong.currentTime = progressBar.value;
    }

    function updateSongEnd() {
        currentSong.currentTime = 0;
        if (repeatBtn.className == "repeat") {
            currentSong.play();
            coverImg.className = "music-cover-play";
        }
        else {
            playBtn.className = "play";
            coverImg.className = "music-cover";
        }
    }

    function run() {
        progressBar.addEventListener("input", updateProgress);
        progressBar.addEventListener("input", updateSongProgress);
        playBtn.addEventListener("click", playPause);
        currentSong.addEventListener("timeupdate", updateTime);
        currentSong.addEventListener("timeupdate", updateProgress);
        currentSong.addEventListener("loadeddata", updatePlayer);
        progressBar.addEventListener("input", updateSongProgress);
        currentSong.addEventListener("ended", updateSongEnd);
        repeatBtn.addEventListener("click", repeatToggle);
    }

    run();
})();