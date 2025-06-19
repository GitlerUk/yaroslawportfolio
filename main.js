// ===== MENU SHOW/HIDE =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

document.querySelectorAll('.nav__link').forEach(link =>
    link.addEventListener('click', () => navMenu.classList.remove('show-menu'))
);

// ===== ACCORDION SKILLS =====
document.querySelectorAll('.skills__header').forEach(header => {
    header.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.className = parent.className.includes('skills__open')
            ? 'skills__content skills__close'
            : 'skills__content skills__open';
    });
});

// ===== QUALIFICATION TABS =====
const educationBtn = document.getElementById('education-btn');
const workBtn = document.getElementById('work-btn');
const educationDiv = document.getElementById('education');
const workDiv = document.getElementById('work');

educationBtn.addEventListener('click', () => {
    educationBtn.style.color = '#6e57e0';
    workBtn.style.color = '#6d6a7c';
    educationDiv.className = 'ualification__content qualification__active';
    workDiv.className = 'qualification__content';
});

workBtn.addEventListener('click', () => {
    workBtn.style.color = '#6e57e0';
    educationBtn.style.color = '#6d6a7c';
    workDiv.className = 'ualification__content qualification__active';
    educationDiv.className = 'qualification__content';
});

// ===== SERVICES MODAL =====
const modalViews = document.querySelectorAll('.services__modal');
const modalBtns = document.querySelectorAll('.services__button');
const modalCloses = document.querySelectorAll('.services__modal-close');

modalBtns.forEach((btn, i) =>
    btn.addEventListener('click', () => modalViews[i].classList.add('active-modal'))
);

modalCloses.forEach(close =>
    close.addEventListener('click', () =>
        modalViews.forEach(view => view.classList.remove('active-modal'))
    )
);

// ===== портфолио свайпер ===
new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
});

// ===== кнопка ввєрх =====
window.addEventListener('scroll', function () {
    const scrollUp = document.getElementById('scroll-up');
    scrollUp.classList.toggle('show-scroll', this.scrollY >= 560);
});

// ===== тема тьомна біла =====
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// ===== тіпінг єфєкти =====
function TxtType(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
}

TxtType.prototype.tick = function () {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];
    this.txt = this.isDeleting
        ? fullTxt.substring(0, this.txt.length - 1)
        : fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(() => this.tick(), delta);
};

window.onload = function () {
    document.querySelectorAll('.typewrite').forEach(el => {
        const toRotate = el.getAttribute('data-type');
        const period = el.getAttribute('data-period');
        if (toRotate) new TxtType(el, JSON.parse(toRotate), period);
    });
    const css = document.createElement('style');
    css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
    document.body.appendChild(css);
};
