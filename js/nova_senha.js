const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const email = sessionStorage.getItem("resetEmail");

if (!email) {
  window.location.href = "login.html";
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  clearInputErrors();

  if (!password || !confirmPassword) {
    showToast("Preencha todos os campos.");
    if (!password) setInputError(passwordInput);
    if (!confirmPassword) setInputError(confirmPasswordInput);
    return;
  }

  if (password.length < 8) {
    showToast("A senha deve ter no mínimo 8 caracteres.");
    setInputError(passwordInput);
    return;
  }

  if (password !== confirmPassword) {
    showToast("As senhas não conferem.");
    setInputError(passwordInput, confirmPasswordInput);
    return;
  }

  let users = localStorage.getItem("users");
  users = users ? JSON.parse(users) : [];

  const userIndex = users.findIndex((user) => user.email === email);

  users[userIndex].password = password;
  localStorage.setItem("users", JSON.stringify(users));

  sessionStorage.removeItem("resetEmail");

  window.location.href = "login.html";
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

document
  .getElementById("back-button")
  .addEventListener(
    "click",
    () => (window.location.href = "resetar_senha.html")
  );
