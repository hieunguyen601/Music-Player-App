const playlists = [{
    title: 'Darling, he lied',
    artist: 'Bixby, starfall',
    song: './musics/music1.mp3',
    photo: './images/photo1.jpg'
}, {
    title: 'Forever',
    artist: 'Keshi',
    song: './musics/music2.mp3',
    photo: './images/photo2.jpg'
}, {
    title: 'Puzzle',
    artist: 'Chan, homezone',
    song: './musics/music3.mp3',
    photo: './images/photo3.jpg'
}];

const audio = document.querySelector('.songs');
const playButton = document.querySelector('.play');
const progress = document.querySelector('.track-progress');
const currentTimeSong = document.querySelector('.current-time');
const durationSong = document.querySelector('.duration');
const prevSong = document.querySelector('.prev')
const nextSong = document.querySelector('.next');
const songImage = document.querySelector('.song-image');
const songTitle = document.querySelector('.song-title');
const songArtists = document.querySelector('.artists');

let isPlaying = false;
let currentSongIndex = 0;

function loadSong(index){
    const music = playlists[index];
    audio.src = music.song;
    songImage.src = music.photo;
    songTitle.innerHTML = music.title;
    songArtists.innerHTML = music.artist;
}

playButton.addEventListener('click', ()  => {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = "&#9654;";
    } else {
        audio.play();
        playButton.innerHTML = "&#10074;&#10074;"
    }
    isPlaying = !isPlaying;
})

audio.addEventListener('loadedmetadata', () => {
    durationSong.textContent = formatTime(audio.duration);
    progress.max = audio.duration;
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
    currentTimeSong.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
});

prevSong.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1) % playlists.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
});

nextSong.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlists.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
});


function formatTime(time) {
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}