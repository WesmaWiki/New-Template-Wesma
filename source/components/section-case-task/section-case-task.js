import Swiper from "swiper/bundle";

let slidersCase = document.querySelectorAll(".slider-case");

slidersCase.forEach((element) => {
	let itemSlider = element.querySelector(".slider-case-task");
	let wrapNav = element.querySelector(".slider-case__arrows");
	let sliderPag = element.querySelector(".slider-case__pagination");
	let arrowPrev = element.querySelector(".slider-case__prev");
	let arrowNext = element.querySelector(".slider-case__next");

	let sliderCaseTask = new Swiper(itemSlider, {
		slidesPerView: 1,
		direction: "vertical",
		speed: 1000,
		watchOverflow: true,
		edgeSwipeDetection: "prevent",
		touchReleaseOnEdges: true,
		mousewheel: {
			releaseOnEdges: true,
		},
		navigation: {
			nextEl: arrowNext,
			prevEl: arrowPrev,
		},
		pagination: {
			el: sliderPag,
			type: "bullets",
			clickable: true,
		},

		on: {
			slideChangeTransitionStart: function (swiper) {
				wrapNav ? wrapNav.classList.add("anim") : null;
			},

			slideChangeTransitionEnd: function (swiper) {
				wrapNav ? wrapNav.classList.remove("anim") : null;
			},
		},
	});
});
