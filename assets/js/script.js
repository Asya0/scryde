const breakpoint = window.matchMedia('(min-width:767px)');
let mySwiper;

const breakpointChecker = function () {
    if (breakpoint.matches === true) {
        if (mySwiper !== undefined) mySwiper.destroy(true, true);
        return;
    } else if (breakpoint.matches === false) {
        return enableSwiper();
    }
};

breakpoint.addListener(breakpointChecker);

breakpointChecker();

function enableSwiper() {
    mySwiper = new Swiper('.js-swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        grabCursor: true,
        watchOverflow: true,
        centeredSlides: true,
        loop: false,
        speed: 800,
        slidesPerView: 'auto',
        spaceBetween: 20,
        breakpoints: {
            319: {
                slidesPerView: 'auto',
                spaceBetween: 20,
            },
            // 484: {
            //     slidesPerView: 1,
            // },
            // 768: {
            //     slidesPerView: 2,
            // },
        },
    });
}

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
// 





// 


//активное состояние меню для .header__nav-item
const navItems = document.querySelectorAll('.header__nav-item_sub');

navItems.forEach(navItem => {
    navItem.addEventListener('click', () => {
        navItem.classList.toggle('active');
    });
});

//Переключение табов для секции race
const tab = function () {
    let tabNav = document.querySelectorAll('.classes');
    let tabContent = document.querySelectorAll('.race-block');

    // Добавляем обработчик событий для каждого пункта навигации
    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        // Убираем класс active у всех пунктов навигации
        tabNav.forEach(item => {
            item.classList.remove('active');
        });
        // Добавляем класс active только выбранному пункту навигации
        this.classList.add('active');
        let tabBtn = this.getAttribute('data-page-path'); // получаем значение атрибута data-page-path у выбранного пункта навигации

        selectTabContent(tabBtn);
    }

    function selectTabContent(tabBtn) {
        // Проходимся по всем элементам контента, чтобы найти нужный для отображения и скрыть все остальные
        tabContent.forEach(item => {
            if (item.dataset.pageTarget == tabBtn) { // если элемент содержит класс с именем выбранного пункта навигации
                item.classList.add('active');
            } else {
                item.classList.remove('active'); // скрываем все остальные элементы
            }
        });
    }
};
tab();

const pageBlock = document.querySelectorAll('.race-choice__item');
const pageBtn = document.querySelectorAll('.race-choice__btn');

let activePageContent = null;

for (let i = 0; i < pageBlock.length; i++) {
    pageBlock[i].addEventListener('click', function () {

        const pageContent = this.querySelector('.race-item__content');
        const arrow = this.querySelector('.arrow');

        if (pageContent !== null) {
            if (activePageContent !== null && activePageContent !== pageContent) {
                activePageContent.classList.remove('open');
                activePageContent.parentElement.querySelector('.arrow').classList.remove('active');
            }
            pageContent.classList.toggle('open');
            activePageContent = pageContent;
        }

        if (arrow !== null) {
            arrow.classList.toggle('active');
        }
    });
}

//Переключение табов для секции server
const tabServer = document.querySelectorAll(".server-item");
function selectServer(tab) {
    tabServer.forEach(item => {
        item.classList.remove('active');
    });
    tab.classList.add('active');
}

tabServer.forEach((tab) => {
    tab.addEventListener("click", () => {
        selectServer(tab);
    });
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