import Swiper from "swiper/bundle";

let prototypeSlider = new Swiper(".slider-design__container", {
	slidesPerView: "auto",
	loop: true,
	centeredSlides: 1,
	watchSlidesProgress: 1,
	navigation: {
		nextEl: ".slider-design__next",
		prevEl: ".slider-design__prev",
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
					a = slideElProgress * counter * 50 + "%",
					c = 1 - 0.2 * slideElProgressAbs,
					d = t - Math.abs(Math.round(slideElProgress));
				(slideEl.style.transform = `translateX(${a}) scale(${c})`),
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
