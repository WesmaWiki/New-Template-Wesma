import Swiper from "swiper/bundle";
import Plotly from "./plotly.min.js";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let examplesSlider = new Swiper(".examples-works__slider", {
			fadeEffect: { crossFade: true },
			speed: 1000,
			virtualTranslate: true,
			slidersPerView: 1,
			effect: "fade",
			watchOverflow: true,
			navigation: {
				nextEl: ".card-examples-works__next",
				prevEl: ".card-examples-works__prev",
			},
		});

		let arrGraph = Array.prototype.slice.call(document.querySelectorAll(".js-graph"));

		if (arrGraph.length > 0) {
			arrGraph.forEach((element, i) => {
				const graphId = element.getAttribute("id");
				const coord = element.dataset.coord.split("|");
				const elRange = element.dataset.range;

				const trace1 = {
					x: JSON.parse(coord[0]),
					y: JSON.parse(coord[1]),

					hoverlabel: {
						bgcolor: "#fff",
						bordercolor: "#000",
						font: {
							color: "#000",
							size: 16,
						},
					},

					showlegend: false,

					hovertemplate: "<span>Посетители: %{y:}</span><extra></extra>",

					marker: {
						color: "#43BEA2",
						size: 13,
					},

					line: {
						width: 2,
						color: "#707070",
					},
				};

				const layout = {
					dragmode: false,

					xaxis: {
						showline: false,
						showgrid: false,
						type: 'date',
						tickformat: "%B",
						 dtick: "M2",
					}, 

					yaxis: {
						dtick: elRange,
					},

					height: 400,

					margin: {
						pad: 20,
						b: 60,
						l: 60,
						r: 0,
						t: 0,
					},
				};

				let polot = Plotly.react(element, [trace1], layout, { displayModeBar: false, responsive: true, locale: "ru" });
			});
		}
	},
	false
);
