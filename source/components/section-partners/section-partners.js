import anim3d from "./3danim";
import tanosText from "./tanos-text";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let buttonReload = document.querySelectorAll(".js-reload");

		if (buttonReload != null) {
			buttonReload.forEach((button) => {
				button.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();

					document.querySelector(".section-partners__canvas-text").classList.remove("hidden");

					let arrText = Array.prototype.slice.call(document.querySelectorAll(".section-partners__text"));

					arrText.forEach((element) => {
						let arrWord = Array.prototype.slice.call(element.querySelectorAll("span"));

						arrWord.forEach((el) => {
							el.style.opacity = "1";
							el.style.transform = "rotate(0) translate(0px ,0px)";
						});
					});
				});
			});
		}

		let achorBlock = document.querySelector(".section-partners__anchor");

		if (achorBlock != null) {
			achorBlock.addEventListener("click", (e) => {
				e.stopPropagation();
				let element = e.target,
					scrollAnim = element.getAttribute('data-scroll-to-anim'),
					scrollAnimParent = element.closest('[data-scroll-to-anim]');
				if (scrollAnim != null || scrollAnimParent != null) {
					scrollAnim = scrollAnim != null ? scrollAnim : scrollAnimParent;
					console.log(document.body.querySelector(scrollAnim));
					let scrollAnimTo = scrollAnim != '' && (scrollAnim[0] == '.' || scrollAnim[0] == '#' || scrollAnim[0] == '[') ? document.body.querySelector(scrollAnim) : null,
						scrollAnimToPx = scrollAnimTo != null ? scrollAnimTo.getBoundingClientRect().top + window.pageYOffset : 0;
					window.scrollTo({
						top: scrollAnimToPx,
						behavior: "smooth",
					});
				}
			});
		}
	},
	false
);
