// Import the items data
import { items } from "../data/items.mjs";

// Select the container where cards will go
const container = document.getElementById("card-container");

// Build cards dynamically
items.forEach((item, index) => {
    const card = document.createElement("section");
    card.className = "card";
    card.style.gridArea = `card${index + 1}`; // named grid areas

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;

    container.appendChild(card);
});

// Visitor Message Logic
const messageBox = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    messageBox.textContent = "Welcome! let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (days < 1) {
        messageBox.textContent = "Back so soon! Awesome!";
    } else {
        messageBox.textContent = `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
    }
}

// Update localStorage with current visit
localStorage.setItem("lastVisit", now);