var scrollTrigger = 60;

window.onscroll = function() {
    if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};
