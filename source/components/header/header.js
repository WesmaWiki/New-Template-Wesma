document.addEventListener(
	"DOMContentLoaded",
	function () {
		let elHeader = document.querySelector(".page-header ");

		if (elHeader != null) {
			if (window.pageYOffset > 0) {
				elHeader.classList.add("--fixed");
			} else {
				elHeader.classList.remove("--fixed");
			}

			document.addEventListener("scroll", function () {
				if (window.pageYOffset > 0) {
					elHeader.classList.add("--fixed");
				} else {
					elHeader.classList.remove("--fixed");
				}
			});
		}
	},
	false
);
