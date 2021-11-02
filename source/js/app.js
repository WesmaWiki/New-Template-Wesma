import sectionPartners from "../components/section-partners/section-partners";
import sectionCase from "../components/section-case/section-case";
import floatingMenu from "../components/floating-menu/floating-menu";
import btnMagic from "../components/blocks/btn-magic/btn-magic";
import mainScreen from "../components/main-screen/main-screen";
import sectionLogo from "../components/section-logo/section-logo";
import sectionDevelop from "../components/section-develop/section-develop";
import sectionTrust from "../components/section-trust/section-trust";
import sectionOurClients from "../components/section-ourClients/section-ourClients";
import sectionOrderForm from "../components/section-order-form/section-order-form";
import header from "../components/header/header";
import footer from "../components/footer/footer";

//page CPC
import sectionAdvertisement from "../components/section-advertisement/section-advertisement";
import sectionCertificate from "../components/section-certificate/section-certificate";
import sectionQuestions from "../components/section-questions/section-questions";
import sectionHistory from "../components/section-history/section-history";

//page company
import sectionOffice from "../components/section-office/section-office.js";
import sectionOrderVacancy from "../components/section-order-vacancy/section-order-vacancy.js";

//page develop-site
import sectionDevelopSite from "../components/section-develop-site/section-develop-site";

import tabContainers from "../components/section-questions/tab-containers";

//phoneMask
import Inputmask from "inputmask";
import activePlaceholder from "../components/section-order-form/section-order-form";

let match = [window.matchMedia("(max-width: 1170px)"), window.matchMedia("(max-width: 1300px)")];
tabContainers();

document.addEventListener("click", function (e) {
	let element = e.target,
		body = document.body,
		scrollAnim = element.getAttribute('data-scroll-to-anim'),
		scrollAnimParent = element.closest('[data-scroll-to-anim]') != null ? element.closest('[data-scroll-to-anim]').getAttribute('data-scroll-to-anim') : null;
	if (element.closest(".popupImageLink")) {
		let link = element.closest(".popupImageLink").getAttribute('data-href');
		if (link != null) {
			let modal = document.createElement('div');
			modal.classList.add('modal','popup-general','--zoom-img');
			modal.innerHTML = '<div class="popup-general__popup-wrap"><div class="popup-general__body"></div><div class="popup-general__close js-modal-close"></div></div>';
			
			if (body.querySelector(".popup-general") == null) {
				body.append(modal);
			}
			if (body.querySelector(".popup-general__body") != null) {
				body.querySelector(".popup-general__body").innerHTML = '<img src="'+link+'"/>';
			} else {
				let modalBody = document.createElement('div');
				modalBody.classList.add('popup-general__body');
				modalBody.innerHTML = '<img src="'+link+'"/>';
				body.querySelector(".popup-general__popup-wrap").append(modalBody);
			}
			fadeIn(body.querySelector(".popup-general"),100,body);			
		}
	}
	if (element.closest(".popupFileFromLink") || element.classList.contains('popupFileFromLink')) {
		let targetElement = element.classList.contains('popupFileFromLink') ? element : element.closest(".popupFileFromLink"),
			path_to_file = targetElement.getAttribute('data-path-to-file'),
			tpl = targetElement.getAttribute('data-tpl'),
			type = targetElement.getAttribute('data-type'),
			sendData = {},
			ajaxFormScriptPath = '/assets/components/ajaxform/',
			ajaxFormScripts = [
				ajaxFormScriptPath + 'js/lib/jquery.form.min.js',
				ajaxFormScriptPath + 'js/lib/jquery.jgrowl.min.js',					
				ajaxFormScriptPath + 'js/default.js'
			];
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
					let code = $('<div></div>').html(html),
						innerHtml = code.html();
					
					switch (type) {
						case 'PopupForm':
							let modal = document.createElement('div');
							modal.classList.add('modal','popup-general');
							modal.innerHTML = '<div class="popup-general__popup-wrap"><div class="popup-general__body"></div><div class="popup-general__close js-modal-close"></div></div>';
							
							if (body.querySelector(".popup-general") == null) {
								body.append(modal);
							}
							if (body.querySelector(".popup-general__body") != null) {
								body.querySelector(".popup-general__body").innerHTML = innerHtml;
							} else {
								let modalBody = document.createElement('div');
								modalBody.classList.add('popup-general__body');
								modalBody.innerHTML = innerHtml;
								body.querySelector(".popup-general__popup-wrap").append(modalBody);
							}
							fadeIn(body.querySelector(".popup-general"),100,body);

							let hiddenIpunts = document.querySelectorAll('[type="hidden"][name="sitename"]');
							if (hiddenIpunts != null && hiddenIpunts.length) {
								hiddenIpunts.forEach((element, index, array) => {
									element.setAttribute('value', '');
								});
							}
							let css = document.createElement('link');
								css.rel = "stylesheet";
								css.href = ajaxFormScriptPath + 'css/default.css';
								if (document.querySelector('[href="'+ajaxFormScriptPath + 'css/default.css"]') == null)
									body.appendChild(css);
							for (let i in ajaxFormScripts) {
								let script = document.createElement('script');
								script.src = ajaxFormScripts[i];
								if (document.querySelector('[src="'+ ajaxFormScripts[i] + '"]') == null)
									body.appendChild(script);
							}
							activePlaceholder();
							phoneMask();
						break;

						default:
							console.log('CHANK',tpl);
					}
				},
				error: function (data) {
					console.log('ERROR',data);
				},
			});

			
		}		
	}
	if (element.classList.contains('js-modal-close') || element.classList.contains('popup-general')) {
		fadeOut(body.querySelector(".popup-general"),100,1,body);
	}
	if (scrollAnim != null || scrollAnimParent != null) {
		scrollAnim = scrollAnim != null ? scrollAnim : scrollAnimParent;
		let scrollAnimTo = scrollAnim != '' && (scrollAnim[0] == '.' || scrollAnim[0] == '#' || scrollAnim[0] == '[') ? body.querySelector(scrollAnim) : null,
			scrollAnimToPx = scrollAnimTo != null ? scrollAnimTo.getBoundingClientRect().top + window.pageYOffset : 0;
		window.scrollTo({
			top: scrollAnimToPx,
			behavior: "smooth",
		});
	}
});

document.addEventListener("change", function (e) {
	let element = e.target,
		elem_name = element.getAttribute('name'),
		body = document.body;
	if (element.closest(".input-box") || elem_name == 'file') {
		let fileName = element.files[0].name,
			textWrapper = element.closest(".input-box"),
			textTarget = textWrapper != null ? textWrapper.querySelector('.input-box__button') : null;
		if (fileName != null && textTarget != null) {
			textTarget.innerText = fileName;
		}
	}
});

export default match;

export function phoneMask() {
	Inputmask({
        mask: "+7 (Z99) 999-99-99",
        definitions: {
            Z: {
                validator: "[0-6,9]",
            },
        },
    }).mask('[type="tel"]');
};

export const fadeIn = (element, duration, lock_body) => {
    (function increment(value = 0) {
        element.style.opacity = String(value);
        if (element.style.opacity !== '1') {
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
        (element.style.opacity) < 0 ? element.style.display = 'none' : setTimeout(() => {
            decrement();
        }, duration / 10);
        if (remove != null && remove && (element.style.opacity) < 0) {
        	element.remove();	
        	if (lock_body != null && lock_body)
	        	lock_body.classList.remove("lock-modal");
        }

    })();
};

document.addEventListener(
	"DOMContentLoaded",
	function () {
		let hiddenHref = document.querySelectorAll('[data-hidden-href]');
		if (hiddenHref != null && hiddenHref.length) {
			hiddenHref.forEach(function(link) {
				let href = link.getAttribute('data-hidden-href'),
					l_class = link.getAttribute('class'),
					html = link.innerHTML;
				if (href != '') {
					let n_link = document.createElement("a");
					n_link.innerHTML = html;
					n_link.setAttribute('href', href);
					n_link.setAttribute('target', '_blank');
					if (l_class != null)
						n_link.setAttribute('class', l_class);
    				link.replaceWith(n_link);
				}
			});
		}
		phoneMask();
	},
	false
);