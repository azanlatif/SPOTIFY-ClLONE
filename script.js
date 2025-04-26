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
            songs.push(element.href.replaceAll("http://127.0.0.1:5500/Songs/", ""));
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
        songUL.innerHTML += `<li>
                            <img src="img\music.svg" alt="">
                            <div class="info">
                                <div>${song}</div>
                                <div>AZAN</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img src="img\play.svg" alt="">
                            </div>
                        </li>
        
        </li>`; 
    }

}
main();
