import Swiper from "swiper/bundle";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let slidesAll = document.querySelectorAll(".mobile-slider__slide");
		let centerSlideEl = 0;

		if (slidesAll.length > 0) {
			centerSlideEl = Math.floor(slidesAll.length / 2);
		}

		let prototypeSlider = new Swiper(".mobile-slider__container", {
			slidesPerView: "auto",
			// loop: true,
			// loopedSlides: 1,
			watchSlidesProgress: 1,
			centeredSlides: true,
			initialSlide: centerSlideEl,
			navigation: {
				nextEl: ".mobile-slider__next",
				prevEl: ".mobile-slider__prev",
			},
			breakpoints: {
				1170: {
					centeredSlides: false,
				},
			},
			on: {
				progress(swiper) {
					const t = swiper.slides.length;
					for (let r = 0; r < swiper.slides.length; r += 1) {
						const slideEl = swiper.slides[r],
							slideElProgress = swiper.slides[r].progress,
							slideElProgressAbs = Math.abs(slideElProgress);

						let counter = 1;
						slideElProgressAbs > 1 && (counter = 0.3 * (slideElProgressAbs - 1) + 1);
						const l = slideEl.querySelectorAll(".carousel-slider-animate-opacity"),
							c = 1 - 0.1 * slideElProgressAbs,
							a = slideElProgress * counter * (100 * ((1 - c) / 2.5)),
							d = t - Math.abs(Math.round(slideElProgress));
						(slideEl.style.transform = `scale(${c.toFixed(1)}) translateX(${a.toFixed(1)}%) `),
							(slideEl.style.zIndex = d),
							(slideEl.style.opacity = slideElProgressAbs > 3 ? 0 : 1),
							l.forEach((swiper) => {
								swiper.style.opacity = 1 - slideElProgressAbs / 3;
							});
					}
				},
				setTransition(swiper, t) {
					for (let r = 0; r < swiper.slides.length; r += 1) {
						const slideEl = swiper.slides[r],
							slideElProgress = slideEl.querySelectorAll(".carousel-slider-animate-opacity");
						(slideEl.style.transitionDuration = `${t}ms`),
							slideElProgress.forEach((swiper) => {
								swiper.style.transitionDuration = `${t}ms`;
							});
					}
				},
			},
		});
	},
	false
);
