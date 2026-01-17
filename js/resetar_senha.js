const emailInput = document.getElementById("email");
const toastNotification = document.getElementById("toast-notification");
const submitBtn = document.getElementById("submit-btn");

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let users = localStorage.getItem("users");
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  clearInputErrors();

  if (!email) {
    setInputError(emailInput);
    showToast("Digite seu email.");
    return;
  }

  if (!emailRegex.test(email)) {
    setInputError(emailInput);
    showToast("Email inválido.");
    return;
  }

  toastNotification.style.display = "flex";
  submitBtn.disabled = "true";
  submitBtn.style.cursor = "not-allowed";

  sessionStorage.setItem("resetEmail", email);

  setTimeout(() => {
    window.location.href = "nova_senha.html";
  }, 3000);
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

document
  .getElementById("back-button")
  .addEventListener("click", () => (window.location.href = "login.html"));
