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
			return `<div class="${className}" data-index="${index}"><span></span></div>`;
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
const burgerMenu = document.querySelector('.header__nav');
const body = document.body;

// open menu
iconMenu.addEventListener('click', function (e) {
	iconMenu.classList.toggle('active');
	burgerMenu.classList.toggle('active');
	body.classList.toggle('lock');
});

const closePopup = (e) => {
	if (!e.target.classList.contains('header__nav-item__link')) {
		iconMenu.classList.remove('active');
		burgerMenu.classList.remove('active');
		body.classList.remove('lock');
	}
};
// close popup
document.querySelectorAll('.header__nav-item').forEach((link) => {
	link.addEventListener('click', (e) => {
		if (!link.classList.contains('header__nav-item_sub')) {
			closePopup(e);
		}
	});
});
document.onclick = function (e) {
	if (
		!burgerMenu.contains(e.target) &&
        !e.target.parentNode.contains(iconMenu) &&
        !e.target.classList.contains('header__nav-item_submenu')
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
};

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

const fun = () => { };

//отложенная загрузка
document.addEventListener('DOMContentLoaded', function () {
	var lazyImages = document.querySelectorAll('img[data-src]');
	lazyImages.forEach(function (img) {
		img.src = img.getAttribute('data-src');
		img.removeAttribute('data-src');
	});
});


//revolution


// отсчет "с начала новой главы прошло"

// const startDate = new Date('2024-02-01T00:00:00').getTime();

// const timer = setInterval(function() {
// 	const now = new Date().getTime();
    
// 	const difference = now - startDate;
    
// 	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
// 	const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// 	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
// 	const seconds = Math.floor((difference % (1000 * 60)) / 1000);

// 	document.getElementById('days').textContent = days;
// 	document.getElementById('hours').textContent = hours;
// 	document.getElementById('minutes').textContent = minutes;
// 	document.getElementById('seconds').textContent = seconds;

    
    
// }, 1000);

function addLeadingZero(num) {
	return (num < 10) ? '0' + num : num;
}

function pluralizeWord(number, one, two, five) {
	number = Math.abs(number) % 100;
	var num1 = number % 10;
	if (number > 10 && number < 20) return five;
	if (num1 > 1 && num1 < 5) return two;
	if (num1 == 1) return one;
	return five;
}

const startDate = new Date('2024-02-01T00:00:00').getTime();

const timer = setInterval(function() {
	const now = new Date().getTime();
    
	const difference = now - startDate;
    
	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((difference % (1000 * 60)) / 1000);

	var daysWord = pluralizeWord(days, 'день', 'дня', 'дней');
	var hoursWord = pluralizeWord(hours, 'час', 'часа', 'часов');
	var minutesWord = pluralizeWord(minutes, 'минута', 'минуты', 'минут');
	var secondsWord = pluralizeWord(seconds, 'секунда', 'секунды', 'секунд');

	document.getElementById('days').textContent = addLeadingZero(days);
	document.getElementById('days-word').textContent = daysWord;
	document.getElementById('hours').textContent = addLeadingZero(hours);
	document.getElementById('hours-word').textContent = hoursWord;
	document.getElementById('minutes').textContent = addLeadingZero(minutes);
	document.getElementById('minutes-word').textContent = minutesWord;
	document.getElementById('seconds').textContent = addLeadingZero(seconds);
	document.getElementById('seconds-word').textContent = secondsWord;
}, 1000);