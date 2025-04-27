console.log('Let\'s Write Javascript');
let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/Songs/");
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".m4a")) {
            let songName = element.href.replaceAll("http://127.0.0.1:5500/Songs/", "");
            songName = decodeURIComponent(songName); // <-- decode %20, %21, etc
            songs.push(songName);
        }
    }

    return songs;
}

const playMusic = (track) => {
    currentSong.src = "/Songs/" + track; 
    currentSong.play();
    let playButton = document.getElementById("play"); // Correct the variable reference
    playButton.src = "img/pause.svg"; 
    document.querySelector(".songInfo").innerHTML = track;  // Correct class to match HTML
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

async function main() {
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songList ul");

    for (const song of songs) {
        songUL.innerHTML += `<li>
            <img src="img/music.svg" alt="">
            <div class="info">
                <div>${song}</div>
                <div>AZAN</div>
            </div>
            <div class="playNow">
                <span>Play Now</span>
                <img src="img/play.svg" alt="">
            </div>
        </li>`;
    }

    // Attach event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            // Get the track name from the song item (song name is in the first div inside .info)
            const track = e.querySelector(".info div:first-child").innerHTML.trim(); 
            console.log(track); // Debugging line to check if the track name is correct
            playMusic(track); // Pass the track to playMusic function
        });
    });

    // Attach an event listener to play/pause
    let playButton = document.getElementById("play"); // Ensure the ID is correct
    playButton.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playButton.src = "img/pause.svg"; 
        } else {
            currentSong.pause();
            playButton.src = "img/play.svg";
        }
    });
}

main();
