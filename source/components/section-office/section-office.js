import lightgallery from "lightgallery";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let slideArr = document.querySelectorAll(".office-gallery");

		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.7,
		};

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const slider = entry.target;
					slider.classList.add("show-image");
					observer.unobserve(slider);
				}
			});
		}, options);

		slideArr.forEach((i) => {
			observer.observe(i);
		});

		if (slideArr.length > 0) {
			slideArr.forEach((element) => {
				let splide = new Splide(element, {
					type: "loop",
					drag: "free",
					focus: "center",
					perPage: 4,
					direction: element.classList.contains("--revers") ? "rtl" : "ltr",
					arrows: false,
					pagination: false,
					lazyLoad: "nearby",
					gap: "20px",
					fixedWidth: "400px",
					autoScroll: {
						speed: 1,
						pauseOnHover: false,
						pauseOnFocus: false,
					},
					breakpoints: {
						768: {
							fixedWidth: "300px",
						},
					},
				});

				splide.mount({ AutoScroll });
			});
		}

		lightgallery(document.querySelector(".lightgallery"), { selector: "a" });
	},
	false
);
