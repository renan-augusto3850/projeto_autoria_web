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
let toastTimeout;
let opcao_correta = "h1";
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const selection = document.querySelector(
    "input[name='option_input']:checked"
  );
  if (!selection) {
    showToastErro("Por favor, selecione alguma alternativa!");
    return;
  }
  const opcao = selection.value;
  const botao = document.getElementById("bnt");
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.disabled = true;
  });
  if (opcao === opcao_correta) {
    showToastCorect("Parabéns, você acertou!");
    selection.closest(".option").style.backgroundColor = "#5F9220";
  } else {
    showToastErro("Que pena! Você errou.");
    selection.closest(".option").style.backgroundColor = "#B22B26 ";
    document.getElementById("correct_input").style.backgroundColor =
      " #5F9220 ";
  }
  if (botao.innerText === "Confirmar") {
    botao.innerText = "Proxima";
  } else {
    window.location.assign("/licao/licao_escrita_html.html");
  }
});
