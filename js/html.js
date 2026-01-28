var header = document.getElementById("header");
var scrollTrigger = 60;

window.onscroll = function() {
  if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

document.getElementById('back-button').addEventListener('click', () => {
  window.history.back();
});

 start_lesson.addEventListener("click", () => window.location.assign("/licao/html/conteudos.html"))
