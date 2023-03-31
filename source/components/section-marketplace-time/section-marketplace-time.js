import Swiper from "swiper/bundle";
import hcSticky from "hc-sticky";

let wrapNav = document.querySelector(".slider-marketplace-time__arrows");
let sliderPag = document.querySelector(".slider-marketplace-time__pagination");
let arrowPrev = document.querySelector(".slider-marketplace-time__prev");
let arrowNext = document.querySelector(".slider-marketplace-time__next");

let stickyHeight = document.querySelectorAll(".marketplace-time__sticky-height");
let headerHeight = document.querySelector("header") ? document.querySelector("header").clientHeight : 0;

let sliderMarketplaceTime = new Swiper(".slider-marketplace-time", {
    slidesPerView: 1,
    direction: "vertical",
    speed: 1000,
    watchOverflow: true,
    edgeSwipeDetection: "prevent",
    spaceBetween: 30,
    allowTouchMove: false,
    navigation: {
        nextEl: arrowNext,
        prevEl: arrowPrev,
    },
    pagination: {
        el: sliderPag,
        type: "bullets",
        clickable: false,
    },

    on: {
        slideChangeTransitionStart: function (swiper) {
            wrapNav ? wrapNav.classList.add("anim") : null;
        },

        slideChangeTransitionEnd: function (swiper) {
            wrapNav ? wrapNav.classList.remove("anim") : null;
        },
    },
});

sliderMarketplaceTime.pagination.bullets.forEach((el, index) => {
    el.addEventListener("click", function() {
        window.scrollTo({
            top: stickyHeight[index].getBoundingClientRect().top + window.pageYOffset - headerHeight + 10,
            behavior: "smooth",
        });
    });
});

let Sticky = new hcSticky(".slider-marketplace-time", {
	top: 0,
});


window.addEventListener("scroll", function () {

    stickyHeight.forEach((element, index) => {
        if (element.getBoundingClientRect().top - headerHeight - 10 < 0 && element.getBoundingClientRect().top - headerHeight + element.clientHeight > 0) {
            sliderMarketplaceTime.slideTo(index, 500);
        }
    });
});