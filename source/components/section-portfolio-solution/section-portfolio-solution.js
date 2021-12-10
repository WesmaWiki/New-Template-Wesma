import Swiper from "swiper/bundle";

let prototypeSlider = new Swiper(".prototype-slider__container", {
	direction: "vertical",
	slidesPerView: 3,
	spaceBetween: 30,
	loop: true,
	navigation: {
		nextEl: ".portfolio-prototype__next",
	},
});
