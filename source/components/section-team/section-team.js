// document.onmouseover = document.onmouseout = handler;

// let timerAnim = 800;
// let interval;

// function handler(e) {
// 	if (e.target.closest(".section-team__image")) {
// 		let seriouslyImg = e.target.dataset.seriouslyImg;
// 		let smilyImg = e.target.dataset.smilyImg;

// 		if (e.type == "mouseover") {
// 			clearInterval(interval);

// 			if (timerAnim >= 800) {
// 				timerAnim = 0;

// 				seriouslyImg ? (e.target.style.backgroundImage = `url(${seriouslyImg})`) : null;

// 				interval = setInterval(() => {
// 					timerAnim = timerAnim + 100;
// 				}, 100);
// 			} else {
// 				interval = setTimeout(() => {
// 					timerAnim = 0;

// 					seriouslyImg ? (e.target.style.backgroundImage = `url(${seriouslyImg})`) : null;

// 					interval = setInterval(() => {
// 						timerAnim = timerAnim + 100;
// 					}, 100);
// 				}, 800 - timerAnim);
// 			}
// 		}

// 		if (e.type == "mouseout") {
// 			clearInterval(interval);

// 			if (timerAnim >= 800) {
// 				timerAnim = 0;

// 				smilyImg ? (e.target.style.backgroundImage = `url(${smilyImg})`) : null;

// 				interval = setInterval(() => {
// 					timerAnim = timerAnim + 100;
// 				}, 100);
// 			} else {
// 				interval = setTimeout(() => {
// 					timerAnim = 0;

// 					smilyImg ? (e.target.style.backgroundImage = `url(${smilyImg})`) : null;

// 					interval = setInterval(() => {
// 						timerAnim = timerAnim + 100;
// 					}, 100);
// 				}, 800 - timerAnim);
// 			}
// 		}
// 	}
// }

let arrImage = document.querySelectorAll(".section-team__image");

if (arrImage.length > 0) {
	arrImage.forEach((element) => {
		let timerAnim = 800;
		let interval;

		let seriouslyImg = element.dataset.seriouslyImg;
		let smilyImg = element.dataset.smilyImg;

		element.addEventListener("mouseenter", function () {
			clearInterval(interval);

			if (timerAnim >= 800) {
				timerAnim = 0;

				seriouslyImg ? (element.style.backgroundImage = `url(${seriouslyImg})`) : null;

				interval = setInterval(() => {
					timerAnim = timerAnim + 100;
				}, 100);
			} else {
				interval = setTimeout(() => {
					timerAnim = 0;

					seriouslyImg ? (element.style.backgroundImage = `url(${seriouslyImg})`) : null;

					interval = setInterval(() => {
						timerAnim = timerAnim + 100;
					}, 100);
				}, 800 - timerAnim);
			}
		});

		element.addEventListener("mouseleave", function () {
			clearInterval(interval);

			if (timerAnim >= 800) {
				timerAnim = 0;

				smilyImg ? (element.style.backgroundImage = `url(${smilyImg})`) : null;

				interval = setInterval(() => {
					timerAnim = timerAnim + 100;
				}, 100);
			} else {
				interval = setTimeout(() => {
					timerAnim = 0;

					smilyImg ? (element.style.backgroundImage = `url(${smilyImg})`) : null;

					interval = setInterval(() => {
						timerAnim = timerAnim + 100;
					}, 100);
				}, 800 - timerAnim);
			}
		});
	});
}
