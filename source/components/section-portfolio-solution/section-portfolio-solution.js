import Swiper from "swiper/bundle";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let slidesAll = document.querySelectorAll(".prototype-slider__slide");
		let sliderNav = document.querySelector(".portfolio-prototype__arrow");

		if (slidesAll.length > 0) {
			if (slidesAll.length > 3) {
				let prototypeSlider = new Swiper(".prototype-slider__container", {
					direction: "vertical",
					slidesPerView: 3,
					spaceBetween: 30,
					// loop: true,
					watchOverflow: true,
					navigation: {
						nextEl: ".portfolio-prototype__next",
					},
				});
			} else {
				document.querySelector(".prototype-slider__container") ? document.querySelector(".prototype-slider__container").classList.add("--not-active") : null;
				sliderNav ? sliderNav.classList.add("--not-active") : null;
			}
		}
	},
	false
);
