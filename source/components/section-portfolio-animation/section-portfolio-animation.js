document.addEventListener(
	"DOMContentLoaded",
	function () {
		let playVideoIcon = document.querySelector(".portfolio-animation__play");
		let videoPrev = document.querySelector(".portfolio-animation__preview");
		let videoEl = document.querySelector(".portfolio-animation__video");

		if (playVideoIcon != null) {
			playVideoIcon.addEventListener("click", function () {
				videoPrev.style.opacity = "0";
				setTimeout(() => {
					videoPrev.style.visibility = "hidden";
					videoEl.play();
				}, 600);
			});
		}
	},
	false
);
