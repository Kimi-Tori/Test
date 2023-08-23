window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const buttonSelect = document.querySelector('.select')
    const selectListContainer = document.querySelector('.select-list-container')
    let selectListItem = document.querySelectorAll('.select__list-item')

    const form = document.getElementById('form')
    const inpFile = document.getElementById('inpFile')
    const progressBarFill = document.querySelector('#progressBar > .progress-bar-fill')
    const progressBarText = document.querySelector('.progress-bar-text')

    const burgerBTN = document.querySelector('.burger-menu')
    const burgerMenu = document.querySelector('.burger-navbar-ul')
    const htmlElement = document.querySelector("html");

    // Скрипты для кастомного select
    buttonSelect.addEventListener('click', () => {
        selectListContainer.style.display = selectListContainer.style.display === 'block' ? 'none' : 'block';
    })
    selectListItem.forEach( (listItem) => {
        listItem.addEventListener('click', (event) => {
            event.stopPropagation()
            
            buttonSelect.innerText = event.target.innerText
            selectListContainer.style.display = 'none';
        })
    });
    document.addEventListener('click', (event) => {
        if (event.target !== buttonSelect) {
            selectListContainer.style.display = 'none';
        }
    })
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Tab' || event.key === 'Escape') {
            selectListContainer.style.display = 'none';
        }
    })

    // AJAX запрос на отправку формы (сделано только для файла)
    form.addEventListener('submit', uploadFile)

    function uploadFile (event) {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', "upload.php");
        xhr.upload.addEventListener('progress', event => {
            const percent = event.lengthComputable ? (event.loaded / event.total) * 100 : 0; // переводим значение в проценты от 0 до 100

            progressBarFill.style.left = 'calc(' + percent.toFixed(0) + '% - 12.5px)';
            progressBarText.textContent = percent.toFixed(0) + '%';
        })

        xhr.setRequestHeader('Content-Type', 'multipart/form-data')
        xhr.send(new FormData(form)) // по статусу в network эта строка почему-то выдает ошибку (405 Method Not Allowed) с чем связана эта ошибка я понять так и не смог
    }

    // Скрипт для открытия бургер меню
    const media768 = window.matchMedia('(max-width: 768px)') // создаем медиа условие проверяющее viewports на ширину <= 768px
    if (media768.matches) {
        burgerBTN.addEventListener('click', () => {
            burgerMenu.style.display = burgerMenu.style.display === 'flex' ? 'none' : 'flex';
            htmlElement.style.overflow = htmlElement.style.overflow === 'hidden' ? 'auto' : 'hidden';

            const navbarLinkBurger = document.querySelectorAll('.navbar-link');
            navbarLinkBurger.forEach( (burgerList) => {
                burgerList.addEventListener('click', () => {
                    burgerMenu.style.display = 'none';
                    htmlElement.style.overflow = 'auto';
                })
            });
        })
    }


})