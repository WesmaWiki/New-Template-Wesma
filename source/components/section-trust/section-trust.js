import Swiper from "swiper/bundle";
// import "swiper/swiper-bundle.css";

export function swiperTrust() {
	let tabTrust = Array.prototype.slice.call(document.querySelectorAll(".section-trust__tab-content"));

	if (tabTrust != null) {
		tabTrust.forEach((element) => {
			let signSlider = new Swiper(element.querySelector(`.section-trust__slider-sign`), {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				navigation: {
					nextEl: ".section-trust__slider-sign .arNext",
					prevEl: ".section-trust__slider-sign .arPrev",
				},
				breakpoints: {
					1230: {
						slidesPerView: 8,
					},
					1150: {
						slidesPerView: 7,
					},
					1050: {
						slidesPerView: 6,
					},
					870: {
						slidesPerView: 5,
					},
					700: {
						slidesPerView: 4,
					},
					550: {
						slidesPerView: 3,
					},
					450: {
						slidesPerView: 2,
					},
				},
			});

			if (element.classList.contains("--only-images")) {
				let trustSlider = new Swiper(element.querySelector(`.section-trust__slider`), {
					slidesPerView: 1,
					spaceBetween: 30,
					observer: true,
					observeParents: true,
					thumbs: {
						swiper: signSlider,
					},
					navigation: {
						nextEl: ".section-trust__tab-content .arrow-btn--next",
						prevEl: ".section-trust__tab-content .arrow-btn--prev",
					},

					breakpoints: {
						1170: {
							slidesPerView: 5,
						},

						768: {
							slidesPerView: 3,
						},

						500: {
							slidesPerView: 2,
						},
					},
				});
			} else {
				let trustSlider = new Swiper(element.querySelector(`.section-trust__slider`), {
					slidesPerView: 1,
					observer: true,
					observeParents: true,
					thumbs: {
						swiper: signSlider,
					},
					navigation: {
						nextEl: ".section-trust__tab-content .arrow-btn--next",
						prevEl: ".section-trust__tab-content .arrow-btn--prev",
					},
				});
			}
		});
	}
}

swiperTrust();
