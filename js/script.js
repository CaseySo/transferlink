/* ==============================
   General Utilities
   ============================== */

// Navigation helper
function navigateTo(page) {
  window.location.href = page;
}

/* ==============================
   Login Page
   ============================== */
function startApp() {
  const email = document.getElementById('email').value.trim();

  if (!email) return alert("Please enter your UCSD email");
  if (!email.endsWith("@ucsd.edu")) return alert("Please enter a valid UCSD email ending with @ucsd.edu");

  localStorage.setItem('email', email);
  window.location.href = "profile.html";
}

/* ==============================
   Profile Page
   ============================== */

// Majors and Colleges
const majors = [
  "Computer Science (B.S.)","Data Science (B.S.)",
  "Biology (B.S.)", "Cognitive Science (B.S.)","Psychology (B.S.)","Economics (B.A.)",
  "Mathematics (B.S.)","Mechanical Engineering (B.S.)", "Visual Arts (B.A.)","Public Health (B.S.)"
];

const colleges = ["Revelle","ERC","Muir","Marshall","Warren","Sixth","Seventh","Eighth"];

// Dropdown search helper
function setupSearch(inputId, dropdownId, dataList) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (!input || !dropdown) return;

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    dropdown.innerHTML = "";

    if (!query) {
      dropdown.style.display = "none";
      return;
    }

    const filtered = dataList.filter(item => item.toLowerCase().includes(query));
    filtered.forEach(item => {
      const div = document.createElement("div");
      div.className = "dropdown-item";
      div.textContent = item;
      div.addEventListener("click", () => {
        input.value = item;
        dropdown.style.display = "none";
      });
      dropdown.appendChild(div);
    });

    dropdown.style.display = filtered.length ? "block" : "none";
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}

// Track selected interests
const selectedInterests = new Set();
function updateCounter() {
  const counter = document.getElementById('interest-count');
  if (!counter) return;
  const count = selectedInterests.size;
  counter.textContent = `${count} interest${count !== 1 ? 's' : ''} selected`;
}

// Finish profile
function finishProfile() {
  const name = document.getElementById('name')?.value.trim() || "";
  const major = document.getElementById('major-search')?.value.trim() || "";
  const college = document.getElementById('college-search')?.value.trim() || "";

  if (!name || !major || !college) {
    return alert("Please fill out name, major, and college");
  }

  localStorage.setItem('name', name);
  localStorage.setItem('major', major);
  localStorage.setItem('college', college);
  localStorage.setItem('interests', JSON.stringify([...selectedInterests]));

  window.location.href = "home.html";
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
/* ==============================
   Courses Page JS
   ============================== */
document.addEventListener("DOMContentLoaded", () => {
  const major = localStorage.getItem("major") || "";
  const college = localStorage.getItem("college") || "";

  const majorLinks = {
    "Computer Science (B.S.)": "https://catalog.ucsd.edu/curric/CSE-ug.html",
    "Data Science (B.S.)": "https://catalog.ucsd.edu/curric/DSC.html",
    "Biology (B.S.)": "https://biology.ucsd.edu/education/undergrad/major-minor-programs/majors/requirements/index.html",
    "Psychology (B.S.)": "https://catalog.ucsd.edu/curric/PSYC-ug.html",
    "Cognitive Science (B.S.)": "https://cogsci.ucsd.edu/undergraduates/major/index.html",
    "Mathematics (B.S.)": "https://catalog.ucsd.edu/curric/MATH-ug.html",
    "Mechanical Engineering (B.S.)": "https://mae.ucsd.edu/undergrad/mechanical-engineering",
    "Visual Arts (B.A.)": "https://visarts.ucsd.edu/undergrad/major-req/index.html",
    "Public Health (B.S.)": "https://ph.ucsd.edu/undergrad/majors/effective2024/bsph.html",
    "Economics (B.A.)": "https://economics.ucsd.edu/undergraduate-program/major-minor-requirements/index.html"
  };

  const collegeLinks = {
    "Revelle": "https://revelle.ucsd.edu/_files/academics/rev-grad-req-tran",
    "Muir": "https://muir.ucsd.edu/writing/transfer/index.html",
    "Marshall": "https://marshall.ucsd.edu/academics/transfer-ge.html",
    "ERC": "https://roosevelt.ucsd.edu/academics/gen-ed/index.html",
    "Warren": "https://warren.ucsd.edu/academics/general-education/index.html",
    "Sixth": "https://sixth.ucsd.edu/academics/requirements/transfer-requirements.html",
    "Seventh": "https://seventh.ucsd.edu/academics/degree-requirements/degree-requirements-transfers.html",
    "Eighth": "https://eighth.ucsd.edu/academics/degree-requirements/transfer.html"
  };

  // ===== Update major and college boxes dynamically =====
  const majorText = document.getElementById("major-text");
  const majorLink = document.getElementById("major-link");
  majorText.innerText = major || "Your major not set";
  majorLink.href = majorLinks[major] || "#";

  const geText = document.getElementById("ge-text");
  const geLink = document.getElementById("ge-link");
  geText.innerText = college || "Your college not set";
  geLink.href = collegeLinks[college] || "#";

  // ===== Accordion functionality =====
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach(button => {
    const panel = button.nextElementSibling;

    button.addEventListener("click", () => {
      const isOpen = panel.classList.contains("open");

      if (isOpen) {
        // Collapse panel
        panel.style.maxHeight = null;
        panel.classList.remove("open");
        button.classList.remove("active");
      } else {
        // Expand panel fully
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.classList.add("open");
        button.classList.add("active");

        // Remove maxHeight after transition to allow dynamic height
        setTimeout(() => {
          if (panel.classList.contains("open")) {
            panel.style.maxHeight = "none";
          }
        }, 300); // should match your CSS transition
      }
    });
  });
});

/* ==============================
   Events Page JS
   ============================== */
document.addEventListener("DOMContentLoaded", () => {

  const interests = JSON.parse(localStorage.getItem("interests") || "[]");

  const events = [
    {
      title: "AI Club Meetup",
      desc: "Talk about AI projects and meet others",
      date: "April 10",
      time: "6:00 PM",
      org: "AI Club",
      tag: "AI",
      type: "Academic"
    },
    {
      title: "Basketball Night",
      desc: "Pickup games at RIMAC",
      date: "April 12",
      time: "8:00 PM",
      org: "Rec Center",
      tag: "Sports",
      type: "Social"
    },
    {
      title: "Art Workshop",
      desc: "Relax and paint",
      date: "April 15",
      time: "5:00 PM",
      org: "Visual Arts Club",
      tag: "Art",
      type: "Social"
    },
    {
      title: "Hackathon",
      desc: "Build projects & win prizes",
      date: "April 20",
      time: "10:00 AM",
      org: "ACM",
      tag: "Coding",
      type: "Career"
    }
  ];

  const personalContainer = document.getElementById("personal-events");
  const allContainer = document.getElementById("all-events");
  const savedContainer = document.getElementById("saved-events");

  function getSavedEvents() {
    return JSON.parse(localStorage.getItem("savedEvents") || "[]");
  }

  function checkIfSaved(event) {
    return getSavedEvents().some(e => e.title === event.title);
  }

  function toggleSave(event) {
    let saved = getSavedEvents();
    const exists = checkIfSaved(event);

    if (exists) {
      saved = saved.filter(e => e.title !== event.title);
    } else {
      saved.push(event);
    }

    localStorage.setItem("savedEvents", JSON.stringify(saved));
  }

  function createCard(event) {
    const card = document.createElement("div");
    card.className = "card event-card";

    const isSaved = checkIfSaved(event);

    card.innerHTML = `
      <h3>${event.title}</h3>
      <p class="event-desc">${event.desc}</p>

      <div class="event-details">
        <p>📅 ${event.date}</p>
        <p>⏰ ${event.time}</p>
        <p>🏫 ${event.org}</p>
      </div>

      <div class="event-footer">
        <span class="event-tag">${event.tag}</span>
        <span class="event-type">${event.type}</span>
      </div>

      <button class="save-btn ${isSaved ? "saved" : ""}">
        ${isSaved ? "★ Saved" : "☆ Save"}
      </button>
    `;

    const btn = card.querySelector(".save-btn");
    btn.addEventListener("click", () => {
      toggleSave(event);
      updateUI();
    });

    return card;
  }

  function renderEvents(filter = "All") {
    personalContainer.innerHTML = "";
    allContainer.innerHTML = "";

    const filtered = filter === "All"
      ? events
      : events.filter(e => e.type === filter);

    filtered.forEach(event => {
      allContainer.appendChild(createCard(event));

      if (interests.includes(event.tag)) {
        personalContainer.appendChild(createCard(event));
      }
    });
  }

  function loadSavedEvents() {
    savedContainer.innerHTML = "";
    getSavedEvents().forEach(event => {
      savedContainer.appendChild(createCard(event));
    });
  }

  function updateUI(filter = "All") {
    renderEvents(filter);
    loadSavedEvents();
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      btn.classList.add("active");
      updateUI(btn.dataset.filter);
    });
  });

  updateUI();
});

function navigateTo(page) {
  window.location.href = page;
}