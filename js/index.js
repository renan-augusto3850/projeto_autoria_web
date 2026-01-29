var header = document.getElementById("header");
var scrollTrigger = 60;

window.onscroll = function () {
  if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

start_now.addEventListener("click", () => push("/cursos.html"));
start_now_2.addEventListener("click", () => push("/cursos.html"));
