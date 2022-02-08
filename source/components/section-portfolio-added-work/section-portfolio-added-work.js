import SimpleBar from "simplebar";

let scrollContainerEquipment = document.querySelector(".portfolio-added-work__equipment-list ul");

if (scrollContainerEquipment != null) {
	new SimpleBar(scrollContainerEquipment, {
		scrollbarMinSize: 60,
		scrollbarMaxSize: 60,
		autoHide: false,
	});
}

let scrollContainerContent = document.querySelector(".portfolio-added-work__content-list");

if (scrollContainerContent != null) {
	new SimpleBar(scrollContainerContent, {
		scrollbarMinSize: 60,
		scrollbarMaxSize: 60,
		autoHide: false,
	});
}
