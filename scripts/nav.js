// Responsive navigation: hamburger toggle for small screens
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector("menu");
    const nav = document.querySelector(".navigation");

    if (!menuBtn || !nav) return;
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("open");

        if (nav.classList.contains("open")) {
            menuBtn.innerHtml = "✖";
            menuBtn.setAttribute("aria-label", "Close Menu");
        } else {
            menuBtn.innerHTML = "☰";
            menuBtn.setAttribute("aria-label", "Open Menu");
        }
    });
});