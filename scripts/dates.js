// Current year in footer 
document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    const modifiedEl = document.getElementById("lastModified");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (modifiedEl) {
        modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
    }
});