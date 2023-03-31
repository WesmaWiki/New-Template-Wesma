import Parallax from "parallax-js/dist/parallax.min.js";

let scene = document.querySelector(".marketplace-automation");

let parallaxInstance = new Parallax(scene, {
    hoverOnly: true,
    pointerEvents: true,
    selector: ".marketplace-automation__img-paralax",
});
