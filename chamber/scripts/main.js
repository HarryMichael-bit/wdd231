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


    document.getElementById('weather-current').innerHTML = `
      <p><strong>${temp}°C</strong></p>
      <p>${description}</p>
      <p>High: ${high}°</p>
      <p>Low: ${low}°</p>
      <p>Humidity: ${humidity}%</p>
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>
    `;
    
    // Forecast: pick 3 midday entries (around 12:00)
    const forecastList = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    document.getElementById('weather-forecast').innerHTML = forecastList.map(item => {
      const day = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
      return `<div class="forecast-card"><p><strong>${day}:</strong> ${Math.round(item.main.temp)}°C</p></div>`;
    }).join('');
  } catch (error) {
    console.error('Weather fetch failed:', error);
    document.getElementById('weather-current').textContent = 'Weather data unavailable.';
    document.getElementById('weather-forecast').textContent = '';
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
  } catch (error) {
    console.error('spotlights error:', error);
    document.getElementById('spotlight-container').textContent = 'Unable to load spotlight members.';
  }
}

// ===== FOOTER INFO =====
function setFooterInfo() {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
}

loadWeather();
loadSpotlight();
setFooterInfo();