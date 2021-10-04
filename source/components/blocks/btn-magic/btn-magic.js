import { gsap, TimelineLite, Elastic } from "gsap";
import { SlowMo } from "gsap/EasePack";

gsap.registerPlugin(SlowMo);

document.addEventListener("mousemove", function (e) {
	let element = e.target;
	if (element.classList.contains("btn-magic-wrapper")) {
		if (!element.classList.contains("--add")) {
			let $circlesTopLeft = element.querySelectorAll(".circle.top-left");
			let $circlesBottomRight = element.querySelectorAll(".circle.bottom-right");

			let tl = new TimelineLite();
			let tl2 = new TimelineLite();
			let btTl = new TimelineLite({ paused: true });

			tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
			tl.to($circlesTopLeft[0], 0.1, { scale: 0.2, x: "+=6", y: "-=2" });
			tl.to($circlesTopLeft[1], 0.1, { scaleX: 1, scaleY: 0.8, x: "-=10", y: "-=7" }, "-=0.1");
			tl.to($circlesTopLeft[2], 0.1, { scale: 0.2, x: "-=15", y: "+=6" }, "-=0.1");
			tl.to($circlesTopLeft[0], 1, { scale: 0, x: "-=5", y: "-=15", opacity: 0 });
			tl.to($circlesTopLeft[1], 1, { scaleX: 0.4, scaleY: 0.4, x: "-=10", y: "-=10", opacity: 0 }, "-=1");
			tl.to($circlesTopLeft[2], 1, { scale: 0, x: "-=15", y: "+=5", opacity: 0 }, "-=1");

			let tlBt1 = new TimelineLite();
			let tlBt2 = new TimelineLite();

			tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
			tlBt1.add(tl);

			tl2.set($circlesBottomRight, { x: 0, y: 0 });
			tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
			tl2.to($circlesBottomRight[0], 0.1, { scale: 0.2, x: "-=6", y: "+=3" });
			tl2.to($circlesBottomRight[1], 0.1, { scale: 0.8, x: "+=7", y: "+=3" }, "-=0.1");
			tl2.to($circlesBottomRight[2], 0.1, { scale: 0.2, x: "+=15", y: "-=6" }, "-=0.2");
			tl2.to($circlesBottomRight[0], 1, { scale: 0, x: "+=5", y: "+=15", opacity: 0 });
			tl2.to($circlesBottomRight[1], 1, { scale: 0.4, x: "+=7", y: "+=7", opacity: 0 }, "-=1");
			tl2.to($circlesBottomRight[2], 1, { scale: 0, x: "+=15", y: "-=5", opacity: 0 }, "-=1");

			tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
			tlBt2.add(tl2);

			btTl.add(tlBt1);
			btTl.to(element.querySelectorAll(".button.effect-button"), 0.8, { scaleY: 1.1 }, 0.1);
			btTl.add(tlBt2, 0.2);
			btTl.to(element.querySelectorAll(".button.effect-button"), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

			btTl.timeScale(2.6);

			element.classList.add("--add");

			element.addEventListener("mouseover", () => {
				btTl.restart();
			});

			btTl.restart();
		}
	}
});