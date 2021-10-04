// anim svg

import { SVG } from "@svgdotjs/svg.js";

import { spline } from "@georgedoescode/generative-utils";

import { gsap } from "gsap";

// import { DrawSVGPlugin } from "gsap";

// gsap.registerPlugin(DrawSVGPlugin);

if (document.querySelector(".js-svg-anim") != null) {
	const width = 150;
	const height = 150;

	const svg = SVG().viewbox(0, 0, width, height).addTo(".js-svg-anim");

	function mulberry32(a) {
		return function () {
			a |= 0;
			a = (a + 0x6d2b79f5) | 0;
			var t = Math.imul(a ^ (a >>> 15), 1 | a);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	function lerp(position, target, amt) {
		return {
			x: (position.x += (target.x - position.x) * amt),
			y: (position.y += (target.y - position.y) * amt),
		};
	}

	function animate() {
		let seed = Math.random() * 1000;
		svg.clear();
		const random = mulberry32(seed);

		const radius = width / 2;

		const numPoints = 8;
		const basePoints = [];
		const lerpPoints = [];

		const pointElements = [];

		const center = {
			x: width / 2,
			y: height / 2,
		};

		const angleStep = (Math.PI * 2) / numPoints;

		for (let i = 1; i <= numPoints; i++) {
			const angle = i * angleStep;
			const point = {
				x: center.x + Math.cos(angle) * radius,
				y: center.y + Math.sin(angle) * radius,
			};

			basePoints.push(point);
			lerpPoints.push(lerp({ ...point }, center, 0.375 * random()));
		}

		basePoints.forEach((p) => {
			pointElements.push(svg.circle(8).cx(p.x).cy(p.y).fill("#43bea2").attr("class", "base-point").scale(0).node);
		});

		lerpPoints.forEach((p) => {
			svg.circle(8).cx(p.x).cy(p.y).fill("#43bea2").attr("class", "lerp-point").opacity(0);
		});

		const path = spline(lerpPoints, 1, true);

		svg
			.path(path)
			.fill("none")
			.stroke({
				width: 2,
				color: "#43bea2",
			})
			.fill("none");

		gsap.to(".base-point", {
			scale: 1,
			stagger: 0.075,
			transformOrigin: "center",
		});

		for (let i = 0; i < pointElements.length; i++) {
			gsap.to(pointElements[i], {
				attr: {
					cx: lerpPoints[i].x,
					cy: lerpPoints[i].y,
				},
				delay: 2,
			});
		}

		gsap.set(".js-svg-anim path", {
			// drawSVG: 0,
		});

		gsap.to(".js-svg-anim path", {
			duration: 1,
			// drawSVG: "100%",
			delay: 3,
		});

		gsap.to(".js-svg-anim path", {
			stroke: "none",
			fill: "#43bea2",
			delay: 4,
		});

		gsap.to(".base-point", {
			scale: 0,
			delay: 4,
		});

		gsap.to(".js-svg-anim path", {
			opacity: 0,
			delay: 6,
		});

		setTimeout(() => {
			animate();
		}, 7000);
	}

	animate();
}
