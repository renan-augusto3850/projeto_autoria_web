function showToastErro(message) {
  const toast = document.getElementById("toast-error");
  const text = toast.querySelector("p");

  text.innerText = message;
  toast.style.display = "flex";

  toast.classList.remove("show");
  void toast.offsetWidth;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    toast.style.display = "none";
  }, 3000);
}

function showToastCorect(message) {
  const toast = document.getElementById("toast-correct");
  const text = toast.querySelector("p");

  text.innerText = message;
  toast.style.display = "flex";

  toast.classList.remove("show");
  void toast.offsetWidth;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    toast.style.display = "none";
  }, 3000);
}
let anwser = document.getElementById("awser_input");
let anwser_corect = '<linkrel="stylesheet"href="/css/styles.css">';
function check_anwser() {
  let anwser_2 = anwser.value;
  let result = anwser_2.replace(/\s/g, "");

  if (result === anwser_corect) {
    showToastCorect("Parabéns, você acertou!");
    anwser.style.border = " 2px solid #5F9220";
  } else {
    showToastErro("Que pena! Você errou.");
    anwser.style.border = " 2px solid #B22B26 ";
  }
  anwser.disabled = true;
}
let toastTimeout;

const bnt = document.getElementById("bnt");
bnt.addEventListener("click", (e) => {
  if (e.target.innerText === "Confirmar") {
    check_anwser();
    e.target.innerText = "Proxima";
  } else {
    window.location.href = "/licao/ir_ao_playground.html";
  }
});
