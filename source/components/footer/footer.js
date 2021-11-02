import { match } from "../../js/module/match";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let iconTop = document.querySelector(".page-footer__icon-top");

		if (iconTop != null) {
			function moveButtonTop(e) {
				iconTop.style.left = e.clientX + -20 + "px";
			}

			function showButtonTop(e) {
				if (document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight) > 100 && iconTop.classList.contains("open")) {
					iconTop.classList.remove("open");

					iconTop.querySelector(".button-close").beginElement();

					iconTop.querySelector(".page-footer__icon-top-text").style.top = "155px";
				}

				if (document.body.scrollHeight == pageYOffset + document.documentElement.clientHeight) {
					iconTop.classList.add("open");

					setTimeout(() => {
						iconTop.querySelector(".button-open").beginElement();

						iconTop.querySelector(".page-footer__icon-top-text").style.top = "55px";
					}, 300);
				}
			}

			function disableFooterIcon() {
				if (!match[0].matches) {
					window.addEventListener("scroll", showButtonTop);

					document.addEventListener("mousemove", moveButtonTop);
				} else {
					window.removeEventListener("scroll", showButtonTop);

					document.removeEventListener("mousemove", moveButtonTop);

					iconTop.querySelector(".button-open").beginElement();
				}
			}

			disableFooterIcon();
			match[0].addListener(disableFooterIcon);
		}
	},
	false
);
