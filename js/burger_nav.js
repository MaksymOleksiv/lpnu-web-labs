const burger = document.getElementById('navBurger');
const navList = document.getElementById('navList');
burger.addEventListener('click', function () {
    burger.classList.toggle('nav__burger--active');
    const open = navList.classList.toggle('nav__list--open');
});