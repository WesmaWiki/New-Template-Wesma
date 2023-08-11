import Swiper from "swiper/bundle";

const sliderInit = () => {
	let solutionSlider = new Swiper(".section-solution__slider", {
		speed: 200,
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		fadeSpeed: 300,
		autoHeight: false,
		loop: false,
		navigation: {
			nextEl: ".solution-btn--next ",
			prevEl: ".solution-btn--prev "
		},
		on: {
			init: function () {
				let tabsBtn = document.querySelectorAll(".slide-inner__tab");
				if (tabsBtn !== null) {
					tabsBtn.forEach((btn) => {
						btn.addEventListener("click", () => {
							solutionSlider.update();
						});
					});
				}

			},

		},
		breakpoints: {
			460: {
				allowTouchMove: true,
			},

			800: {
				allowTouchMove: false,
			}
		},
	});

	window.solutionSlider = solutionSlider;
}

const tabsInit = () => {
	const slides = document.querySelectorAll('.section-solution__slide.swiper-slide');	

	for (let i = 0; i < slides.length; i++) {
		let buttonsTabMenu = slides[i].querySelectorAll('.tab-btn'); 
		let sectionTabContent = slides[i].querySelectorAll('.tab-content'); 

		let activeTabId = 0;
		sectionTabContent[activeTabId].classList.add('visible'); 
		for (let j = 0; j < buttonsTabMenu.length; j++) {
			buttonsTabMenu[j].addEventListener('click', () => { 
				sectionTabContent[activeTabId].classList.remove('visible');
				buttonsTabMenu[activeTabId].classList.remove('tab-active');
				activeTabId = j;
				sectionTabContent[activeTabId].classList.add('visible');
				buttonsTabMenu[activeTabId].classList.add('tab-active');
			})
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	sliderInit();
	tabsInit();
})


// scroll to heading slide

const anchorLinks = document.querySelectorAll('.anchor-link-js')
const blockID = document.getElementById('anchorLink')

for (let anchor of anchorLinks) {
	anchor.addEventListener('click', function (e) {
	  e.preventDefault();  
	
	  blockID.scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	  })
	})
  }


	