const header = document.querySelector(".site-header");
const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelectorAll(".main-nav a");
const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function closeMenu() {
  header.classList.remove("menu-active");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-active");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(leadForm).entries());
  const leads = JSON.parse(localStorage.getItem("reading-studio-leads") || "[]");
  leads.unshift({
    ...data,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("reading-studio-leads", JSON.stringify(leads));
  leadForm.reset();
  formStatus.textContent = "已收到预约信息。你可以把这里接入真实表单、企业微信或后台系统。";
});
