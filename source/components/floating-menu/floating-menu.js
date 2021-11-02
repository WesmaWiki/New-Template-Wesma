import { match } from "../../js/module/match";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let menu = document.querySelector(".main-menu");

		if (menu != null) {
			let cursorCoord;

			function lockTopMenu() {
				let documentScroll = pageYOffset;
				if (documentScroll > 1) {
					menu.classList.add("locked");
				} else {
					menu.classList.remove("locked");
				}
			}

			function lockTopMenuRightBlock() {
				let documentScroll = pageYOffset;
				if (documentScroll > 1) {
					if (menu.querySelector(".main-menu__right-block-icon").classList.contains("active") && cursorCoord > 300) {
						menu.querySelector(".button-close").beginElement();
						menu.querySelector(".main-menu__right-block-icon") ? menu.querySelector(".main-menu__right-block-icon").classList.remove("active") : null;
					}
					menu.classList.add("locked");
				} else {
					if (!menu.querySelector(".main-menu__right-block-icon").classList.contains("active")) {
						menu.querySelector(".main-menu__right-block-icon") ? menu.querySelector(".main-menu__right-block-icon").classList.add("active") : null;
						menu.querySelector(".button-open").beginElement();
					}
				}
			}

			let timer;

			// function menuEnter() {
			// 	if (!menu.querySelector(".main-menu__right-block-icon").classList.contains("active")) {
			// 		menu.querySelector(".button-open").beginElement();

			// 		timer = setTimeout(() => {
			// 			menu.querySelector(".main-menu__right-block-icon") ? menu.querySelector(".main-menu__right-block-icon").classList.add("active") : null;
			// 		}, 100);
			// 	}
			// }

			// function menuLeave() {
			// 	menu.querySelector(".button-close").beginElement();

			// 	menu.querySelector(".main-menu__right-block-icon") ? menu.querySelector(".main-menu__right-block-icon").classList.remove("active") : null;

			// 	clearTimeout(timer);
			// }

			function showMenu(e) {
				cursorCoord = e.clientX;
				if (cursorCoord < 300) {
					if (!menu.querySelector(".main-menu__right-block-icon").classList.contains("active")) {
						menu.querySelector(".button-open").beginElement();

						menu.querySelector(".main-menu__right-block-icon") ? menu.querySelector(".main-menu__right-block-icon").classList.add("active") : null;
					}
				} else {
					if (menu.querySelector(".main-menu__right-block-icon").classList.contains("active") && !window.pageYOffset == 0) {
						menu.querySelector(".button-close").beginElement();

						menu.querySelector(".main-menu__right-block-icon") ? menu.querySelector(".main-menu__right-block-icon").classList.remove("active") : null;
					}
				}
			}

			function openMenu() {
				if (menu.classList.contains("locked")) {
					menu.classList.remove("locked");
					menu.style.left = "";
				} else {
					menu.classList.add("locked");
					document.querySelector(".js-ham").classList.remove("active");
				}
			}

			function moveMenuRightBlock(e) {
				menu.querySelector(".main-menu__right-block-wrap").style.top = e.clientY + -20 + "px";
			}

			menu.querySelector(".main-menu__right-block").addEventListener("click", openMenu);

			document.querySelector(".js-ham").addEventListener("click", function (e) {
				this.classList.toggle("active");
				openMenu();
			});

			function disableMenu() {
				if (!match[0].matches) {
					if (!document.querySelector(".page-header").classList.contains("main-page")) {
						window.addEventListener("load", lockTopMenuRightBlock);

						document.addEventListener("scroll", lockTopMenuRightBlock);
					} else {
						window.addEventListener("load", lockTopMenu);

						document.addEventListener("scroll", lockTopMenu);
					}

					window.addEventListener("mousemove", showMenu);

					// menu.addEventListener("mouseenter", menuEnter);

					// menu.addEventListener("mouseleave", menuLeave);

					document.addEventListener("mousemove", moveMenuRightBlock);
				} else {
					if (!document.querySelector(".page-header").classList.contains("main-page")) {
						window.removeEventListener("load", lockTopMenuRightBlock);

						document.removeEventListener("scroll", lockTopMenuRightBlock);
					} else {
						window.removeEventListener("load", lockTopMenu);

						document.removeEventListener("scroll", lockTopMenu);
					}

					// menu.removeEventListener("mouseenter", menuEnter);

					// menu.removeEventListener("mouseleave", menuLeave);

					window.removeEventListener("mousemove", showMenu);

					document.removeEventListener("mousemove", moveMenuRightBlock);

					document.querySelector(".button-open").beginElement();

					menu.classList.add("locked");
				}
			}

			disableMenu();
			match[0].addListener(disableMenu);
		}
	},
	false
);
