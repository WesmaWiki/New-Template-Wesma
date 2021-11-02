import Swiper from "swiper/bundle";
// import "swiper/swiper-bundle.css";
import lightgallery from "lightgallery";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		lightgallery(document.querySelector(".lightgallery"), { selector: "a" });

		let certificatSlider = new Swiper(".section-certificate__slider", {
			slidesPerView: 1,
			spaceBetween: 15,
			navigation: {
				nextEl: ".section-certificate__container .arrow-btn--next",
				prevEl: ".section-certificate__container .arrow-btn--prev",
			},
			breakpoints: {
				1300: {
					slidesPerView: 5,
					spaceBetween: 100,
				},

				1170: {
					slidesPerView: 4,
					spaceBetween: 70,
				},

				768: {
					slidesPerView: 3,
					spaceBetween: 50,
				},

				600: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},
		});
	},
	false
);
