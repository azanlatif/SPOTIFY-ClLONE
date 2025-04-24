console.log('Lets Write Javascript');

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/Songs/")
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".m4a")) {
            songs.push(element.href)
        }

    }
    return songs
}

async function main() {
    //Get the List of all Songs
    let songs = await getSongs();
    console.log(songs)

    //play the first song
    var audio = new Audio(songs[2]);
    audio.play();

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        console.log(audio.duration, audio.currentTime);
        
        // The duration variable now holds the duration (in seconds) of the audio clip
      });
}
main()
