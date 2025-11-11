const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

gridBtn.addEventListener("click", () => {
    gridView.classList.remove("hidden");
    listView.classList.add("hidden");
    gridView.innerHTML = ""; // Clear previous content
    loadMembers(); // Reload members for grid
});

listBtn.addEventListener("click", () => {
    listView.classList.remove("hidden");
  gridView.classList.add("hidden");
  listView.innerHTML = ""; // Clear previous content
  loadMembers();
});

async function loadMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    renderGrid(members);
    renderList(members);
}

function renderGrid(members) {
    gridView.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");
        card.innerHTML = ` 
          <img src="images/${member.image}" alt="${member.name}" />
          <h3>${member.name}</h3>
          <div class="card-details">
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p><strong>Membership Level:</strong> ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
          </div>
        `;
        card.addEventListener("click", () => {
            card.classList.toggle("open");
        });
        gridView.appendChild(card);
    });
}

function renderList(members) {
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Website</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Membership</th>
        </tr>
      </thead>
      <tbody>
        ${members.map(member => `
            <tr>
              <td>${member.name}</td>
              <td><a href="${member.website}" target="_blank">${member.website}</a></td>
              <td>${member.phone}</td>
              <td>${member.address}</td>
              <td>${["Member", "Silver", "Gold"][member.membership - 1]}</td>
            </tr>
        `).join("")}
      </tbody>
    `;
    listView.appendChild(table);
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

loadMembers();