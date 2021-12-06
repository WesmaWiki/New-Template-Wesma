import "swiper/swiper-bundle.css";

import "@splidejs/splide/dist/css/splide.min.css";

import "nouislider/dist/nouislider.css";

import floatingMenu from "../components/floating-menu/floating-menu";

import header from "../components/header/header";

import footer from "../components/footer/footer";

import btnMagic from "../components/blocks/btn-magic/btn-magic";

import sectionTrust from "../components/section-trust/section-trust";

import sectionOurClients from "../components/section-ourClients/section-ourClients";

import { tabContainers } from "./module/tab-containers";

import { activePlaceholder } from "./module/active-placeholder";

import { sectionCase } from "../components/section-case/section-case";

import { swiperTrust } from "../components/section-trust/section-trust";

import { phoneMask } from "./module/phoneMask";

tabContainers();

phoneMask();

activePlaceholder();

export const fadeIn = (element, duration, lock_body) => {
	(function increment(value = 0) {
		element.style.opacity = String(value);
		if (element.style.opacity <= 1) {
			setTimeout(() => {
				increment(value + 0.1);
			}, duration / 10);
		} else if (lock_body != null && lock_body) {
			lock_body.classList.add("lock-modal");
		}
	})();
};

export const fadeOut = (element, duration, remove, lock_body) => {
	(function decrement() {
		element.style.opacity -= 0.1;
		element.style.opacity < 0
			? (element.style.display = "none")
			: setTimeout(() => {
					decrement();
			  }, duration / 10);
		if (remove != null && remove && element.style.opacity < 0) {
			element.remove();
			if (lock_body != null && lock_body) lock_body.classList.remove("lock-modal");
		}
	})();
};

document.addEventListener("click", function (e) {
	let element = e.target,
		body = document.body,
		scrollAnim = element.getAttribute("data-scroll-to-anim"),
		scrollAnimParent = element.closest("[data-scroll-to-anim]");
	if (element.closest(".popupImageLink")) {
		let link = element.closest(".popupImageLink").getAttribute("data-href");
		if (link != null) {
			let modal = document.createElement("div");
			modal.classList.add("modal", "popup-general", "--zoom-img");
			modal.innerHTML = '<div class="popup-general__popup-wrap"><div class="popup-general__body"></div><div class="popup-general__close js-modal-close"></div></div>';

			if (body.querySelector(".popup-general") == null) {
				body.append(modal);
			}
			if (body.querySelector(".popup-general__body") != null) {
				body.querySelector(".popup-general__body").innerHTML = '<img src="' + link + '"/>';
			} else {
				let modalBody = document.createElement("div");
				modalBody.classList.add("popup-general__body");
				modalBody.innerHTML = '<img src="' + link + '"/>';
				body.querySelector(".popup-general__popup-wrap").append(modalBody);
			}
			fadeIn(body.querySelector(".popup-general"), 100, body);
		}
	}
	if (element.closest(".popupFileFromLink") || element.classList.contains("popupFileFromLink")) {
		let targetElement = element.classList.contains("popupFileFromLink") ? element : element.closest(".popupFileFromLink"),
			path_to_file = targetElement.getAttribute("data-path-to-file"),
			tpl = targetElement.getAttribute("data-tpl"),
			type = targetElement.getAttribute("data-type"),
			sendData = {},
			ajaxFormScriptPath = "/assets/components/ajaxform/",
			ajaxFormScripts = [ajaxFormScriptPath + "js/lib/jquery.form.min.js", ajaxFormScriptPath + "js/lib/jquery.jgrowl.min.js", ajaxFormScriptPath + "js/default.js"];
		if (path_to_file != null) {
			if (tpl != "") {
				sendData.tpl = tpl;
			}
			$.ajax({
				url: path_to_file,
				method: "POST",
				data: sendData,
				dataType: "html",
				async: true,
				processData: true,
				cache: false,
				success: function (html) {
					let code = $("<div></div>").html(html),
						innerHtml = code.html();

					switch (type) {
						case "PopupForm":
							let modal = document.createElement("div");
							modal.classList.add("modal", "popup-general");
							modal.innerHTML = '<div class="popup-general__popup-wrap"><div class="popup-general__body"></div><div class="popup-general__close js-modal-close"></div></div>';

							if (body.querySelector(".popup-general") == null) {
								body.append(modal);
							}
							if (body.querySelector(".popup-general__body") != null) {
								body.querySelector(".popup-general__body").innerHTML = innerHtml;
							} else {
								let modalBody = document.createElement("div");
								modalBody.classList.add("popup-general__body");
								modalBody.innerHTML = innerHtml;
								body.querySelector(".popup-general__popup-wrap").append(modalBody);
							}
							fadeIn(body.querySelector(".popup-general"), 100, body);

							let hiddenIpunts = document.querySelectorAll('[type="hidden"][name="sitename"]');
							if (hiddenIpunts != null && hiddenIpunts.length) {
								hiddenIpunts.forEach((element, index, array) => {
									element.setAttribute("value", "");
								});
							}
							let css = document.createElement("link");
							css.rel = "stylesheet";
							css.href = ajaxFormScriptPath + "css/default.css";
							if (document.querySelector('[href="' + ajaxFormScriptPath + 'css/default.css"]') == null) body.appendChild(css);
							for (let i in ajaxFormScripts) {
								let script = document.createElement("script");
								script.src = ajaxFormScripts[i];
								if (document.querySelector('[src="' + ajaxFormScripts[i] + '"]') == null) body.appendChild(script);
							}
							activePlaceholder();
							phoneMask();
							break;

						default:
							console.log("CHANK", tpl);
					}
				},
				error: function (data) {
					console.log("ERROR", data);
				},
			});
		}
	}
	if (element.classList.contains("js-modal-close") || element.classList.contains("popup-general")) {
		fadeOut(body.querySelector(".popup-general"), 100, 1, body);
	}
	if (scrollAnim != null || scrollAnimParent != null) {
		scrollAnim = scrollAnim != null ? scrollAnim : scrollAnimParent;
		let scrollAnimTo = scrollAnim != "" && (scrollAnim[0] == "." || scrollAnim[0] == "#" || scrollAnim[0] == "[") ? body.querySelector(scrollAnim) : null,
			scrollAnimToPx = scrollAnimTo != null ? scrollAnimTo.getBoundingClientRect().top + window.pageYOffset : 0;
		window.scrollTo({
			top: scrollAnimToPx,
			behavior: "smooth",
		});
	}
});

document.addEventListener("change", function (e) {
	let element = e.target,
		elem_name = element.getAttribute("name"),
		body = document.body;
	if (element.closest(".input-box") || elem_name == "file") {
		let fileName = element.files[0].name,
			textWrapper = element.closest(".input-box"),
			textTarget = textWrapper != null ? textWrapper.querySelector(".input-box__button") : null;
		if (fileName != null && textTarget != null) {
			textTarget.innerText = fileName;
		}
	}
});

document.addEventListener(
	"DOMContentLoaded",
	function () {
		phoneMask();
	},
	false
);

$(document).on('pdopage_load', function(e, config, response) {
    let cases = $('.case__list > a');
    if (cases) {
    	sectionCase();
    }
});

$(function () {
	/*AJAX LOADING FROM FILE INLINE*/
	let loadingFiles = $("body").find(".ajaxLoadFromFile"),
		preloaderHtml = `<div class="preloaderItem"><svg class="gegga">
    <defs>
        <filter id="gegga">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
                result="inreGegga"
              />
            <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
        </filter>
    </defs>
</svg>
<svg class="snurra" width="200" height="200" viewBox="0 0 200 200">
    <defs>
        <linearGradient id="linjärGradient">
            <stop class="stopp1" offset="0" />
            <stop class="stopp2" offset="1" />
        </linearGradient>
        <linearGradient
          y2="160"
          x2="160"
          y1="40"
          x1="40"
          gradientUnits="userSpaceOnUse"
          id="gradient"
          xlink:href="#linjärGradient"
        />
    </defs>
    <path
        class="halvan"
        d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
    />
    <circle class="strecken" cx="100" cy="100" r="64" />
</svg>
<svg class="skugga" width="200" height="200" viewBox="0 0 200 200">
    <path
        class="halvan"
        d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
    />
    <circle class="strecken" cx="100" cy="100" r="64" />
</svg></div>`;

	if (loadingFiles.length) {
		$.each(loadingFiles, function (i, v) {
			let file_wrapper = $(this),
				path_to_file = file_wrapper.data("path-to-file"),
				tpl = typeof file_wrapper.data("tpl") !== "undefined" ? file_wrapper.data("tpl") : "",
				sendData = {},
				ajaxFormScriptPath = "/assets/components/ajaxform/",
				ajaxFormScripts = [ajaxFormScriptPath + "js/lib/jquery.form.min.js", ajaxFormScriptPath + "js/lib/jquery.jgrowl.min.js", ajaxFormScriptPath + "js/default.js"];

			if (typeof path_to_file !== "undefined" && path_to_file != "") {
				if (tpl != "") {
					sendData.tpl = tpl;
				}
				$.ajax({
					url: path_to_file,
					method: "POST",
					data: sendData,
					dataType: "html",
					async: true,
					processData: true,
					cache: false,
					success: function (html) {
						let code = $("<div></div>").html(html),
							innerHtml = code.html();
						file_wrapper.after(innerHtml);
						file_wrapper.remove();

						switch (tpl) {
							case "section-cases":
								sectionCase();
								break;
							case "section-trust":
								swiperTrust();
								tabContainers();
								break;
							case "AjaxDiscussProject":
							case "AjaxWontWork":
								let hiddenIpunts = document.querySelectorAll('[type="hidden"][name="sitename"]');
								if (hiddenIpunts != null && hiddenIpunts.length) {
									hiddenIpunts.forEach((element, index, array) => {
										element.setAttribute("value", "");
									});
								}
								let css = document.createElement("link");
								css.rel = "stylesheet";
								css.href = ajaxFormScriptPath + "css/default.css";
								if (document.querySelector('[href="' + ajaxFormScriptPath + 'css/default.css"]') == null) document.body.appendChild(css);
								for (let i in ajaxFormScripts) {
									let script = document.createElement("script");
									script.src = ajaxFormScripts[i];
									if (document.querySelector('[src="' + ajaxFormScripts[i] + '"]') == null) document.body.appendChild(script);
								}
								activePlaceholder();
								phoneMask();
								break;

							default:
								console.log("CHANK", tpl);
						}
					},
					error: function (data) {
						console.log("ERROR", data);
					},
				});
			}
		});
	}

	/*AJAX LOADING FROM FILE*/
	$("body").on("click", ".ajaxFilterResource", function () {
		let elem = $(this),
			elem_vid = typeof elem.data("vid") !== "undefined" ? elem.data("vid") : "",
			elem_parent_id = typeof elem.data("parent-id") !== "undefined" ? elem.data("parent-id") : "",
			elem_show_filter = typeof elem.data("show-filter") !== "undefined" ? elem.data("show-filter") : 0,
			elem_wrap = elem.closest("[data-path-to-file]"),
			elem_lists = typeof elem_wrap.data("class-list") !== "undefined" ? elem_wrap.data("class-list") : null,
			sendData = {
				action: "filter",
				filters: [],
			};

		// if (elem_vid == 'all')
		// 	$('.'+elem_lists+' .ajaxFilterResource').removeClass('active');

		if (elem.hasClass("active")) elem.removeClass("active");
		else elem.addClass("active").siblings().removeClass("active");

		if (!elem_wrap.length) return false;

		let path_to_file = typeof elem_wrap.data("path-to-file") !== "undefined" ? elem_wrap.data("path-to-file") : "",
			html_class = typeof elem_wrap.data("class") !== "undefined" ? elem_wrap.data("class") : "",
			parent_id = typeof elem_wrap.data("parent-id") !== "undefined" ? elem_wrap.data("parent-id") : "",
			show_filter = typeof elem_wrap.data("show-filter") !== "undefined" ? elem_wrap.data("show-filter") : 0,
			snippet = typeof elem_wrap.data("snippet") !== "undefined" ? elem_wrap.data("snippet") : 'pdoResources',
			elemActive = elem_wrap.find(".ajaxFilterResource.active");

		if (elem_parent_id != "") {
			elem_wrap.data("parent-id", elem_parent_id);
			elem_wrap.data("show-filter", elem_show_filter);
			parent_id = elem_wrap.data("parent-id");
			show_filter = elem_wrap.data("show-filter");
			if (elem_lists != null) $("." + elem_lists + " .ajaxFilterResource").removeClass("active");
		} else {
			if (elemActive.length) {
				let n = 0;
				$.each(elemActive, function (i, v) {
					let vid = v.getAttribute("data-vid"),
						item_wrap = v.closest("[data-tv-name]"),
						tv_name = item_wrap != null ? item_wrap.getAttribute("data-tv-name") : null,
						tv_multy = item_wrap != null ? item_wrap.getAttribute("data-tv-multy") : 0,
						tv_id = item_wrap != null ? item_wrap.getAttribute("data-tv-id") : null;
					if (tv_name != null) {
						sendData.filters[n] = {
							vid: vid,
							tv_name: tv_name,
							tv_id: tv_id,
							tv_multy: tv_multy,
						};
						n++;
					}
				});
			}
		}

		if (show_filter) $(".case__list-tag").fadeIn(300);
		else $(".case__list-tag").fadeOut(300);

		if (path_to_file != "") {
			sendData.snippet = snippet;
			sendData.parent_id = parent_id != "" ? parseInt(parent_id) : 0;

			$.ajax({
				url: path_to_file,
				method: "POST",
				data: sendData,
				dataType: "html",
				async: true,
				processData: true,
				cache: false,
				beforeSend: function () {
					$("." + html_class)
						.addClass("preloader")
						.html(preloaderHtml);
				},
				success: function (html) {
					let code = $("<div></div>").html(html),
						innerHtml = code.html();
					$("." + html_class).html(innerHtml);
					switch (html_class) {
						case "case__list":
						case "pdoPageList":
							sectionCase();
							let pagination = $("." + html_class).find('.pagination');
							if (pagination.length) {
								pagination.hide();
							}
							if (html_class == 'pdoPageList') {
								if (typeof pdoPage.Reached !== 'undefined')
									pdoPage.Reached = false;
								if (typeof pdoPage.keys.page !== 'undefined')
									pdoPage.keys.page = 1;
							}
							break;
						default:
							console.log("CLASS", html_class);
					}
				},
				error: function (data) {
					console.log("ERROR", data);
				},
				complete: function () {
					$("." + html_class).removeClass("preloader");
				},
			});
		}
	});
});