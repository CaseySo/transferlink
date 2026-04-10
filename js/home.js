function navigateTo(page) {
  window.location.href = page;
}

/* ==============================
   DOM Loaded
   ============================== */
document.addEventListener("DOMContentLoaded", () => {
  // ===== Profile Page =====
  if (document.getElementById('name')) {
    // Setup dropdowns
    setupSearch("major-search", "major-dropdown", majors);
    setupSearch("college-search", "college-dropdown", colleges);

    // Load saved profile data
    const name = localStorage.getItem('name');
    const major = localStorage.getItem('major');
    const college = localStorage.getItem('college');
    const interests = JSON.parse(localStorage.getItem('interests') || "[]");

    if (name) document.getElementById('name').value = name;
    if (major) document.getElementById('major-search').value = major;
    if (college) document.getElementById('college-search').value = college;

    // Setup interest buttons
    document.querySelectorAll('.interest-btn').forEach(btn => {
      const interest = btn.dataset.interest;
      if (interests.includes(interest)) {
        btn.classList.add('selected');
        selectedInterests.add(interest);
      }

      btn.addEventListener('click', () => {
        if (selectedInterests.has(interest)) {
          selectedInterests.delete(interest);
          btn.classList.remove('selected');
        } else {
          if (selectedInterests.size >= 3) return alert("You can only select up to 3 interests");
          selectedInterests.add(interest);
          btn.classList.add('selected');
        }
        updateCounter();
      });
    });

    updateCounter();
  }

  // ===== Home Page =====
  if (document.getElementById('greeting')) {
    const name = localStorage.getItem("name") || "Student";
    const major = localStorage.getItem("major") || "";
    const college = localStorage.getItem("college") || "";
    const interests = JSON.parse(localStorage.getItem("interests") || "[]");

    document.getElementById("greeting").innerText = `Welcome, ${name}!`;

    const profileInfoEl = document.getElementById("profile-info");
    if (profileInfoEl) {
      const interestText = interests.length ? interests.join(", ") : "No interests selected";
      let profileText = "";
      if (major) profileText += `${major} major`;
      if (college) profileText += `${major ? ", " : ""}${college} College`;
      profileText += `\nInterests: ${interestText}`;
      profileInfoEl.innerText = profileText;
    }

    const recContainer = document.getElementById("recommendations");
    if (recContainer) {
      const recommendations = [
        { title: "Math Workshop", desc: "Boost your calculus skills", link: "#" },
        { title: "Coding Club Meetup", desc: "Meet fellow programmers", link: "#" },
        { title: "Volunteering Fair", desc: "Find ways to give back", link: "#" },
      ];
      recommendations.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
        card.addEventListener("click", () => navigateTo(item.link));
        recContainer.appendChild(card);
      });
    }
  }
});
// ===== Sample Data =====
const newsletter = {
  title: "UCSD Weekly Highlights",
  body: "Your weekly roundup of campus news, events, and tips for success!"
};

/* ==============================
   Home Page JS - Highlights like Events
   ============================== */
document.addEventListener("DOMContentLoaded", () => {

  function navigateTo(page) {
    window.location.href = page;
  }

  const highlightsContainer = document.getElementById("highlights");
  let savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

  const highlights = [
    {
      title: "Company Tour Viasat",
      desc: "Visit Viasat's Carlsbad office. Click for details.",
      location: "Carlsbad",
      date: "April 17",
      time: "9:00 AM",
      org: "AIAA",
      tag: ["Professional Development", "Travel"],
      category: "Career",
      image: "images/viasat.png"
    },
    {
      title: "Transfer Career Day",
      desc: "Headshots, resume review, public speaking tips. Click for details.",
      location: "Price Center Ballroom",
      date: "April 30",
      time: "2:00 PM",
      org: "Triton Transfer",
      tag: ["Professional Development"],
      category: "Career",
      image: "images/transfer.jpg"
    },
    {
      title: "SunGod Festival",
      desc: "Sun God, an iconic festival with good music and delicious food, seems to be the perfect way to let loose in the middle of Spring Quarter. Click for details.",
      location: "RIMAC Field",
      date: "May 2",
      time: "12:00 PM",
      org: "ASCE",
      tag: ["Performing", "Music"],
      category: "Social",
      image: "images/sungod.png"
    }
  ];

  // Sort by date ascending
  highlights.sort((a,b) => new Date(a.date) - new Date(b.date));

  // ----- Modal -----
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <img src="" alt="Event Flyer" id="modal-image">
      <h3 id="modal-title"></h3>
      <p id="modal-desc"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("#modal-image");
  const modalTitle = modal.querySelector("#modal-title");
  const modalDesc = modal.querySelector("#modal-desc");
  const closeBtn = modal.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

  function showModal(event) {
    modal.style.display = "flex";
    modalImg.src = event.image;
    modalTitle.textContent = event.title;
    modalDesc.textContent = event.desc;
  }

  // ----- Helpers -----
  function isSaved(event) {
    return savedEvents.some(e => e.title === event.title);
  }

  function toggleSave(event) {
  const index = savedEvents.findIndex(e => e.title === event.title);

  if (index > -1) {
    savedEvents.splice(index, 1);
  } else {
    savedEvents.push(event);
  }

  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}

  // ----- Create Highlight Card -----
  function createCard(event) {
  const card = document.createElement("div");
  card.className = "card";

  if (isSaved(event)) {
    card.classList.add("saved-card");
  }
    card.innerHTML = `
      <h3>${event.title}</h3>
      <p class="event-desc">${event.desc}</p>
      <div class="event-details">
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Org:</strong> ${event.org}</p>
        <p><strong>Location:</strong> ${event.location}</p>
      </div>
    `;

    // Footer with tags + save
    const footer = document.createElement("div");
    footer.className = "event-footer";

    event.tag.forEach(t => {
      const tagEl = document.createElement("span");
      tagEl.className = "event-tag";
      tagEl.innerText = t;
      footer.appendChild(tagEl);
    });

    const saveBtn = document.createElement("button");
    saveBtn.className = "save-btn";
    saveBtn.innerText = isSaved(event) ? "Saved" : "Save";
    if (isSaved(event)) saveBtn.classList.add("saved");

    saveBtn.addEventListener("click", e => {
  e.stopPropagation();

  toggleSave(event);

  // refresh local savedEvents
  savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

  const saved = isSaved(event);

  saveBtn.innerText = saved ? "Saved" : "Save";
  saveBtn.classList.toggle("saved", saved);

  card.classList.toggle("saved-card", saved);

  // re-render highlights so ALL cards stay in sync
  highlightsContainer.innerHTML = "";
  highlights.forEach(e => highlightsContainer.appendChild(createCard(e)));
});

    footer.appendChild(saveBtn);
    card.appendChild(footer);

    // Click to open modal
    card.addEventListener("click", () => showModal(event));

    return card;
  }

  // Render highlights
  highlights.forEach(event => highlightsContainer.appendChild(createCard(event)));

});

// ===== Populate Tips =====
const tips = [
  { title: "Time Management", body: "Use a planner or digital calendar to stay on top of assignments and deadlines." },
  { title: "Study Spots", body: "Check out Geisel Library's top floors for quiet, productive study areas." },
  { title: "Networking", body: "Join student organizations to meet like-minded peers and make connections." }
];

const tipsContainer = document.getElementById("tips");
tips.forEach(tip => {
  const card = document.createElement("div");
  card.className = "tips-card"; // new class
  card.innerHTML = `
    <h3>${tip.title}</h3>
    <p>${tip.body}</p>
  `;
  tipsContainer.appendChild(card);
});

const name = localStorage.getItem("name");
const initial = document.getElementById("profile-initial");

if (name && initial) {
  initial.textContent = name.charAt(0).toUpperCase();
}

