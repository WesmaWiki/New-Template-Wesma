import hoverCard from "../section-develop-site/hover-card";

let showTab = (tumblerButton) => {

    const tumblerWrap = tumblerButton.closest('.card-dev-all__wrap');

    if (tumblerButton.classList.contains('--is-active')) {
        return;
    }

    const targetId = tumblerButton.dataset.tumblerId;
    const tumblerContent = tumblerWrap.querySelector(`.card-dev-all__text.is-tumbler[data-tumbler-id="${targetId}"]`);
    const formButton = tumblerWrap.querySelector(`.popupFileFromLink`);

    if (tumblerContent != null) {
        const tumblerButtonActive = tumblerWrap.querySelector('.--is-active');
        tumblerButtonActive.classList.remove('--is-active');

        const elTabPaneShow = tumblerWrap.querySelector('.--is-active');

        elTabPaneShow.classList.remove('--is-active');
        tumblerButton.classList.add('--is-active');
        tumblerContent.classList.add('--is-active');
    }

    if (formButton != null) {
        formButton.setAttribute('data-alt_params', JSON.stringify({'hours_tarif' : targetId}));
    }
}
  
document.addEventListener('click', (e) => {
    let element = e.target;
    if( element.closest('.card-dev-all__hours') || element.classList.contains('card-dev-all__hours')){
        const tumblerButton = element.closest('.card-dev-all__hours');    
        showTab(tumblerButton);
    }    
});