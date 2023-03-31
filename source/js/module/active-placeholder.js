export function activePlaceholder() {
	let arrInputPlaceholder = Array.prototype.slice.call(document.querySelectorAll(".js-placeholder"));

	if (arrInputPlaceholder != null) {
		arrInputPlaceholder.forEach((element) => {
			let type = element.getAttribute("type");
			element.addEventListener("focus", (e) => {
				element.classList.add("active-placeholder");
			});

			element.addEventListener("focusout", (e) => {
				if (element.value.length == 0) {
					element.classList.remove("active-placeholder");
				}
			});

			if (type != null && type == "tel") {
				element.closest(".contact-form__list-input").addEventListener("mouseenter", (e) => {
					element.closest(".contact-form__list-input").classList.add("active-placeholder");
					if (document.querySelector("body").classList.contains("device-apple")) {
						element.focus();
					}
				});
				element.addEventListener("mouseleave", (e) => {
					if (element.value.length == 0 && element !== document.activeElement) {
						element.closest(".contact-form__list-input").classList.remove("active-placeholder");
					}
				});
			}
		});

		document.addEventListener("click", function (e) {
			if (!e.target.closest(".contact-form__list-item")) {
				arrInputPlaceholder.forEach((element) => {
					let type = element.getAttribute("type");
					if (type != null && type == "tel") {
						if (element.value.length == 0) {
							element.closest(".contact-form__list-input").classList.remove("active-placeholder");
						}
					}
				});
			}
		});
	}
}
