import Swiper from "swiper/bundle";

let signSlider = new Swiper(".service-optimization__slider", {
	slidesPerView: 1,
	spaceBetween: 30,
	observer: true,
	observeParents: true,
	navigation: {
		nextEl: ".service-optimization__next",
		prevEl: ".service-optimization__prev",
	},
	breakpoints: {
		768: {
			slidesPerView: "auto",
			spaceBetween: 50,
		},
	},
});
