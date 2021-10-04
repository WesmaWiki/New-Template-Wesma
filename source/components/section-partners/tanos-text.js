document.addEventListener(
	"DOMContentLoaded",
	function () {
		let arrText = Array.prototype.slice.call(document.querySelectorAll(".section-partners__text"));

		if (arrText.length > 0) {
			arrText.forEach((element) => {
				let container = element;

				let wordGreen = element.dataset.green ? element.dataset.green.split(/\s+/) : [];

				let arr = container.innerHTML.split(/\s+/);

				let str = "";

				for (let i = 0; i < arr.length; i++) {
					if (arr[i]) {
						if (wordGreen.indexOf(arr[i]) != -1) {
							arr[i] = "<span class='green'>" + arr[i] + "</span>";
						} else {
							arr[i] = "<span>" + arr[i] + "</span>";
						}
					}
				}

				container.innerHTML = arr.join(" ");
			});

			document.querySelector(".section-partners__wrap-list").addEventListener("click", () => {
				document.querySelector(".section-partners__canvas-text").classList.add("hidden");

				arrText.forEach((element) => {
					let arrWord = Array.prototype.slice.call(element.querySelectorAll("span"));

					arrWord.forEach((el, i) => {
						el.style.transition = `all 1.5s ease-out ${i / 36}s`;

						setTimeout(() => {
							let angle = (Math.random() + 0.5) * 2 * Math.PI;

							el.style.transform = `rotate(${15 * Math.random() - 0.5}deg) translate(${60 * Math.cos(angle)}px, ${60 * Math.sin(angle)}px)`;
							el.style.opacity = "0";
						});
					});
				});
			});
		}
	},
	false
);
