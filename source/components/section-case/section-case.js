import TweenMax from "gsap";
import match from "../../js/app";
import {phoneMask} from "../../js/app";
import swiperTrust from "../section-trust/section-trust";
import tabContainers from "../section-questions/tab-containers";
import activePlaceholder from "../section-order-form/section-order-form";


function sectionCase(){
	// Функция получения случайного числа от min до (max+1)
	function randomInteger(min, max) {
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}

	// Массив элементов
	let arrCardCase = Array.prototype.slice.call(document.querySelectorAll(".case__item"));

	// Функция разбития массива на подмассивы
	function chunkArray(myArray, chunkSize) {
		let results = [],
			kRs = 0;
		if (myArray.length) {
			for (let i in myArray) {
				if (results[kRs] == null)
					results[kRs] = [];
				results[kRs].push(myArray[i]);
				kRs = kRs + 1;
				if (kRs > chunkSize)
					kRs = 0;
			}
		}
		return results;
	}

	// Функция уменьшения размера изображений
	function resizeImage(element) {
		let arrCard = element;
		let prevIndex = [];
		let resizeEl = 0;

		while (resizeEl < element.length / 2 && element.length >= 3) {
			let currentIndex = randomInteger(0, element.length - 1);

			if (!prevIndex.includes(currentIndex)) {
				prevIndex.push(currentIndex);

				let randomEl = arrCard[currentIndex];

				randomEl.classList.add("height-small");

				resizeEl += 1;
			}
		}
	}

	// Делим элементы на 3 или 2 колонки в зависимости от разрешения
	function splitColumn() {
		if (!match[1].matches) {
			let caseArr = Array.prototype.slice.call(document.querySelectorAll(".case__item"));

			document.querySelectorAll(".case__column").forEach((el) => el.remove());

			caseArr.forEach((el) => {
				el.classList.remove("height-small");
			});

			let result = chunkArray(caseArr, 2);

			result.forEach((element) => {
				let column = document.createElement("div");
				column.classList.add("case__column");

				resizeImage(element);

				element.forEach((el) => {
					column.append(el);
				});

				document.querySelector(".case__list").append(column);
			});
		} else {
			let caseArr = Array.prototype.slice.call(document.querySelectorAll(".case__item"));

			document.querySelectorAll(".case__column").forEach((el) => el.remove());

			caseArr.forEach((el) => {
				el.classList.remove("height-small");
			});

			let result = chunkArray(caseArr, 1);

			result.forEach((element) => {
				let column = document.createElement("div");
				column.classList.add("case__column");

				resizeImage(element);

				element.forEach((el) => {
					column.append(el);
				});

				document.querySelector(".case__list").append(column);
			});
		}
	}

	splitColumn();
	match[1].addListener(splitColumn);

	// Анимация появления элементов

	const animItems = Array.prototype.slice.call(document.querySelectorAll(".anim-items"));

	if (animItems.length > 0) {
		window.addEventListener("scroll", animOnScroll);
		function animOnScroll() {
			animItems.forEach((element) => {
				const animItem = element;
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 3; // начало анимации при достижении скролом 1/10 части элемента

				let animItemPoint = window.innerHeight - animItemHeight / animStart;

				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
					animItem.classList.add("animate");
				} else {
					if (!animItem.classList.contains("anim-no-scrollTop")) {
						animItem.classList.remove("animate");
					}
				}
			});

			function offset(el) {
				var rect = el.getBoundingClientRect(),
					scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
			}
		}
		// setTimeout(animOnScroll, 0);
		animOnScroll();
	}

	// Функция привязки path к элементу

	function attributesSerializer(element, attributes) {
		return new Proxy(element, {
			get(el, prop) {
				if (prop === "$attrs") return this.$attrs;
				if (this.$attrs[prop]) return this.$attrs[prop];
				const val = el[prop];
				return typeof val === "function" ? val.bind(el) : val;
			},
			set(el, prop, val) {
				if (prop in this.$attrs) return false;
				return (el[prop] = val), true;
			},
			$attrs: attributes.reduce((r, { attr, delim = " " }) => {
				r[attr] = new Proxy(
					{},
					{
						get(obj, i) {
							const values = element
								.getAttribute(attr)
								.split(delim)
								.map((v) => v.trim());
							return values[i];
						},
						set(obj, i, newVal) {
							const values = element
								.getAttribute(attr)
								.split(delim)
								.map((v) => v.trim());
							values[i] = newVal;
							element.setAttribute(attr, values.join(delim));
							return true;
						},
					}
				);
				return r;
			}, {}),
		});
	}

	// Создаем массив объектов с координатами каждой карточки и координатами точек path

	let arrCord = arrCardCase.map((el) => {
		return {
			currentEl: el,
			y: el.querySelector(".case__image").getBoundingClientRect().top + pageYOffset - 100,
			x: el.querySelector(".case__image").getBoundingClientRect().left + pageXOffset,

			offsetTopRightY: 0,
			offsetTopRightX: el.querySelector(".case__image").clientWidth,
			offsetTopLeftX: 0,
			offsetTopLeftY: 0,

			offsetBottomRightY: el.querySelector(".case__image").clientHeight,
			offsetBottomRightX: el.querySelector(".case__image").clientWidth,
			offsetBottomLeftY: el.querySelector(".case__image").clientHeight,
			offsetBottomLeftX: 0,

			offsetTop: 0,
			offsetBottom: 0,
			offsetRight: el.querySelector(".case__image").clientWidth,
			offsetLeft: 0,

			path: attributesSerializer(el.querySelector("path"), [{ attr: "d", delim: "\n" }]),

			upadateCoord: function () {
				this.y = this.currentEl.querySelector(".case__image").getBoundingClientRect().top + pageYOffset - 100;
				this.x = this.currentEl.querySelector(".case__image").getBoundingClientRect().left + pageXOffset;
			},
		};
	});

	window.addEventListener("resize", () => {
		arrCord.forEach((element) => {
			element.upadateCoord();
		});
	});

	// Анимация каждой точки path при движении мыши

	function animPath(e) {
		let coordMousePageY = e.type == "touchmove" ? e.targetTouches[0].pageY : e.pageY;
		let coordMousePageX = e.type == "touchmove" ? e.targetTouches[0].pageX : e.pageX;

		arrCord.forEach((element, index, array) => {
			let heightEl = arrCardCase[index].querySelector(".case__image").clientHeight;
			let widthEl = arrCardCase[index].querySelector(".case__image").clientWidth;

			if (element.y - coordMousePageY < 50 && element.y - coordMousePageY > -(heightEl + 50) && element.x - coordMousePageX < 50 && element.x - coordMousePageX > -(widthEl + 50)) {
				// console.log(element.x - coordMousePageX / 1.2);
				TweenMax.to(element, 0.5, {
					offsetTop: coordMousePageX - element.x > widthEl / 4 && coordMousePageX - element.x < widthEl / 1.33 && coordMousePageY - element.y < heightEl / 4 ? coordMousePageY - element.y + heightEl / 5 : 0,

					offsetBottom: coordMousePageX - element.x > widthEl / 4 && coordMousePageX - element.x < widthEl / 1.33 && coordMousePageY - element.y > heightEl / 1.33 ? coordMousePageY - element.y - heightEl / 5 : heightEl,

					offsetLeft: coordMousePageY - element.y > heightEl / 4 && coordMousePageY - element.y < heightEl / 1.33 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageX - element.x + widthEl / 5 : 0,

					offsetRight: coordMousePageY - element.y > heightEl / 4 && coordMousePageY - element.y < heightEl / 1.33 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageX - element.x - widthEl / 5 : widthEl,

					offsetTopRightY: coordMousePageY - element.y < heightEl / 4 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageY - element.y + heightEl / 7 : 0,

					offsetTopRightX: coordMousePageY - element.y < heightEl / 4 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageX - element.x - widthEl / 7 : widthEl,

					offsetTopLeftY: coordMousePageY - element.y < heightEl / 4 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageY - element.y + heightEl / 7 : 0,

					offsetTopLeftX: coordMousePageY - element.y < heightEl / 4 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageX - element.x + widthEl / 7 : 0,

					offsetBottomRightY: coordMousePageY - element.y > heightEl / 1.33 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageY - element.y - heightEl / 7 : heightEl,

					offsetBottomRightX: coordMousePageY - element.y > heightEl / 1.33 && coordMousePageX - element.x > widthEl / 1.33 ? coordMousePageX - element.x - widthEl / 7 : widthEl,

					offsetBottomLeftY: coordMousePageY - element.y > heightEl / 1.33 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageY - element.y - heightEl / 7 : heightEl,

					offsetBottomLeftX: coordMousePageY - element.y > heightEl / 1.33 && coordMousePageX - element.x < widthEl / 4 ? coordMousePageX - element.x + widthEl / 7 : 0,

					onUpdate: () => {
						element.path.d[0] = `M ${element.offsetTopLeftX} ${element.offsetTopLeftY} Q ${widthEl / 2} ${element.offsetTop} ${element.offsetTopRightX} ${element.offsetTopRightY} Q ${element.offsetRight} ${heightEl / 2} ${element.offsetBottomRightX} ${element.offsetBottomRightY} Q ${widthEl / 2} ${element.offsetBottom} ${element.offsetBottomLeftX} ${element.offsetBottomLeftY} Q ${element.offsetLeft} ${heightEl / 2} ${element.offsetTopLeftX} ${element.offsetTopLeftY}`;
					},
				});
			} else {
				TweenMax.to(element, 0.5, {
					offsetTop: 0,
					offsetTopRightY: 0,
					offsetTopRightX: widthEl,
					offsetTopLeftX: 0,
					offsetTopLeftY: 0,
					offsetBottomRightY: heightEl,
					offsetBottomRightX: widthEl,

					offsetBottomLeftY: heightEl,
					offsetBottomLeftX: 0,
					offsetBottom: heightEl,
					offsetLeft: 0,
					offsetRight: widthEl,
					onUpdate: () => {
						element.path.d[0] = `M ${element.offsetTopLeftX} ${element.offsetTopLeftY} Q ${widthEl / 2} ${element.offsetTop} ${element.offsetTopRightX} ${element.offsetTopRightY} Q ${element.offsetRight} ${heightEl / 2} ${element.offsetBottomRightX} ${element.offsetBottomRightY} Q ${widthEl / 2} ${element.offsetBottom} ${element.offsetBottomLeftX} ${element.offsetBottomLeftY} Q ${element.offsetLeft} ${heightEl / 2} ${element.offsetTopLeftX} ${element.offsetTopLeftY}`;
					},
				});
			}
		});
	}

	if (document.querySelector(".case") != null) {
		document.querySelector(".case").addEventListener("mousemove", animPath);
		document.querySelector(".case").addEventListener("touchmove", animPath);
	}
};

$(function(){
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
				ajaxFormScriptPath = '/assets/components/ajaxform/',
				ajaxFormScripts = [
					ajaxFormScriptPath + 'js/lib/jquery.form.min.js',
					ajaxFormScriptPath + 'js/lib/jquery.jgrowl.min.js',					
					ajaxFormScriptPath + 'js/default.js'
				];

			if (typeof path_to_file !== "undefined" && path_to_file != '') {
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
						file_wrapper.after(innerHtml);
						file_wrapper.remove();
						
						switch (tpl) {
							case 'section-cases':
								sectionCase();
							break;
							case 'section-trust':
								swiperTrust();
								tabContainers();
							break;
							case 'sectDiscussProject':
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
										document.body.appendChild(css);
								for (let i in ajaxFormScripts) {
									let script = document.createElement('script');
									script.src = ajaxFormScripts[i];
									if (document.querySelector('[src="'+ ajaxFormScripts[i] + '"]') == null)
										document.body.appendChild(script);
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
		});
	}

	/*AJAX LOADING FROM FILE*/
	$("body").on('click', '.ajaxFilterResource', function(){
		let elem = $(this),
			elem_vid = typeof elem.data("vid") !== "undefined" ? elem.data("vid") : "",
			elem_parent_id = typeof elem.data("parent-id") !== "undefined" ? elem.data("parent-id") : "",
			elem_show_filter = typeof elem.data("show-filter") !== "undefined" ? elem.data("show-filter") : 0,
			elem_wrap = elem.closest("[data-path-to-file]"),
			elem_lists = typeof elem_wrap.data("class-list") !== "undefined" ? elem_wrap.data("class-list") : null,		
			sendData = {
				action: 'filter',
				filters: [],
			};

		// if (elem_vid == 'all')
		// 	$('.'+elem_lists+' .ajaxFilterResource').removeClass('active');

		if (elem.hasClass('active'))
			elem.removeClass('active');
		else
			elem.addClass('active').siblings().removeClass('active');

		if (!elem_wrap.length)
			return false;

		let path_to_file = typeof elem_wrap.data("path-to-file") !== "undefined" ? elem_wrap.data("path-to-file") : "",
			html_class = typeof elem_wrap.data("class") !== "undefined" ? elem_wrap.data("class") : "",
			parent_id = typeof elem_wrap.data("parent-id") !== "undefined" ? elem_wrap.data("parent-id") : "",
			show_filter = typeof elem_wrap.data("show-filter") !== "undefined" ? elem_wrap.data("show-filter") : 0,
			elemActive = elem_wrap.find('.ajaxFilterResource.active');

		if (elem_parent_id != '') {
			elem_wrap.data('parent-id',elem_parent_id);
			elem_wrap.data('show-filter',elem_show_filter);
			parent_id = elem_wrap.data("parent-id");
			show_filter = elem_wrap.data("show-filter");
			if (elem_lists != null)
				$('.'+elem_lists+' .ajaxFilterResource').removeClass('active');
		} else {
			if (elemActive.length) {
				let n = 0;
				$.each(elemActive, function (i, v) {
					let vid = v.getAttribute('data-vid'),
						item_wrap = v.closest('[data-tv-name]'),
						tv_name = item_wrap != null ? item_wrap.getAttribute('data-tv-name') : null,
						tv_multy = item_wrap != null ? item_wrap.getAttribute('data-tv-multy') : 0,
						tv_id = item_wrap != null ? item_wrap.getAttribute('data-tv-id') : null;
					if (tv_name != null) {
						sendData.filters[n] = {
							vid: vid,
							tv_name: tv_name,
							tv_id: tv_id,
							tv_multy: tv_multy
						};
						n++;
					}
				});
			}
		}

		if (show_filter)
			$('.case__list-tag').fadeIn(300);
		else
			$('.case__list-tag').fadeOut(300);

		if (path_to_file != '') {
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
					$('.'+html_class).addClass('preloader').html(preloaderHtml);
				},
				success: function (html) {
					let code = $('<div></div>').html(html),
						innerHtml = code.html();
					$('.'+html_class).html(innerHtml);
					switch (html_class) {
						case 'case__list':
							sectionCase();
						break;
						default:
							console.log('CLASS',html_class);
					}
				},
				error: function (data) {
					console.log('ERROR',data);
				},
				complete: function(){
					$('.'+html_class).removeClass('preloader');
				}
			});
		}
	});
});
