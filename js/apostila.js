const apostila = $("#flipbook").turn({
  width: 300,
  height: 500,
  acceleration: true,
  display: "single",
});

next.addEventListener("click", () => {
  apostila.turn("next");
  hljs.highlightAll();
});

previous.addEventListener("click", () => {
  apostila.turn("previous");
  hljs.highlightAll();
});

summary.addEventListener("click", () => {
  apostila.turn("page", 2);
});
