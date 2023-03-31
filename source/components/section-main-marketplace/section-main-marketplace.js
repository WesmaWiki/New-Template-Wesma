import * as THREE from "three";
import GLOBE from 'vanta/dist/vanta.GLOBE.min'

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let elAnim = document.querySelector(".marketplace-anim__canvas");
		if (elAnim != null) {
			GLOBE({
				el: elAnim,
				THREE: THREE,
				mouseControls: true,
				touchControls: true,
				gyroControls: false,
				minHeight: 200.00,
				minWidth: 200.00,
				points: 0,
				showDots: false,
				scale: 1.00,
				scaleMobile: 1.00,
				color: "#43bea2",
				color2: "#43bea2",
				backgroundColor: "#ffffff"
			});
		};
	},
	false
);
