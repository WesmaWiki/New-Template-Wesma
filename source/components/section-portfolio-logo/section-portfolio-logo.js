import Swiper from "swiper/bundle";
import lightgallery from "lightgallery";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let slidesAll = document.querySelectorAll(".logo-slider__slide");
		let sliderNav = document.querySelector(".logo-slider__arrow");

		if (slidesAll.length > 0) {
			if (slidesAll.length > 2) {
				let prototypeSlider = new Swiper(".logo-slider__container", {
					direction: "vertical",
					slidesPerView: 2,
					spaceBetween: 30,
					// loop: true,
					navigation: {
						nextEl: ".logo-slider__next",
					},
				});
			} else {
				document.querySelector(".logo-slider__container") ? document.querySelector(".logo-slider__container").classList.add("--not-active") : null;
				sliderNav ? sliderNav.classList.add("--not-active") : null;
			}
		}

		lightgallery(document.querySelector(".logo-slider.lightgallery"), { selector: "a" });
	},
	false
);
