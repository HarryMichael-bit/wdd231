document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu");
  const nav = document.getElementById("primary-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("show");

      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !expanded);
    });
  }

const concerts = [
    { img: 'images/concert1.jpg', desc: 'Our maiden concert at Legon Seventh Day Adventist church, 2021' },
    { img: 'images/concert3.jpg', desc: 'Perfomance at Madina Central SDA Church, 2022' }
];

const members = [
    { img: 'images/member1.jpg', name: 'Ebenezer Gyadu', role: 'President' },
    { img: 'images/member2.jpg', name: 'Sam Ekow Senior', role: 'Music Director' }
];

// Populate concerts
  const concertGallery = document.getElementById('concert-gallery');
  if (concertGallery) {
    concerts.forEach(concert => {
      const card = document.createElement('div');
      card.classList.add('concert-card');
      card.innerHTML = `
      <img src="${concert.img}" alt="Concert image">
      <p>${concert.desc}</p>
    `;
      concertGallery.appendChild(card);
    });
  }
// Populate members
  const memberCards = document.getElementById('member-cards');
  if (memberCards) {
    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');
      card.innerHTML = `
      <img src="${member.img}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    `;
      memberCards.appendChild(card);
    });
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