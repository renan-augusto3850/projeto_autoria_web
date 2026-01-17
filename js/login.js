const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

//evento de enviar formulário
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const email = form.get("email");
  const password = form.get("password");

  let users = localStorage.getItem("users");
  users = users ? JSON.parse(users) : [];

  let errorMessage = "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const user = users.find((user) => user.email === email);

  clearInputErrors();

  //validação de inputs
  if (!email || !password) {
    errorMessage = "Preencha todos os campos.";
    if (!email) setInputError(emailInput);
    if (!password) setInputError(passwordInput);
  } else if (!emailRegex.test(email)) {
    errorMessage = "Email inválido.";
    setInputError(emailInput);
  } else if (!user) {
    errorMessage = "Email não cadastrado.";
    setInputError(emailInput);
  } else if (password !== user.password) {
    errorMessage = "Senha incorreta.";
    setInputError(passwordInput);
  }

  if (errorMessage) {
    showToast(errorMessage);
    return;
  }

  window.location.href = "index.html";
});

//adicionar borda vermelha nos inputs
function setInputError(...inputs) {
  inputs.forEach((input) => {
    input.classList.add("input-error");
  });
}

//retirar borda vermelha dos inputs
function clearInputErrors() {
  document
    .querySelectorAll("input")
    .forEach((input) => input.classList.remove("input-error"));
}

// mostrar toast de erro
let toastTimeout;

function showToast(message) {
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

//mostrar senha - esconder senha
let eyeSpanOpen1 = false;

document.getElementById("eye-span-1").addEventListener("click", () => {
  const eyeOpen = document.getElementById("eye-password");
  const eyeClose = document.getElementById("hide-password");

  passwordInput.type = eyeSpanOpen1 ? "password" : "text";

  eyeOpen.style.display = eyeSpanOpen1 ? "inline-block" : "none";
  eyeClose.style.display = eyeSpanOpen1 ? "none" : "inline-block";
  eyeSpanOpen1 = !eyeSpanOpen1;
});
