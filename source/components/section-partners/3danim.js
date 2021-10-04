import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import match from "../../js/app";

document.addEventListener(
	"DOMContentLoaded",
	function () {
		window.addEventListener("load", () => {
			if (document.querySelector(".section-partners") != null) {
				let scene = null;
				let camera = null;
				let renderer = null;
				let mixer = null;
				let clock = new THREE.Clock();
				let mousePos = { x: 0, y: 0 };
				let timer = 0;
				let stop = [];
				let modelScene;
				let durAnim = 0;

				function handleMouseMove(event) {
					if (event.type == "touchmove") {
						let tx = -1 + (event.targetTouches[0].clientX / window.innerWidth) * 1;
						let ty = 1 - (event.targetTouches[0].clientY / window.innerHeight) * 1;
						mousePos = { x: tx, y: ty };
					} else {
						let tx = -1 + (event.clientX / window.innerWidth) * 1;
						let ty = 1 - (event.clientY / window.innerHeight) * 1;
						mousePos = { x: tx, y: ty };
					}
				}

				function normalize(v, vmin, vmax, tmin, tmax) {
					let nv = Math.max(Math.min(v, vmax), vmin);
					let dv = vmax - vmin;
					let pc = (nv - vmin) / dv;
					let dt = tmax - tmin;
					let tv = tmin + pc * dt;
					return tv;
				}

				function updatePos() {
					let targetX = normalize(mousePos.x, -0.7, 0.3, -0.7, 2);
					let targetY = normalize(mousePos.y, -0.3, 0.3, 0.1, 0.2);

					modelScene.rotation.y = targetX;
					modelScene.rotation.x = targetY;

					//   console.log(targetX);
					//   console.log(targetY);

					let delta = clock.getDelta();
					if (mixer != null) {
						mixer.update(delta);
					}
				}

				function init3D() {
					scene = new THREE.Scene();
					camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

					renderer = new THREE.WebGLRenderer({
						antialias: true,
						alpha: true,
					});

					let heightCanvas;

					function resizeCanvas() {
						if (!match[0].matches) {
							heightCanvas = document.querySelector(".section-partners").clientHeight;
						} else {
							heightCanvas = 500;
						}
					}

					resizeCanvas();
					match[0].addListener(resizeCanvas);

					renderer.setSize(window.innerWidth, heightCanvas);

					renderer.setPixelRatio(window.devicePixelRatio);

					window.addEventListener("resize", function () {
						renderer.setSize(window.innerWidth, heightCanvas);
						renderer.setPixelRatio(window.devicePixelRatio);
					});

					document.querySelector(".section-partners__canvas").appendChild(renderer.domElement);

					let ambientLight = new THREE.AmbientLight(0x080818);
					scene.add(ambientLight);

					let pointLight = new THREE.PointLight(0xffffff, 1, 100);
					pointLight.position.set(-5, 1, 5);
					scene.add(pointLight);

					camera.position.z = 5;
					camera.position.y = 1;

					//   console.log(camera);

					document.querySelector(".section-partners").addEventListener("mousemove", handleMouseMove, false);

					document.querySelector(".section-partners").addEventListener("touchmove", handleMouseMove, false);

					document.querySelector(".section-partners__wrap-list").addEventListener("click", (e) => {
						e.stopPropagation();
						stop.forEach((element) => {
							setTimeout(() => {
								if (element.repetitions == 1 && element.clampWhenFinished == "true") {
									element.timeScale = 1;
									element.reset();
								} else {
									element.repetitions = 1;
									element.clampWhenFinished = "true";
									element.play();
								}
							}, 0);
						});

						setTimeout(() => {
							document.querySelector(".section-partners__anchor").classList.add("active");
						}, durAnim * 1000);
					});

					let reloadButtons = document.querySelectorAll(".js-reload");

					if (reloadButtons != null) {
						reloadButtons.forEach((el) => {
							el.addEventListener("click", (e) => {
								stop.forEach((element) => {
									setTimeout(() => {
										element.timeScale = -1;
										element.reset();
									}, 0);
								});

								document.querySelector(".section-partners__anchor").classList.remove("active");
							});
						});
					}
				}
				var s3d_model = document.querySelector("[data-3dmodel]"),
					v3d_model = '/manager/templates/new-wesma/3d/gltf/new-model-2.gltf';
					if(s3d_model !== null) {
						v3d_model = s3d_model.getAttribute('data-3dmodel');
					}
				function loadScene() {
					// Instantiate a loader
					let loader = new GLTFLoader();

					// Load a glTF resource
					loader.load(v3d_model, function (gltf) {
						modelScene = gltf.scene;

						let newMaterial = new THREE.MeshStandardMaterial({ color: 0x5e6262 });
						modelScene.traverse((o) => {
							if (o.isMesh) o.material = newMaterial;
						});

						durAnim = gltf.animations[0].duration;

						function resizeModel() {
							if (!match[0].matches) {
								modelScene.scale.y = 0.02;
								modelScene.scale.x = 0.02;
								modelScene.scale.z = 0.02;
								modelScene.position.y = -0.4;
							} else {
								modelScene.position.y = -1;
								modelScene.scale.y = 0.035;
								modelScene.scale.x = 0.02;
								modelScene.scale.z = 0.02;
							}
						}

						resizeModel();
						match[0].addListener(resizeModel);

						scene.add(modelScene);

						mixer = new THREE.AnimationMixer(modelScene);

						gltf.animations.forEach((el) => {
							stop.push(mixer.clipAction(el));
						});

						console.log(gltf);
						render();
					});
				}

				function render() {
					requestAnimationFrame(render);

					updatePos();

					renderer.render(scene, camera);
				}

				init3D();
				loadScene();
			}
		});
	},
	false
);
