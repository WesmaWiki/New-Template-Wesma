import { TimelineLite } from "gsap";

let animCard = Array.prototype.slice.call(document.querySelectorAll(".develop__item"));

if (animCard.length > 0) {
	let containerBg = document.querySelector(".develop__background");

	let timerAnimBg;
	let sectAnim = document.querySelector(".develop");
	let intervalAnim;
	let count = animCard.findIndex((item, index, array) => {
		return item.classList.contains("active");
	});

	animCard.forEach((element, index, array) => {
		element.addEventListener("mouseenter", (e) => {
			e.stopPropagation();
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

				count = animCard.findIndex((item, index, array) => {
					return item.classList.contains("active");
				});
			}
		});
	});

	let event = new MouseEvent("mouseenter", {
		view: window,
		bubbles: true,
		cancelable: true,
	});

	animCard[0].dispatchEvent(event);

	function autoMove() {
		animCard[count].dispatchEvent(event);
		if (count >= animCard.length - 1) {
			count = 0;
		} else {
			count++;
		}
	}

	intervalAnim = setInterval(autoMove, 2000);

	if (sectAnim != null) {
		sectAnim.addEventListener("mouseenter", (e) => {
			e.stopPropagation();
			clearInterval(intervalAnim);
		});

		sectAnim.addEventListener("mouseleave", (e) => {
			e.stopPropagation();
			intervalAnim = setInterval(autoMove, 2000);
		});
	}
}
