// scripts/albums.js
// Dynamically loads albums from JSON and renders them into the gallery grid

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("albums-grid");
  
  const menuButton = document.getElementById("menu");
  const nav = document.getElementById("primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("show");

      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !expanded);
    });
  }

    try {
        // Fetch JSON data 
        const response = await fetch("data/albums.json");
        if (!response.ok) throw new Error("Failed to load albums.json");
        const albums = await response.json();

        // Render album cards
        albums.forEach(album => {
            const card = document.createElement("div");
            card.classList.add("album-card");

            card.innerHTML = `
              <img src="${album.image}" alt="${album.title} ${album.year}" loading="lazy">
              <details>
                <summary class="details-btn">View Details</summary>
                <div class="albums-info">
                  <h3>${album.title}</h3>
                  <p><strong>Year:</strong> ${album.year}</p>
                  <p><strong>Location:</strong> ${album.location}</p>
                  <p>${album.description}</p>
                  <h4>Highlights</h4>
                  <ul>
                    ${album.highlights.map(item => `<li>${item}</li>`).join("")}
                  </ul>
                </div>
              </details>
            `;

            // Modal trigger
            card.querySelector(".details-btn").addEventListener("click", () => {
                openModal(album);
            });

            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading albums:", error);
        grid.innerHTML = `<p class="error">Unable to load albums at this time.</p>`;
  }
  
  const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModified = document.getElementById("lastModified");
if (lastModified) {
  lastModified.textContent = `Last updated: ${document.lastModified}`;
}
});



   