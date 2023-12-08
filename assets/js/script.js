let benefitsPerPage = {
    slidesPerView: 4,
};

let defaultPerPage = {
    slidesPerView: 3,
};

let defaultSpaceBetween = {
    spaceBetween: 20,
};

let newsSpaceBetween = {
    spaceBetween: 2,
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
    loop: false,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 800,
    breakpoints: {
        319: {
            slidesPerView: 'auto',
        },
        992: {
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
        },
    }
};

const benefitsSwiper = new Swiper('.benefits-swiper', { ...benefitsPerPage, ...defaultSpaceBetween, ...optionsSwiper });
const otherSliders = new Swiper('.js-swiper', { ...defaultPerPage, ...defaultSpaceBetween, ...optionsSwiper });
const newsSlider = new Swiper('.news-swiper', { ...defaultPerPage, ...newsSpaceBetween, ...optionsSwiper });

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

// const closePopup = () => {
//     iconMenu.classList.remove("active");
//     burgerMenu.classList.remove("active");
//     body.classList.remove("lock");
// };
// // close menu on link click
// document.querySelectorAll(".header__nav-item").forEach((link) => {
//     link.addEventListener("click", () => {
//         closePopup();
//     });
// });
// // close on click outside the menu
// document.onclick = function (e) {
//     if (
//         !burgerMenu.contains(e.target) &&
//         !e.target.parentNode.contains(iconMenu)
//     ) {
//         closePopup();
//     }
// };
const closePopup = (e) => {
    if (!e.target.classList.contains("header__nav-item__link")) {
        iconMenu.classList.remove("active");
        burgerMenu.classList.remove("active");
        body.classList.remove("lock");
    }
};
document.querySelectorAll(".header__nav-item").forEach((link) => {
    link.addEventListener("click", (e) => {
        if (!link.classList.contains("header__nav-item_sub")) {
            closePopup(e);
        }
    });
});
document.onclick = function (e) {
    if (
        !burgerMenu.contains(e.target) &&
        !e.target.parentNode.contains(iconMenu) &&
        !e.target.classList.contains("header__nav-item_submenu")
    ) {
        closePopup(e);
    }
};




// скролл header
let header = document.querySelector('.header');
let hideOnSm = document.querySelector('.hide-on-sm');
let showOnSm = document.querySelector('.show-on-sm');

document.onscroll = function () {
    let scroll = window.scrollY;
    if (scroll > 300) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
}

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

$(document).on('click', '.info-item', function (e) {
    e.preventDefault();

    $(this).toggleClass('active').siblings().removeClass('active');

});

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

$(document).on('click', '.js-toggle-password', function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        $(this).siblings().attr('type', 'text');
    } else {
        $(this).siblings().attr('type', 'password');
    }
});


let modePagination1 = {
    pagination: {
        el: '.swiper-pagination-1',
        bulletClass: 'swiper-pagination-bullet-custom',
        bulletActiveClass: 'swiper-pagination-bullet-custom--active',
        renderBullet: function (index, className) {
            return `<div class="${className}" data-index="${index}"><span></span></div>`
        },
    },
    breakpoints: {
        768: {
            navigation: {
                nextEl: ".swiper-navigation-1 .mode-arrow-next",
                prevEl: ".swiper-navigation-1 .mode-arrow-prev",
            },
            // allowTouchMove: true,
            // slidesPerView: 2,
        },
    },
}

let modePagination2 = {
    pagination: {
        el: '.swiper-pagination-2',
        bulletClass: 'swiper-pagination-bullet-custom',
        bulletActiveClass: 'swiper-pagination-bullet-custom--active',
        renderBullet: function (index, className) {
            return `<div class="${className}" data-index="${index}"><span></span></div>`
        },
    },
    breakpoints: {
        768: {
            navigation: {
                nextEl: ".swiper-navigation-2 .mode-arrow-next",
                prevEl: ".swiper-navigation-2 .mode-arrow-prev",
            },
            // slidesPerView: 2,
        },
    },
}

let modeOptions = {
    slidesPerView: 2,
    centeredSlides: true,
    roundLengths: true,
    loop: true,
    loopAdditionalSlides: 30,
    speed: 800,
    // grabCursor: false,
    // allowTouchMove: true,
    // loopAdditionalSlides: 2,
    // centeredSlides: true,
    // slidesPerView: 1.4,'
    // slideToClickedSlide: true,
    // init: false,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 400,
        modifier: 1,
        slideShadows: false,
    },
};

let modeSlider1 = new Swiper('.mode__slider-1', { ...modeOptions, ...modePagination1 });
let modeSlider2 = new Swiper('.mode__slider-2', { ...modeOptions, ...modePagination2 });

$(document).on('click', '.mode__slider-1 .swiper-slide-prev', function () {
    modeSlider1.slidePrev();
});

$(document).on('click', '.mode__slider-2 .swiper-slide-prev', function () {
    modeSlider2.slidePrev();
});

$(document).on('click', '.mode__slider-1 .swiper-slide-next', function () {
    modeSlider1.slideNext();
});

$(document).on('click', '.mode__slider-2 .swiper-slide-next', function () {
    modeSlider2.slideNext();
});

$(document).on('click', '.js-popup', function () {
    const popup = $(this).data('popup');
    $('.popup[data-popup="' + popup + '"]').addClass('active');
    $('body').addClass('overflow-hidden');

    // if (popup == 'comfort') {
    //     if (!$('.mode__slider-1').hasClass('swiper-initialized')) {
    //         setTimeout(() => {
    //             modeSlider1.init();
    //         }, 10);
    //     }
    // } else {
    //     if (!$('.mode__slider-2').hasClass('swiper-initialized')) {
    //         setTimeout(() => {
    //             modeSlider2.init();
    //         }, 10);
    //     }
    // }
});

$(document).on('click', '.js-popup-close', function () {
    $('.popup').removeClass('active');
    $('body').removeClass('overflow-hidden');
});

// Функция для добавления ведущих нулей к числам меньше 10
function addLeadingZero(num) {
    return (num < 10) ? "0" + num : num;
}

// Функция для склонения слов в зависимости от числа
function pluralizeWord(number, one, two, five) {
    number = Math.abs(number) % 100;
    var num1 = number % 10;
    if (number > 10 && number < 20) return five;
    if (num1 > 1 && num1 < 5) return two;
    if (num1 == 1) return one;
    return five;
}

// Функция для обновления таймера
function updateTimer() {
    var now = new Date();
    var targetDate = new Date("2023-12-09");

    var timeDifference = targetDate.getTime() - now.getTime();

    // Вычисление дней, часов, минут и секунд
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Получение склонений для дней, часов, минут и секунд
    var daysWord = pluralizeWord(days, 'день', 'дня', 'дней');
    var hoursWord = pluralizeWord(hours, 'час', 'часа', 'часов');
    var minutesWord = pluralizeWord(minutes, 'минута', 'минуты', 'минут');
    var secondsWord = pluralizeWord(seconds, 'секунда', 'секунды', 'секунд');

    // Обновление содержимого элементов с нужными стилями и склонениями
    document.getElementById("days").innerHTML = addLeadingZero(days);
    document.getElementById("days-word").innerHTML = daysWord;
    document.getElementById("hours").innerHTML = addLeadingZero(hours);
    document.getElementById("hours-word").innerHTML = hoursWord;
    document.getElementById("minutes").innerHTML = addLeadingZero(minutes);
    document.getElementById("minutes-word").innerHTML = minutesWord;
    document.getElementById("seconds").innerHTML = addLeadingZero(seconds);
    document.getElementById("seconds-word").innerHTML = secondsWord;

    // Обновление таймера каждую секунду
    setTimeout(updateTimer, 1000);
}

// Запуск обновления таймера при загрузке страницы
updateTimer();


$(document).on("click", ".icon-question", function () {
    $(this).siblings(".tooltip").addClass("active");
    $("body").addClass("body__overlay");
});

$(document).on("click", ".icon-close", function () {
    $(".tooltip").removeClass("active");
    $("body").removeClass("body__overlay");
});

function recaptchaCallback() {
    let el = $('.recaptcha');
    el.removeClass('error');
    el.find('.error__message').remove();
};

const validateFields = () => {
    let errorCounter = 0;
    $('.form__registration input[required]').each(function () {
        let result = validateField($(this).val(), $(this).attr('id'), $(this).parent());
        if (!result) errorCounter++;
    });

    if (errorCounter > 0) return false;
    return true;
}

const validateField = (value, type, parentEl) => {
    let error_message = '';
    let empty_message = '';
    let errorCounter = 0;

    let loginValid = /^[a-zA-Z]{4,11}$/;
    let emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    switch (type) {
        case 'input__login':
            empty_message = 'Придумай логин';
            error_message = 'Только английские буквы. От 4 до 11 символов';
            break;
        case 'input__password':
            empty_message = 'Придумай сложный пароль';
            error_message = 'Длина пароля должна быть от 8 символов';
            break;
        case 'input__email':
            empty_message = 'Введи адрес электронной почты';
            error_message = 'Введи верный адрес электронной почты';
            break;

    }

    if (value == '') {
        parentEl.addClass('error');
        if (parentEl.find(".error__message").length == 0) {
            parentEl.append("<div class='error__message'>" + empty_message + "</div>")
        }
    }

    if (type == 'input__login' && !loginValid.test(value)) {
        errorCounter++;
    }

    if (type == 'input__password' && value.length < 8) {
        errorCounter++;
    }

    if (type == 'input__email' && !emailValid.test(value)) {
        errorCounter++;
    }

    if (errorCounter > 0) {
        parentEl.addClass('error');
        if (parentEl.find(".error__message").length == 0) {
            parentEl.append("<div class='error__message'>" + error_message + "</div>")
        }
    } else {
        return true;
    }

    return false;
};

$(document).on("change", ".form__field-input", function () {
    let inputValue = $(this).val();
    let parentEl = $(this).parent();
    let type = $(this).attr('id');

    validateField(inputValue, type, parentEl);
});

$(document).on("input", ".form__field-input", function () {
    let parentEl = $(this).parent();
    parentEl.removeClass("error");
    parentEl.find(".error__message").remove();
});

$(document).on("blur", ".form__field-input", function () {
    let inputValue = $(this).val();
    let parentEl = $(this).parent();
    if (inputValue == '') {
        parentEl.addClass('error');
        if (parentEl.find(".error__message").length == 0) {
            parentEl.append("<div class='error__message'>Придумай логин</div>")
        }
    }
});

$(document).on('submit', '.form__registration', function () {
    let response = grecaptcha.getResponse();
    let parentEl = $('.recaptcha');

    if (response.length === 0) {
        parentEl.addClass('error');
        if (parentEl.find(".error__message").length == 0) {
            parentEl.append("<div class='error__message'>Проверка ReCaptcha не пройдена.</div>")
        }
    } else {
        parentEl.removeClass('error');
        parentEl.find('.error__message').remove();
    }

    if (validateFields()) {
        $('.registration__account').hide();
        $('.js-login-prefix').html($('#input__login_prefix').val() + '.');
        $('.js-login').html($('#input__login').val());
        $('.js-password').html($('#input__login').val());
        if ($('#prize_value').val()) {
            let prizeEl = $('.game__list-item[data-item="' + $('#prize_value').val() + '"]');
            let prizeImage = prizeEl.find('img').attr('src');
            $('.registration__success').find('.mini__game-prize').addClass('active');
            $('.js-prize-title').text(prizeEl.data('title'));
            $('.js-prize-image').css('background-image', 'url(' + prizeImage + ')');
        }

        $('.registration__success').addClass('active')
    }

    return false;
});

$(document).on('click', 'a.form__field-submit', function (e) {
    e.preventDefault();
    $(this).parents('form').trigger('submit');
});
