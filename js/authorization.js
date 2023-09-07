if (localStorage.getItem("status") == "true") {
  document.querySelector(".button-auth").style.display = "none";
  document.querySelector(".button-cart").style.display = "flex";
  document.querySelector(".button-out").style.display = "flex";
  document.querySelector(".user-name").style.display = "flex";
  document.querySelector(".user-name").textContent =
  localStorage.getItem("login");
}

const btnAuth = document.querySelector(".button-auth");
const btnCloseAuth = document.querySelector(".close-auth");
const modal = document.querySelector(".modal-auth");

btnAuth.addEventListener("click", () => {
  modal.style.display = "flex";
});

btnCloseAuth.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
    document.getElementById("login").value = "";
    document.getElementById("password").value = "";

  }
  if (e.target == document.querySelector(".modal-cart")) {
    document.querySelector(".modal-cart").style.display = "none"
}
});

document.querySelector(".button-login").addEventListener("click", (e) => {
  e.preventDefault();
  if (
    document.getElementById("login").value.length < 5 ||
    document.getElementById("password").value.length < 5
  ) {
    alert("Логин или пароль слишком короткий");
    document.getElementById("login").value = "";
    document.getElementById("password").value = "";
    return;
  }

  localStorage.setItem("status", true);
  localStorage.setItem("login", document.getElementById("login").value);

  modal.style.display = "none";
  btnAuth.style.display = "none";
  document.querySelector(".button-cart").style.display = "flex";
  document.querySelector(".button-out").style.display = "flex";
  document.querySelector(".user-name").style.display = "flex";
  document.querySelector(".user-name").textContent =
  document.getElementById("login").value;
  document.getElementById("login").value = "";
  document.getElementById("password").value = "";
});

document.querySelector(".button-out").addEventListener("click", () => {
  btnAuth.style.display = "flex";
  document.querySelector(".button-cart").style.display = "none";
  document.querySelector(".button-out").style.display = "none";
  document.querySelector(".user-name").style.display = "none";
  localStorage.setItem("status", false);
  localStorage.setItem("login", "");
});
