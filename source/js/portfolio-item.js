import sectionPortfolioTask from "../components/section-portfolio-task/section-portfolio-task";
import sectionPortfolioSolution from "../components/section-portfolio-solution/section-portfolio-solution";
import sectionPortfolioLogo from "../components/section-portfolio-logo/section-portfolio-logo";
import sectionPortfolioDesign from "../components/section-portfolio-design/section-portfolio-design";
import sectionPortfolioMobile from "../components/section-portfolio-mobile/section-portfolio-mobile";
import sectionPortfolioAnimation from "../components/section-portfolio-animation/section-portfolio-animation";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

// lord-icon
document.addEventListener(
	"DOMContentLoaded",
	function () {
		defineLordIconElement(loadAnimation);

		let sectionNumber = document.querySelectorAll(".js-section-numbers");

		if (sectionNumber.length > 0) {
			let options = {
				root: null,
				rootMargin: "0px",
				threshold: 0.2,
			};

			let callback = function (entries, observer) {
				if (entries[0]["isIntersecting"] === true) {
					entries[0].target.classList.add("--show-number");
				} else {
					entries[0].target.classList.remove("--show-number");
				}
			};

			let observer = new IntersectionObserver(callback, options);

			sectionNumber.forEach((element) => {
				observer.observe(element);
			});
		}
	},
	false
);
