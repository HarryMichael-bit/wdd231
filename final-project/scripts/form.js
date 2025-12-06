// scripts/form.js
// Handles audition form validation and local storage

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const voiceSelect = document.getElementById("voice");
    const messageInput = document.getElementById("message");

    // Load saved values from localStorage
    const savedFormData = JSON.parse(localStorage.getItem("auditionForm")) || {};
    if (savedFormData.name) nameInput.value = savedFormData.name;
    if (savedFormData.email) emailInput.value = savedFormData.email;
    if (savedFormData.voice) voiceSelect.value = savedFormData.voice;
    if (savedFormData.message) messageInput.value = savedFormData.message;

    // Save values to localStorage on change
    [nameInput, emailInput, voiceSelect, messageInput].forEach(field => {
        field.addEventListener("input", () => {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                voice: voiceSelect.value,
                message: messageInput.value.trim()
            };
            localStorage.setItem("auditionForm", JSON.stringify(formData));
        });
    });

    // Form validation before submission
    form.addEventListener("submit", (event) => {
        let valid = true;
        let errors = [];

        if (!nameInput.value.trim()) {
            valid = false;
            errors.push("Name is required.");
        }

        if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
            valid = false;
            errors.push("Valid email is required.");
        }

        if (!voiceSelect.value) {
            valid = false;
            errors.push("Please select your voice part.");
        }

        if (!valid) {
            event.preventDefault();
            alert("Form submission fail:\n" + errors.join("\n"));
        }
    });

    const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModified = document.getElementById("lastModified");
if (lastModified) {
  lastModified.textContent = `Last updated: ${document.lastModified}`;
}
});