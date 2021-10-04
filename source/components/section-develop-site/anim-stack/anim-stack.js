import Scene from "scenejs";
import { kineticFrame, typing } from "@scenejs/effects";

let arrScene = Array.prototype.slice.call(document.querySelectorAll(".card-directions-stack__container"));

let arrSceneItem;

if (arrScene != null) {
	arrSceneItem = arrScene.map((element, index, array) => {
		let classEl = "." + element.classList.item(0) + "." + element.classList.item(1);

		let scene = new Scene(
			{
				[classEl]: {},
			},
			{
				selector: true,
			}
		);

		let item = scene.getItem(classEl);

		function move(startTime, endTime, left, top, rotate, scale) {
			item.set({
				[`${startTime}, ${endTime}`]: kineticFrame({
					left: `${left}px`,
					top: `${top}px`,
				}).set({
					transform: {
						rotate: `${rotate}deg`,
						scale,
					},
				}),
			});
		}

		move(0, 0, 90, 115, 0, 1.3);
		move(1, 1, 90, 115, 0, 1.1);
		move(2, 3, 0, -10, 0, 1);
		move(4, 4.5, -30, -100, -90, 1.2);
		move(5.5, 6, -52, -18, -90, 1.1);
		move(7, 7.5, 30, 45, 0, 1.2);
		move(8.5, 9, 10, 30, 0, 1.3);
		move(10, 12, 0, 0, 0, 1);

		let obgText = {};

		element.querySelectorAll("p").forEach((el, i, a) => {
			let elText = el.textContent;
			let elDuration = el.dataset.duration;
			let elTime = el.dataset.time;

			obgText[classEl + ` [data-id='${i + 1}']`] = { [elTime]: typing({ text: elText, duration: elDuration }) };
		});

		scene.set(obgText);

		scene.setPlaySpeed(1);
		scene.setEasing("ease-in-out");
		scene.setIterationCount(1);

		return scene;
	});

	let palyScene = document.querySelectorAll(".card-directions-stack__name");

	if (palyScene != null) {
		palyScene.forEach((element, index, array) => {
			element.addEventListener("click", () => {
				element.style.display = "none";
				arrScene[index].classList.add("play");
				arrSceneItem[index].play();
			});
		});
	}
}
