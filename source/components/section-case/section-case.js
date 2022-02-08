import TweenMax from "gsap";
import { match } from "../../js/module/match";
// import { phoneMask } from "../../js/app";
// import swiperTrust from "../section-trust/section-trust";
// import tabContainers from "../section-questions/tab-containers";
// import activePlaceholder from "../section-order-form/section-order-form";

export function sectionCase() {
	if (document.querySelector(".case__list") != null) {
		// Функция получения случайного числа от min до (max+1)
		// function randomInteger(min, max) {
		// 	let rand = min + Math.random() * (max + 1 - min);
		// 	return Math.floor(rand);
		// }

		// Массив элементов
		let arrCardCase = Array.prototype.slice.call(document.querySelectorAll(".case__item"));

		// Функция разбития массива на подмассивы
		// function chunkArray(myArray, chunkSize) {
		// 	let results = [],
		// 		kRs = 0;
		// 	if (myArray.length) {
		// 		for (let i in myArray) {
		// 			if (results[kRs] == null) results[kRs] = [];
		// 			results[kRs].push(myArray[i]);
		// 			kRs = kRs + 1;
		// 			if (kRs > chunkSize) kRs = 0;
		// 		}
		// 	}
		// 	return results;
		// }

		// Функция уменьшения размера изображений
		// function resizeImage(element) {
		// 	let arrCard = element;
		// 	let prevIndex = [];
		// 	let resizeEl = 0;

		// 	while (resizeEl < element.length / 2 && element.length >= 3) {
		// 		let currentIndex = randomInteger(0, element.length - 1);

		// 		if (!prevIndex.includes(currentIndex)) {
		// 			prevIndex.push(currentIndex);

		// 			let randomEl = arrCard[currentIndex];

		// 			randomEl.classList.add("height-small");

		// 			resizeEl += 1;
		// 		}
		// 	}
		// }

		// Делим элементы на 3 или 2 колонки в зависимости от разрешения
		// function splitColumn() {
		// 	if (!match[1].matches) {
		// 		let caseArr = Array.prototype.slice.call(document.querySelectorAll(".case__item"));

		// 		document.querySelectorAll(".case__column").forEach((el) => el.remove());

		// 		caseArr.forEach((el) => {
		// 			el.classList.remove("height-small");
		// 		});

		// 		let result = chunkArray(caseArr, 2);

		// 		result.forEach((element) => {
		// 			let column = document.createElement("div");
		// 			column.classList.add("case__column");

		// 			resizeImage(element);

		// 			element.forEach((el) => {
		// 				column.append(el);
		// 			});

		// 			document.querySelector(".case__list").append(column);
		// 		});
		// 	} else {
		// 		let caseArr = Array.prototype.slice.call(document.querySelectorAll(".case__item"));

		// 		document.querySelectorAll(".case__column").forEach((el) => el.remove());

		// 		caseArr.forEach((el) => {
		// 			el.classList.remove("height-small");
		// 		});

		// 		let result = chunkArray(caseArr, 1);

		// 		result.forEach((element) => {
		// 			let column = document.createElement("div");
		// 			column.classList.add("case__column");

		// 			resizeImage(element);

		// 			element.forEach((el) => {
		// 				column.append(el);
		// 			});

		// 			document.querySelector(".case__list").append(column);
		// 		});
		// 	}
		// }

		function splitColumn() {
			if (!match[1].matches) {
				let caseArr;

				let arrColumn = [];

				if (document.querySelectorAll(".case__column").length != 3) {
					caseArr = Array.prototype.slice.call(document.querySelectorAll(".case__item"));
					caseArr.forEach((element) => {
						element.classList.remove("selected");
						element.classList.remove("height-small");
					});

					document.querySelectorAll(".case__column").forEach((el) => el.remove());

					for (let index = 0; index <= 2; index++) {
						let columnEl = document.createElement("div");
						columnEl.classList.add("case__column");
						arrColumn.push(columnEl);

						document.querySelector(".case__list").append(columnEl);
					}
				} else {
					caseArr = Array.prototype.slice.call(document.querySelectorAll(".case__item:not(.selected)"));
				}

				caseArr.forEach((element) => {
					element.classList.add("selected");
				});

				arrColumn = document.querySelectorAll(".case__column");

				let count = 1;

				caseArr.forEach((item, index, array) => {
					if (index % 2 == 0) {
						item.classList.add("height-small");
					}

					if (count == 3) {
						arrColumn[2].append(item);

						count = 1;

						return;
					}

					if (count == 2) {
						arrColumn[1].append(item);

						count++;

						return;
					}

					if (count == 1) {
						arrColumn[0].append(item);

						count++;

						return;
					}
				});
			} else {
				let caseArr;

				let arrColumn = [];

				if (document.querySelectorAll(".case__column").length != 2) {
					caseArr = Array.prototype.slice.call(document.querySelectorAll(".case__item"));

					caseArr.forEach((element) => {
						element.classList.remove("selected");
						element.classList.remove("height-small");
					});

					document.querySelectorAll(".case__column").forEach((el) => el.remove());

					for (let index = 0; index <= 1; index++) {
						let columnEl = document.createElement("div");
						columnEl.classList.add("case__column");
						arrColumn.push(columnEl);
						document.querySelector(".case__list").append(columnEl);
					}
				} else {
					caseArr = Array.prototype.slice.call(document.querySelectorAll(".case__item:not(.selected)"));
				}

				caseArr.forEach((element) => {
					element.classList.add("selected");
				});

				arrColumn = document.querySelectorAll(".case__column");

				let count = 1;

				caseArr.forEach((item, index, array) => {
					if (index % 3 == 0) {
						item.classList.add("height-small");
					}

					if (count == 2) {
						arrColumn[1].append(item);

						count = 1;

						return;
					}

					if (count == 1) {
						arrColumn[0].append(item);

						count++;

						return;
					}
				});
			}
		}

		splitColumn();
		match[1].addListener(splitColumn);

		// Анимация появления элементов

		const animItems = Array.prototype.slice.call(document.querySelectorAll(".anim-items"));

		if (animItems.length > 0) {
			window.addEventListener("scroll", animOnScroll);
			function animOnScroll() {
				animItems.forEach((element) => {
					const animItem = element;
					const animItemHeight = animItem.offsetHeight;
					const animItemOffset = offset(animItem).top;
					const animStart = 3; // начало анимации при достижении скролом 1/10 части элемента

					let animItemPoint = window.innerHeight - animItemHeight / animStart;

					if (animItemHeight > window.innerHeight) {
						animItemPoint = window.innerHeight - window.innerHeight / animStart;
					}

					if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
						animItem.classList.add("animate");
					} else {
						if (!animItem.classList.contains("anim-no-scrollTop")) {
							animItem.classList.remove("animate");
						}
					}
				});

				function offset(el) {
					var rect = el.getBoundingClientRect(),
						scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
						scrollTop = window.pageYOffset || document.documentElement.scrollTop;
					return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
				}
			}
			// setTimeout(animOnScroll, 0);
			animOnScroll();
		}

		// Функция привязки path к элементу

		function attributesSerializer(element, attributes) {
			return new Proxy(element, {
				get(el, prop) {
					if (prop === "$attrs") return this.$attrs;
					if (this.$attrs[prop]) return this.$attrs[prop];
					const val = el[prop];
					return typeof val === "function" ? val.bind(el) : val;
				},
				set(el, prop, val) {
					if (prop in this.$attrs) return false;
					return (el[prop] = val), true;
				},
				$attrs: attributes.reduce((r, { attr, delim = " " }) => {
					r[attr] = new Proxy(
						{},
						{
							get(obj, i) {
								const values = element
									.getAttribute(attr)
									.split(delim)
									.map((v) => v.trim());
								return values[i];
							},
							set(obj, i, newVal) {
								const values = element
									.getAttribute(attr)
									.split(delim)
									.map((v) => v.trim());
								values[i] = newVal;
								element.setAttribute(attr, values.join(delim));
								return true;
							},
						}
					);
					return r;
				}, {}),
			});
		}

		// Создаем массив объектов с координатами каждой карточки и координатами точек path

		let arrCord = arrCardCase.map((el) => {
			return {
				currentEl: el,
				y: el.querySelector(".case__image").getBoundingClientRect().top + pageYOffset - 100,
				x: el.querySelector(".case__image").getBoundingClientRect().left + pageXOffset,

				offsetTopRightY: 0,
				offsetTopRightX: el.querySelector(".case__image").clientWidth,
				offsetTopLeftX: 0,
				offsetTopLeftY: 0,

				offsetBottomRightY: el.querySelector(".case__image").clientHeight,
				offsetBottomRightX: el.querySelector(".case__image").clientWidth,
				offsetBottomLeftY: el.querySelector(".case__image").clientHeight,
				offsetBottomLeftX: 0,

				offsetTop: 0,
				offsetBottom: 0,
				offsetRight: el.querySelector(".case__image").clientWidth,
				offsetLeft: 0,

				path: attributesSerializer(el.querySelector("path"), [{ attr: "d", delim: "\n" }]),

				upadateCoord: function () {
					this.y = this.currentEl.querySelector(".case__image").getBoundingClientRect().top + pageYOffset - 100;
					this.x = this.currentEl.querySelector(".case__image").getBoundingClientRect().left + pageXOffset;
				},
			};
		});

		window.addEventListener("resize", () => {
			arrCord.forEach((element) => {
				element.upadateCoord();
			});
		});

		// Анимация каждой точки path при движении мыши

		function animPath(e) {
			let coordMousePageY = e.type == "touchmove" ? e.targetTouches[0].pageY : e.pageY;
			let coordMousePageX = e.type == "touchmove" ? e.targetTouches[0].pageX : e.pageX;

			arrCord.forEach((element, index, array) => {
				let heightEl = arrCardCase[index].querySelector(".case__image").clientHeight;
				let widthEl = arrCardCase[index].querySelector(".case__image").clientWidth;

				if (element.y - coordMousePageY < 50 && element.y - coordMousePageY > -(heightEl + 50) && element.x - coordMousePageX < 50 && element.x - coordMousePageX > -(widthEl + 50)) {
					// console.log(element.x - coordMousePageX / 1.2);
					TweenMax.to(element, 0.5, {
						offsetTop: coordMousePageX - element.x > widthEl / 4 && coordMousePageX - element.x < widthEl / 1.33 && coordMousePageY - element.y < heightEl / 4 ? coordMousePageY - element.y + heightEl / 5 : 0,

						offsetBottom: coordMousePageX - element.x > widthEl / 4 && coordMousePageX - element.x < widthEl / 1.33 && coordMousePageY - element.y > heightEl / 1.33 ? coordMousePageY - element.y - heightEl / 5 : heightEl,

						offsetLeft: coordMousePageY - element.y > heightEl / 4 && coordMousePageY - element.y < heightEl / 1.33 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageX - element.x + widthEl / 5 : 0,

						offsetRight: coordMousePageY - element.y > heightEl / 4 && coordMousePageY - element.y < heightEl / 1.33 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageX - element.x - widthEl / 5 : widthEl,

						offsetTopRightY: coordMousePageY - element.y < heightEl / 4 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageY - element.y + heightEl / 7 : 0,

						offsetTopRightX: coordMousePageY - element.y < heightEl / 4 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageX - element.x - widthEl / 7 : widthEl,

						offsetTopLeftY: coordMousePageY - element.y < heightEl / 4 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageY - element.y + heightEl / 7 : 0,

						offsetTopLeftX: coordMousePageY - element.y < heightEl / 4 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageX - element.x + widthEl / 7 : 0,

						offsetBottomRightY: coordMousePageY - element.y > heightEl / 1.33 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageY - element.y - heightEl / 7 : heightEl,

						offsetBottomRightX: coordMousePageY - element.y > heightEl / 1.33 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageX - element.x - widthEl / 7 : widthEl,

						offsetBottomLeftY: coordMousePageY - element.y > heightEl / 1.33 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageY - element.y - heightEl / 7 : heightEl,

						offsetBottomLeftX: coordMousePageY - element.y > heightEl / 1.33 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageX - element.x + widthEl / 7 : 0,

						onUpdate: () => {
							element.path.d[0] = `M ${element.offsetTopLeftX} ${element.offsetTopLeftY} Q ${widthEl / 2} ${element.offsetTop} ${element.offsetTopRightX} ${element.offsetTopRightY} Q ${element.offsetRight} ${heightEl / 2} ${element.offsetBottomRightX} ${element.offsetBottomRightY} Q ${widthEl / 2} ${element.offsetBottom} ${element.offsetBottomLeftX} ${element.offsetBottomLeftY} Q ${element.offsetLeft} ${heightEl / 2} ${element.offsetTopLeftX} ${element.offsetTopLeftY}`;
						},
					});
				} else {
					TweenMax.to(element, 0.5, {
						offsetTop: 0,
						offsetTopRightY: 0,
						offsetTopRightX: widthEl,
						offsetTopLeftX: 0,
						offsetTopLeftY: 0,
						offsetBottomRightY: heightEl,
						offsetBottomRightX: widthEl,

						offsetBottomLeftY: heightEl,
						offsetBottomLeftX: 0,
						offsetBottom: heightEl,
						offsetLeft: 0,
						offsetRight: widthEl,
						onUpdate: () => {
							element.path.d[0] = `M ${element.offsetTopLeftX} ${element.offsetTopLeftY} Q ${widthEl / 2} ${element.offsetTop} ${element.offsetTopRightX} ${element.offsetTopRightY} Q ${element.offsetRight} ${heightEl / 2} ${element.offsetBottomRightX} ${element.offsetBottomRightY} Q ${widthEl / 2} ${element.offsetBottom} ${element.offsetBottomLeftX} ${element.offsetBottomLeftY} Q ${element.offsetLeft} ${heightEl / 2} ${element.offsetTopLeftX} ${element.offsetTopLeftY}`;
						},
					});
				}
			});
		}

		if (document.querySelector(".case") != null) {
			document.querySelector(".case").addEventListener("mousemove", animPath);
			document.querySelector(".case").addEventListener("touchmove", animPath);
		}
	}
}

sectionCase();
