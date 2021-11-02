export function tabContainers() {
	let tabContainers = Array.prototype.slice.call(document.querySelectorAll(".js-tab-container"));

	if (tabContainers != null) {
		tabContainers.forEach((element) => {
			let tabItem = Array.prototype.slice.call(element.querySelectorAll(".js-tab-control"));
			let tabContent = Array.prototype.slice.call(element.querySelectorAll(".js-tab-content"));

			tabItem.forEach((el, index, array) => {
				el.addEventListener("click", (e) => {
					e.preventDefault();
					tabItem.forEach((el) => el.classList.remove("active"));
					tabContent.forEach((el) => el.classList.remove("active"));

					let dataId = el.dataset.tabItem;

					let tabContentItem = tabContent.find((item) => {
						if (item.dataset.tabContent == dataId) return item;
					});

					el.classList.add("active");

					tabContentItem ? tabContentItem.classList.add("active") : null;
				});
			});
		});
	}
}
