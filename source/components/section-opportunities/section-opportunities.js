let clockEl = Array.prototype.slice.call(document.querySelectorAll(".clock-opportunities__item"));
let watchEl = document.querySelector(".clock-opportunities__watch");
let bigWatchArrow = document.querySelector(".clock-opportunities__watch-arrow.--big");

if (watchEl != null) {
	watchEl.style.width = `${watchEl.parentNode.clientWidth / 2}px`;
	watchEl.style.height = `${watchEl.parentNode.clientWidth / 2}px`;

	window.addEventListener("resize", function () {
		watchEl.style.width = `${watchEl.parentNode.clientWidth / 2}px`;
		watchEl.style.height = `${watchEl.parentNode.clientWidth / 2}px`;
	});
}

if (clockEl != null) {
	clockEl.forEach((element, index, array) => {
		let angle = 360 / array.length;
		let currentAngle = angle * index;
		let wrapperWidth = element.parentNode.clientWidth;
		element.style.margin = `${-element.clientHeight / 2}px ${-element.clientWidth / 2}px`;
		element.style.transform = `rotate(${currentAngle}deg) translate(0px, ${-wrapperWidth / 2.37}px) rotate(-${currentAngle}deg)`;

		element.addEventListener("mouseenter", function () {
			if (bigWatchArrow != null) {
				bigWatchArrow.style.transform = `translate(-50%, -90%) rotate(${currentAngle}deg)`;
				array.forEach((el) => {
					el.classList.remove("current");
				});
				element.classList.add("current");
			}
		});
	});

	window.addEventListener("resize", function () {
		clockEl.forEach((element, index, array) => {
			let angle = 360 / array.length;
			let wrapperWidth = element.parentNode.clientWidth;
			element.style.margin = `${-element.clientHeight / 2}px ${-element.clientWidth / 2}px`;
			element.style.transform = `rotate(${angle * index}deg) translate(0px, ${-wrapperWidth / 2.37}px) rotate(-${angle * index}deg)`;
		});
	});
}

let cardOpportunities = Array.prototype.slice.call(document.querySelectorAll(".card-opportunities"));

if (cardOpportunities.length > 0) {
	cardOpportunities.forEach((element) => {
		element.querySelector(".card-opportunities__circle").style.width = `${element.clientHeight + 30}px`;
		element.querySelector(".card-opportunities__circle").style.height = `${element.clientHeight + 30}px`;
	});

	window.addEventListener("resize", function () {
		cardOpportunities.forEach((element) => {
			element.querySelector(".card-opportunities__circle").style.width = `${element.clientHeight + 30}px`;
			element.querySelector(".card-opportunities__circle").style.height = `${element.clientHeight + 30}px`;
		});
	});
}
