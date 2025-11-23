// === Weather (Accra, GH) ===
const API_KEY = "39dbc25e2694570da4967abdf2f627a1";

const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=Accra,GH&units=metric&appid=${API_KEY}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Accra,GH&units=metric&appid=${API_KEY}`;

async function loadWeather() {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    console.log("Current Weather Response:", currentData);
    console.log("Forecast Response:", forecastData);

    if (!currentData.main || !forecastData.list) {
      throw new Error("Incomplete weather data");
    }

    // Current weather 
    const temp = Math.round(currentData.main.temp);
    const description = currentData.weather[0].description;
    const high = Math.round(currentData.main.temp_max);
    const low = Math.round(currentData.main.temp_min);
    const humidity = currentData.main.humidity;
    const sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(currentData.sys.sunset * 1000).toLocaleTimeString();

    const currentEl = document.getElementById('weather-current');
    const forecastEl = document.getElementById('weather-forecast');

    if (currentEl) {
      currentEl.innerHTML = `
        <p><strong>${temp}°C</strong></p>
        <p>${description}</p>
        <p>High: ${high}°</p>
        <p>Low: ${low}°</p>
        <p>Humidity: ${humidity}%</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
      `;
    }

    if (forecastEl) {
      const forecastList = [];
      const seenDays = new Set();

      for (const item of forecastData.list) {
        const day = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        if (!seenDays.has(day)) {
          forecastList.push(item);
          seenDays.add(day);
        }
        if (forecastList.length === 3) break;
      }

      forecastEl.innerHTML = forecastList.map(item => {
        const day = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        return `<div class="forecast-card"><p><strong>${day}:</strong> ${Math.round(item.main.temp)}°C</p></div>`;
      }).join('');
    }
  } catch (error) {
    console.error('Weather fetch failed:', error);
    const currentEl = document.getElementById('weather-current');
    const forecastEl = document.getElementById('weather-forecast');
    if (currentEl) currentEl.textContent = 'Weather data unavailable.';
    if (forecastEl) forecastEl.textContent = '';
  }
}

// ===== SPOTLIGHT SECTION =====
async function loadSpotlight() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();

    // Filter for Gold or Silver Members
    const spotlightCandidates = members.filter(member =>
      member.membership === 3 || member.membership === 2
    );

    // Randomly choose 2 or 3 members
    const count = Math.min(3, spotlightCandidates.length); // Randomly 2 or 3
    const selected = spotlightCandidates.sort(() => Math.random() - 0.5).slice(0, count);
    
    // Render spotlight cards 
    const container = document.getElementById('spotlight-container');
    if (container) {
      container.innerHTML = selected.map(m => `
        <div class="spotlight-card">
          <img src="images/${m.image}" alt="${m.name} logo">
          <h3>${m.name}</h3>
          <p>${m.description}</p>
          <p><strong>PHONE:</strong> ${m.phone}</p>
          <p><strong>ADDRESS:</strong> ${m.address}</p>
          <p><strong>URL:</strong> <a href="${m.website}" target="_blank">${m.website}</a></p>
          <p><strong>LEVEL:</strong> ${m.membership === 3 ? 'Gold' : 'Silver'}</p>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('spotlights error:', error);
    const container = document.getElementById('spotlight-container');
    if (container) container.textContent = 'Unable to load spotlight members.';
  }
}

// ===== JOIN PAGE MODALS =====
document.querySelectorAll('.card a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const modalId = link.getAttribute('href').substring(1);
    const modal = document.getElementById(modalId);
    if (modal) modal.showModal();
  });
});

// ===== THANK YOU PAGE LOGIC =====
function loadThankYouData() {
  const params = new URLSearchParams(window.location.search);

  if (document.getElementById('fname')) {
    document.getElementById('fname').textContent = params.get('fname');
    document.getElementById('lname').textContent = params.get('lname');
    document.getElementById('email').textContent = params.get('email');
    document.getElementById('phone').textContent = params.get('phone');
    document.getElementById('orgname').textContent = params.get('orgname');
  }

  const tsSpan = document.getElementById('timestamp');
  if (tsSpan && tsSpan.tagName === "SPAN") {
    tsSpan.textContent = params.get('timestamp');
  }
}

// Call it only if we are on thankyou.html
if (window.location.pathname.includes("thankyou.html")) {
  loadThankYouData();
}

// ===== FOOTER INFO =====
function setFooterInfo() {
  const year = document.getElementById('year');
  const lastModified = document.getElementById('lastModified');
  if (year) year.textContent = new Date().getFullYear();
  if (lastModified) lastModified.textContent = document.lastModified;
}

loadWeather();
loadSpotlight();
setFooterInfo();