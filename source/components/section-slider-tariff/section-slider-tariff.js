import Swiper from "swiper/bundle";
import "../section-develop-site/hover-card";

let signSlider = new Swiper(".slider-tariff__container", {
	slidesPerView: 1,
	spaceBetween: 30,
	observer: true,
	observeParents: true,
	watchOverflow: true,
	navigation: {
		nextEl: ".slider-tariff__next",
		prevEl: ".slider-tariff__prev",
	},
	breakpoints: {
		1170: {
			slidesPerView: "auto",
			spaceBetween: 50,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
	},
});
