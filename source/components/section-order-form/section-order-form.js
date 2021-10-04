function activePlaceholder() {
	let arrInputPlaceholder = Array.prototype.slice.call(document.querySelectorAll(".js-placeholder"));

	if (arrInputPlaceholder != null) {
		arrInputPlaceholder.forEach((element) => {
			let type = element.getAttribute('type');
			element.addEventListener("focus", (e) => {
				element.classList.add("active-placeholder");
			});

			element.addEventListener("focusout", (e) => {
				if (element.value.length == 0) {
					element.classList.remove("active-placeholder");
				}
			});

			if (type != null && type == 'tel') {
				element.addEventListener("mouseover", (e) => {
					element.classList.add("active-placeholder");
				});
				element.addEventListener("mouseout", (e) => {
					if (element.value.length == 0 && element !== document.activeElement) {
						element.classList.remove("active-placeholder");
					}
				});
			}
		});
	}
}

export default activePlaceholder;

document.addEventListener(
	"DOMContentLoaded",
	function () {
		activePlaceholder();
	},
	false
);
