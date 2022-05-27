import nouislider from "nouislider";

let elMusic = document.querySelector(".btn-play-music");

if (elMusic != null) {
    let newMusic = new Audio(elMusic.dataset.srcMusic);

    newMusic.volume = 0.1;

    let playMusic = elMusic.querySelector(".btn-play-music__group");

    if (playMusic != null) {
        playMusic.addEventListener("click", event => {

            if (newMusic.paused) {
                newMusic.play();
                elMusic.classList.add("active");
            } else {
                newMusic.pause();
                elMusic.classList.remove("active");
            }
        });
    }

    let volumeBar = elMusic.querySelector(".btn-play-music__volume");

    if (volumeBar != null) {
        let volumeSlider = nouislider.create(volumeBar, {
            direction: 'rtl',
            orientation: 'vertical',
            start: [10],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });

        volumeSlider.on('update', function (values) {
            newMusic.volume = values[0] / 100;
        });
    }

    newMusic.addEventListener("ended", function() {
        elMusic.classList.contains("active")? elMusic.classList.remove("active") : null;
    });
}