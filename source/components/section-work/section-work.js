import { gsap, Sine, Circ } from "gsap";

class Walle {
	constructor() {
		this.startX = 0;
		this.x = 0;
		this.y = 0;
		this.flip = false;
		this.audioPlay = false;
		this.startArms = 0;
	}

	mounted() {
		let tl = new gsap.timeline({
			repeat: -1,
			repeatDelay: 2,
		});

		tl.add("redo");
		tl.to(
			"#lefteye",
			0.5,
			{
				rotation: 5,
				repeat: 3,
				yoyo: true,
				transformOrigin: "100% 50%",
				ease: Sine.easeOut,
			},
			"redo"
		);
		tl.to(
			"#righteye",
			0.5,
			{
				rotation: -5,
				repeat: 3,
				yoyo: true,
				transformOrigin: "0% 30%",
				ease: Sine.easeOut,
			},
			"redo+=0"
		);
		tl.fromTo(
			"#lefteyeball",
			0.05,
			{
				scaleY: 1,
			},
			{
				scaleY: 0,
				repeat: 3,
				yoyo: true,
				transformOrigin: "50% 50%",
				ease: Circ.easeOut,
			},
			"redo+=4"
		);
		tl.fromTo(
			"#righteyeball",
			0.05,
			{
				scaleY: 1,
			},
			{
				scaleY: 0,
				repeat: 3,
				yoyo: true,
				transformOrigin: "50% 50%",
				ease: Circ.easeOut,
			},
			"redo+=4"
		);
		tl.to(
			"#eyecontain",
			0.4,
			{
				rotation: -15,
				repeat: 1,
				yoyo: true,
				transformOrigin: "50% 50%",
				ease: Sine.easeInOut,
			},
			"redo+=2"
		);
	}

	armsTL() {
		let tl = new gsap.timeline();
		tl.add("startarms");
		tl.to(
			"#backhand",
			2,
			{
				x: -16,
				rotation: 150,
				transformOrigin: "50% 50%",
			},
			"startarms"
		);
		tl.to(
			"#rightarm",
			2,
			{
				rotation: 30,
				transformOrigin: "100% 0",
			},
			"startarms"
		);
		tl.to(
			"#newrightarm",
			2,
			{
				x: -94,
				y: -918,
				rotation: 10,
				transformOrigin: "100% 100%",
			},
			"startarms"
		);

		tl.to(
			"#hand",
			2,
			{
				x: -15,
				y: -7,
				rotation: 90,
				transformOrigin: "50% 50%",
			},
			"startarms"
		);
		tl.to(
			"#leftarm",
			2,
			{
				rotation: 20,
				transformOrigin: "100% 0",
			},
			"startarms"
		);
		tl.to(
			"#newleftarm",
			2,
			{
				x: -100,
				y: -924,
				transformOrigin: "100% 100%",
			},
			"startarms"
		);

		return tl;
	}

	coordinates(e) {
		const walleBox = document.getElementById("walle").getBoundingClientRect(),
			walleCoords = walleBox.width / 2 + walleBox.left;

		if (this.startArms == 0) {
			this.startArms = this.armsTL();
		}

		this.y = e.clientY / 80 - 2;
		if (e.clientX > walleCoords) {
			this.x = -(e.clientX / 200);
			this.flip = true;
		} else {
			this.x = e.clientX / 200 - 5;
			this.flip = false;

			gsap.set("#righteyeb2", {
				scaleX: 1 + (1 - e.clientX / walleCoords) / 5,
			});
			gsap.set("#lefteyeb2", {
				scaleX: 1 + (1 - e.clientX / walleCoords) / 5,
			});
			gsap.set("#walle", {
				x: (e.clientX / walleCoords) * 50 - 40,
			});

			this.startArms.progress(1 - e.clientX / walleCoords).pause();
		}
	}
}

if (document.querySelector(".work") != null) {
	let coorWalle = new Walle();

	coorWalle.mounted();

	document.querySelector(".work").addEventListener("mousemove", (e) => {
		coorWalle.coordinates(e);
	});
}
