// import $ from "jquery";

// $(document).ready(function () {
// 	$(".ourClients .imgItem").each(function (index, val) {
// 		if (index > 13) $(val).fadeOut();
// 	});

// 	$(".clickMore").on("click", function (e) {
// 		e.preventDefault();
// 		$(".ourClients .imgItem").each(function (index, val) {
// 			if (index > 13) {
// 				$(val).fadeToggle().delay(500);
// 			}
// 		});

// 		$(this).toggleClass("pushBut");

// 		if ($(this).hasClass("pushBut")) {
// 			$(this).find("a").text("Скрыть");
// 		} else {
// 			$(this).find("a").text("еще");
// 		}
// 	});
// });

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let ourClientsItem = Array.prototype.slice.call(document.querySelectorAll(".ourClients .imgItem"));
		let buttonMore = document.querySelector(".clickMore");

		if (ourClientsItem != null) {
			ourClientsItem.forEach((element, index, array) => {
				if (index > 13) {
					element.classList.add("--hidden");
				}
			});

			if (buttonMore != null) {
				buttonMore.addEventListener("click", function (e) {
					e.preventDefault();

					ourClientsItem.forEach((element, index, array) => {
						if (index > 13) {
							element.classList.toggle("--hidden");
						}
					});

					this.classList.toggle("pushBut");

					if (this.classList.contains("pushBut")) {
						this.querySelector("a").textContent = "Скрыть";
					} else {
						this.querySelector("a").textContent = "еще";
					}
				});
			}
		}
	},
	false
);
