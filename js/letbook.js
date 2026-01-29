const letbook = $("#flipbook").turn({
  width: 300,
  height: 550,
  acceleration: true,
  display: "single",
});

next.addEventListener("click", () => {
  letbook.turn("next");
});

previous.addEventListener("click", () => {
  letbook.turn("previous");
});
