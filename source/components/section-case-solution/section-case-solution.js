import hcSticky from "hc-sticky";

var Sticky = new hcSticky(".js-sticky-widget", {
	top: 140,
});

let navSolution = document.querySelectorAll(".js-solution-nav");
let elContentSolution = Array.prototype.slice.call(document.querySelectorAll(".case-solution__info-item"));

if (navSolution.length > 0 && elContentSolution.length > 0) {
	navSolution.forEach((element) => {
		element.addEventListener("click", function (e) {
			let headerHeight = document.querySelector("header") ? document.querySelector("header").clientHeight : 0;

			e.preventDefault();

			let elScroll = document.querySelector(`${element.querySelector("a").getAttribute("href")}`);

			let elScrollDist = elScroll.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;

			window.scrollTo({
				top: elScrollDist,
				behavior: "smooth",
			});
		});
	});

	let timer;

	window.addEventListener("scroll", function () {
		let headerHeight = document.querySelector("header") ? document.querySelector("header").clientHeight : 0;

		elContentSolution.forEach((element, index) => {
			let text = navSolution[index].querySelector(".case-solution__nav-item-text");
			let textWrap = navSolution[index].querySelector(".case-solution__nav-item-text-wrap");

			if (element.getBoundingClientRect().top - headerHeight - 10 < 0 && element.getBoundingClientRect().top - headerHeight + element.clientHeight > 0) {
				if (!navSolution[index].classList.contains("active")) {
					clearTimeout(timer);

					navSolution.forEach((el, i) => {
						if (el.classList.contains("active") && i != index) {
							el.classList.remove("active");
							el.querySelector(".case-solution__nav-item-text").style.height = "0px";
						}
					});

					text.style.height = textWrap.clientHeight + "px";

					timer = setTimeout(() => {
						text.style.height = "initial";
					}, 400);

					navSolution[index].classList.add("active");
				}
			}
		});
	});
}
