import { Power4, CSSPlugin, gsap } from "gsap";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		// Анимация вопроса

		function getRandom(min, max) {
			return Math.random() * (max - min) + min;
		}

		let tmaxOptionsGlobal = {
			repeat: 0,
			repeatDelay: 0.65,
			yoyo: true,
		};

		CSSPlugin.useSVGTransformAttr = true;

		let tl = gsap.timeline(tmaxOptionsGlobal);
		let path = ".section-questions__svg path";
		let staggerVal = 0.0125;
		let duration = 0.75;

		let staggerOptsTo = {
			x: 0,
			y: 0,
			opacity: 1,
			scale: 1,
			rotation: 0,
			ease: Power4.easeInOut,
		};

		function resetPosition(path) {
			if (document.querySelectorAll(path) != null) {
				document.querySelectorAll(path).forEach((element, index) => {
					tl.set(element, {
						x: "+=" + getRandom(-500, 500),
						y: "+=" + getRandom(-500, 500),
						rotation: "+=" + getRandom(-720, 720),
						scale: 0,
						opacity: 0,
					});
				});
			}
		}

		tl.timeScale(0.9);

		resetPosition(path);
		tl.to(path, duration, staggerOptsTo, staggerVal);

		document.querySelectorAll(".tab-control").forEach((el) => {
			el.addEventListener("click", () => {
				tl.restart();
			});
		});
	},
	false
);
