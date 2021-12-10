import Swiper from "swiper/bundle";
import lightgallery from "lightgallery";

let prototypeSlider = new Swiper(".logo-slider__container", {
	direction: "vertical",
	slidesPerView: 2,
	spaceBetween: 30,
	loop: true,
	navigation: {
		nextEl: ".logo-slider__next",
	},
});

lightgallery(document.querySelector(".logo-slider.lightgallery"), { selector: "a" });
