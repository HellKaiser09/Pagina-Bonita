function goBack() {
    window.history.back();
}

let btnBack = document.querySelector('.button_go_back');
btnBack.addEventListener('click', goBack);