import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let sliderNumber = new Swiper(".slider-number", {
			slidesPerView: 1,
			autoplay: {
				delay: 2000,
			},
			navigation: {
				nextEl: ".slider-wrapper .arrow-btn--next",
				prevEl: ".slider-wrapper .arrow-btn--prev",
			},
			breakpoints: {
				1600: {
					slidesPerView: 4,
				},
				768: {
					slidesPerView: 3,
				},
				500: {
					slidesPerView: 2,
				},
			},
		});
	},
	false
);
