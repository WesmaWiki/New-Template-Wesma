import { match } from "../../js/module/match";

let arrCardDevAll = Array.prototype.slice.call(document.querySelectorAll(".card-dev-all"));

function enterCardDevAll() {
	this.style.minHeight = this.clientHeight + "px";

	this.classList.add("--hover");
}

function leaveCardDevAll() {
	this.style.removeProperty("min-height");

	this.classList.remove("--hover");
}

function activeListenerCardDevAll() {
	if (!match[0].matches) {
		if (arrCardDevAll.length > 0) {
			arrCardDevAll.forEach((element) => {
				element.addEventListener("mouseenter", enterCardDevAll);

				element.addEventListener("mouseleave", leaveCardDevAll);

				element.classList.remove("--hover");
			});
		}
	} else {
		if (arrCardDevAll.length > 0) {
			arrCardDevAll.forEach((element) => {
				element.removeEventListener("mouseenter", enterCardDevAll);

				element.removeEventListener("mouseleave", leaveCardDevAll);

				element.classList.add("--hover");
			});
		}
	}
}

activeListenerCardDevAll();
match[0].addListener(activeListenerCardDevAll);
