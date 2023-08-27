let benefitsPerPage = {
    slidesPerView: 4,
};
let defaultPerPage = {
    slidesPerView: 3,
};

let optionsSwiper = {
    pagination: {
        el: '.swiper-pagination',
        bulletClass: 'swiper-pagination-bullet-custom',
        bulletActiveClass: 'swiper-pagination-bullet-custom--active',
        renderBullet: function (index, className) {
            return `<div class="${className}" data-index="${index}"><span></span></div>`
        },
        clickable: true
    },
    grabCursor: true,
    watchOverflow: true,
    centeredSlides: true,
    loop: false,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 800,
    spaceBetween: 20,
    breakpoints: {
        319: {
            slidesPerView: 'auto',
        },
        768: {
            navigation: false,
            pagination: false,
            centeredSlides: false,
        },
    },
    on: {
        init: function () {
            const _self = this;
            _self.el.style.setProperty('--delay', _self.params.autoplay.delay);

            _self.el.addEventListener('mouseenter', function () {
                _self.el.classList.add('swiper--pause');
                _self.autoplay.stop();
            });

            _self.el.addEventListener('mouseleave', function () {
                _self.el.classList.remove('swiper--pause');
                _self.autoplay.start();
            });
        }
    }
};

const benefitsSwiper = new Swiper('.benefits-swiper', { ...benefitsPerPage, ...optionsSwiper });
const otherSliders = new Swiper('.js-swiper', { ...defaultPerPage, ...optionsSwiper });

// burger menu 
const iconMenu = document.querySelector('.burger');
const burgerMenu = document.querySelector(".header__nav");
const body = document.body;

// open menu
iconMenu.addEventListener("click", function (e) {
    iconMenu.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    body.classList.toggle("lock");
});

const closePopup = () => {
    iconMenu.classList.remove("active");
    burgerMenu.classList.remove("active");
    body.classList.remove("lock");
};

// close menu on link click
document.querySelectorAll(".header__nav-item").forEach((link) => {
    link.addEventListener("click", () => {
        closePopup();
    });
});

// close on click outside the menu
document.onclick = function (e) {
    if (
        !burgerMenu.contains(e.target) &&
        !e.target.parentNode.contains(iconMenu)
    ) {
        closePopup();
    }
};

// скролл header
let header = document.querySelector('.header');

document.onscroll = function () {
    let scroll = window.scrollY;
    if (scroll > header.clientHeight) {
        header.classList.add('fixed');
        document.body.style.paddingTop = '185px';
    } else {
        header.classList.remove('fixed');
        document.body.removeAttribute('style');
    }
}

//активное состояние меню для .header__nav-item

/* ЗАПУТАЛАСЬ */
// const navItems = document.querySelectorAll('.header__nav-item_sub');

// navItems.forEach(navItem => {
//     navItem.addEventListener('click', () => {
//         navItem.classList.toggle('active');
//         const submenu = navItem.querySelector('.header__nav-item_submenu');
//         submenu.classList.toggle('active');
//     });
// });
/* */

//Переключение табов для секции race
// const tab = function () {
//     let tabNav = document.querySelectorAll('.classes');
//     let tabContent = document.querySelectorAll('.race-block');

//     // Добавляем обработчик событий для каждого пункта навигации
//     tabNav.forEach(item => {
//         item.addEventListener('click', selectTabNav)
//     });

//     function selectTabNav() {
//         // Убираем класс active у всех пунктов навигации
//         tabNav.forEach(item => {
//             item.classList.remove('active');
//         });
//         // Добавляем класс active только выбранному пункту навигации
//         this.classList.add('active');
//         let tabBtn = this.getAttribute('data-page-path'); // получаем значение атрибута data-page-path у выбранного пункта навигации

//         selectTabContent(tabBtn);
//     }

//     function selectTabContent(tabBtn) {
//         // Проходимся по всем элементам контента, чтобы найти нужный для отображения и скрыть все остальные
//         tabContent.forEach(item => {
//             if (item.dataset.pageTarget == tabBtn) { // если элемент содержит класс с именем выбранного пункта навигации
//                 item.classList.add('active');
//             } else {
//                 item.classList.remove('active'); // скрываем все остальные элементы
//             }
//         });
//     }
// };
// tab();

// const pageBlock = document.querySelectorAll('.race-choice__item');
// const pageBtn = document.querySelectorAll('.race-choice__btn');

// let activePageContent = null;

// for (let i = 0; i < pageBlock.length; i++) {
//     pageBlock[i].addEventListener('click', function () {

//         const pageContent = this.querySelector('.race-item__content');
//         const arrow = this.querySelector('.arrow');

//         if (pageContent !== null) {
//             if (activePageContent !== null && activePageContent !== pageContent) {
//                 activePageContent.classList.remove('open');
//                 activePageContent.parentElement.querySelector('.arrow').classList.remove('active');
//             }
//             pageContent.classList.toggle('open');
//             activePageContent = pageContent;
//         }

//         if (arrow !== null) {
//             arrow.classList.toggle('active');
//         }
//     });
// }

// //Переключение табов для секции about server
// const tabServer = function () {
//     const tabServerItems = document.querySelectorAll(".server-item");
//     const serverContentItems = document.querySelectorAll('.server-content');

//     tabServerItems.forEach(item => {
//         item.addEventListener('click', selectServer);
//     });

//     function selectServer() {
//         tabServerItems.forEach(item => {
//             item.classList.remove('active');
//         });
//         this.classList.add('active');
//         const selectedServer = this.getAttribute('data-server');

//         selectContent(selectedServer);
//     }

//     function selectContent(selectedServer) {
//         serverContentItems.forEach(item => {
//             if (item.getAttribute('data-server-target') === selectedServer) {
//                 item.style.display = 'flex';
//             } else {
//                 item.style.display = 'none';
//             }
//         });
//     }
// };

// tabServer();

$(document).on('click', '.classes', function (e) {
    e.preventDefault();
    const type = $(this).data('page-path');
    $(this).addClass('active').siblings().removeClass('active');
    $('.race-block[data-page-target="' + type + '"').addClass('active').siblings().removeClass('active');
});

$(document).on('click', '.js-toggle-race', function (e) {
    $(this).toggleClass('active').siblings().removeClass('active');
});

$(document).on('click', '.server-item', function (e) {
    e.preventDefault();
    const type = $(this).data('server');
    $(this).addClass('active').siblings().removeClass('active');
    $('.server-content[data-server-target="' + type + '"]').addClass('active').siblings().removeClass('active');

});

// best players
$(document).on('click', '.js-show-top-players', function () {
    const tab = $(this).data('server');
    $('.table__item[data-table="' + tab + '"]').addClass('active').siblings().removeClass('active');
});

//табы для footer-info
const infoItems = document.querySelectorAll('.info-item');

let activeFooterContent = null;

for (let i = 0; i < infoItems.length; i++) {
    infoItems[i].addEventListener('click', function () {

        const pageContent = this.querySelector('.info-link');
        const arrow = this.querySelector('.plus');

        if (pageContent !== null) {
            if (activeFooterContent !== null && activeFooterContent !== pageContent) {
                activeFooterContent.classList.remove('open');
                activeFooterContent.parentElement.querySelector('.plus').classList.remove('active');
            }
            pageContent.classList.toggle('open');
            activeFooterContent = pageContent;
        }

        if (arrow !== null) {
            arrow.classList.toggle('active');
        }
    });
}

const tableButtons = document.querySelectorAll('.js-change-table');
const tableItems = document.querySelectorAll('.table__item');

for (let i = 0; i < tableButtons.length; i++) {
    tableButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        const tableIndex = this.dataset.table;
        const currentTable = document.querySelectorAll('.table__item[data-table="' + tableIndex + '"]');

        for (let i = 0; i < tableItems.length; i++) {
            tableItems[i].classList.remove('active');
        }

        currentTable[0].classList.add('active');

    });
}

const fun = () => { };
console.log(fun instanceof Object);