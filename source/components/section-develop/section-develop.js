import { TimelineLite } from "gsap";

let animCard = Array.prototype.slice.call(document.querySelectorAll(".develop__item"));

if (animCard.length > 0) {
	let containerBg = document.querySelector(".develop__background");

	var timerAnimBg;

	animCard.forEach((element, index, array) => {
		element.addEventListener("mouseenter", (e) => {
			if (!e.target.classList.contains("active")) {
				clearTimeout(timerAnimBg);

				animCard.forEach((el) => {
					el.classList.remove("active");
				});

				var timeline = new TimelineLite();

				timeline
					.to(containerBg, {
						duration: 0.5,
						opacity: "0",
						scale: 0.98,
						onComplete: () => {
							containerBg.style.background = `URL("${e.target.dataset.image}") no-repeat center / cover`;
						},
					})
					.to(containerBg, {
						duration: 0.8,
						opacity: "1",
						scale: 1,
					});

				e.target.classList.add("active");

				// containerBg.style.animation = "0.3s ease 0s  animOpacity-1, 0.3s ease animScale-1";

				// timerAnimBg = setTimeout(() => {
				// 	containerBg.style.background = `URL("${e.target.dataset.image}") no-repeat center / cover`;
				// 	containerBg.style.animation = "0.3s ease 0s animOpacity-2, 1.5s ease animScale-2";
				// }, 200);
			}
		});
	});

	let event = new MouseEvent("mouseenter", {
		view: window,
		bubbles: true,
		cancelable: true,
	});

	animCard[0].dispatchEvent(event);
}
