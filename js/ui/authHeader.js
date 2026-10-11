const authLinks = document.querySelectorAll("[data-auth-link]");
const profileLinks = document.querySelectorAll("[data-profile-link]");
const isAuthenticated = Boolean(localStorage.getItem("token"));

if (!isAuthenticated) {
  profileLinks.forEach((profileLink) => {
    profileLink.classList.add("hidden");
  });
}

authLinks.forEach((authLink) => {
  if (isAuthenticated) {
    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      window.location.href = "/index.html";
    });
  }
});
