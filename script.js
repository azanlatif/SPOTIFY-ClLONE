console.log('Let\'s Write Javascript');

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
            songs.push(element.href.replaceAll());
        }
    }

    return songs;
}

async function main() {
    // Get the list of all songs
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songList ul");

    for (const song of songs) {
        songUL.innerHTML += `<li>${song}</li>`; // ✅ Corrected string interpolation
    }

    // Play the third song (if available)
    if (songs.length >= 3) {
        let audio = new Audio(songs[2]);
        audio.play();

        audio.addEventListener("loadeddata", () => {
            console.log("Duration:", audio.duration, "Current Time:", audio.currentTime);
        });
    } else {
        console.warn("Not enough songs to play the third one.");
    }
}

main();
