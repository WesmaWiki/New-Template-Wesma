import Swiper from "swiper/bundle";

// import "swiper/swiper-bundle.css";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let historySlider = new Swiper(".section-history__slider", {
			fadeEffect: { crossFade: true },
			speed: 1000,
			virtualTranslate: true,
			slidersPerView: 1,
			effect: "fade",
			navigation: {
				nextEl: ".section-history__slider .arrow-btn--next",
				prevEl: ".section-history__slider .arrow-btn--prev",
			},

			pagination: {
				el: ".section-history__pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + "</span>";
				},
			},

			on: {
				init: function () {
					let slider = document.querySelector(".section-history__slider");
					if (slider != null) {
						let sliderCurrent = slider.querySelectorAll(".section-history__case span");
						sliderCurrent.forEach((el) => {
							el.textContent = this.activeIndex + 1;
						});
					}
				},

				slideChange: function () {
					let slider = document.querySelector(".section-history__slider");
					if (slider != null) {
						let sliderCurrent = slider.querySelectorAll(".section-history__case span");
						sliderCurrent.forEach((el) => {
							el.textContent = this.activeIndex + 1;
						});
					}
				},
			},
		});
	},
	false
);
