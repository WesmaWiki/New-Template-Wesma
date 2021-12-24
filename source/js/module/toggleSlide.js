export function slideToggleJs(maxHeight, duration) {
	let sectionSlide = Array.prototype.slice.call(document.querySelectorAll(".js-section-slide"));
	if (sectionSlide.length > 0) {
		sectionSlide.forEach((element) => {
			let slideWrap = element.querySelector(".js-wrap-slide");
			let slideList = element.querySelector(".js-list-slide");
			let buttonAll = element.querySelector(".js-button-slide-all");
			let textMove = element.querySelector("[data-text-show]");
			let textInitial;
			let textShow;
			if (textMove != null) {
				textInitial = textMove.textContent;
				textShow = textMove.dataset.textShow;
			}

			if (slideWrap != null && slideList != null && buttonAll != null) {
				slideWrap.style.overflow = "hidden";
				slideWrap.style.maxHeight = maxHeight + "px";
				slideWrap.style.transition = `all ${duration / 1000}s ease`;

				buttonAll.addEventListener("click", function (e) {
					e.preventDefault();

					if (slideWrap.classList.contains("--show")) {
						slideWrap.style.maxHeight = slideList.clientHeight + "px";

						setTimeout(() => {
							slideWrap.style.maxHeight = maxHeight + "px";
						}, 0);

						slideWrap.classList.remove("--show");

						if (textMove != null & textInitial != null) {
							textMove.textContent = textInitial;
						}

					} else {
						slideWrap.classList.add("--show");
						slideWrap.style.maxHeight = slideList.clientHeight + "px";

						setTimeout(() => {
							slideWrap.style.removeProperty("max-height");
						}, duration + 10);

						if (textMove != null && textShow != null) {
							textMove.textContent = textShow;
						}
					}
				});
			}
		});
	}
}
