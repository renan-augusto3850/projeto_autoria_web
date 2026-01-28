const toast = document.getElementById("toast_html");
const link = document.getElementById("link_span");
link.addEventListener("click", (event) => {
  event.preventDefault();
  toast.style.display = "flex";
});
const exit = document.getElementById("exit_button");
exit.addEventListener("click", () => {
  toast.style.display = "none";
});
