import Parallax from "parallax-js/dist/parallax.min.js";

let arrCardCaseSmall = document.querySelectorAll(".card-case-small");

arrCardCaseSmall.forEach((element) => {
	let elIcon = element.querySelector(".card-case-small__image img");

	let parallaxInstance = new Parallax(element, {
		hoverOnly: true,
		pointerEvents: true,
		selector: ".card-case-small__image img",
	});
});
