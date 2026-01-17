const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

//evento de enviar formulário
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const name = form.get("username");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirm-password");

  let users = localStorage.getItem("users");
  users = users ? JSON.parse(users) : [];

  let errorMessage = "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const emailExists = users.some((user) => user.email === email);
  const usernameExists = users.some((user) => user.name === name);

  clearInputErrors();

  //validação de inputs
  if (!name || !email || !password || !confirmPassword) {
    errorMessage = "Preencha todos os campos.";
    if (!name) setInputError(nameInput);
    if (!email) setInputError(emailInput);
    if (!password) setInputError(passwordInput);
    if (!confirmPassword) setInputError(confirmPasswordInput);
  } else if (usernameExists) {
    errorMessage = "Nome de usuário já existe.";
    setInputError(nameInput);
  } else if (!emailRegex.test(email)) {
    errorMessage = "Email inválido.";
    setInputError(emailInput);
  } else if (emailExists) {
    errorMessage = "Email já cadastrado.";
    setInputError(emailInput);
  } else if (password.length < 8) {
    errorMessage = "A senha deve ter no mínimo 8 caracteres.";
    setInputError(passwordInput, confirmPasswordInput);
  } else if (password !== confirmPassword) {
    errorMessage = "As senhas não conferem.";
    setInputError(passwordInput, confirmPasswordInput);
  }

  if (errorMessage) {
    showToast(errorMessage);
    return;
  }

  //enviando informações do usuário
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

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
let eyeSpanOpen1 = false,
  eyeSpanOpen2 = false;

document.getElementById("eye-span-1").addEventListener("click", () => {
  const eyeOpen = document.getElementById("eye-password");
  const eyeClose = document.getElementById("hide-password");

  passwordInput.type = eyeSpanOpen1 ? "password" : "text";

  eyeOpen.style.display = eyeSpanOpen1 ? "inline-block" : "none";
  eyeClose.style.display = eyeSpanOpen1 ? "none" : "inline-block";
  eyeSpanOpen1 = !eyeSpanOpen1;
});

document.getElementById("eye-span-2").addEventListener("click", () => {
  const eyeSpanOpen = document.getElementById("eye-confirm-password");
  const eyeSpanClose = document.getElementById("hide-confirm-password");

  confirmPasswordInput.type = eyeSpanOpen2 ? "password" : "text";

  eyeSpanOpen.style.display = eyeSpanOpen2 ? "inline-block" : "none";
  eyeSpanClose.style.display = eyeSpanOpen2 ? "none" : "inline-block";
  eyeSpanOpen2 = !eyeSpanOpen2;
});
