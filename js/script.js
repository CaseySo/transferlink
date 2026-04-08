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
  const personalContainer = document.getElementById("personal-events");
  const allContainer = document.getElementById("all-events");
  const savedContainer = document.getElementById("saved-events");

  const interests = JSON.parse(localStorage.getItem("interests") || "[]");
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

  const events = [
   {
     title: "Bingo",
     desc: "Talk about AI projects and meet others",
     date: "April 10",
     time: "6:00 PM",
     org: "AI Club",
     tag: "Games",
     image: "images/bingo.jpg"
   },
   {
     title: "Pitch Perfect",
     desc: "Price Center Theater",
     date: "April 16",
     time: "8:00 PM",
     org: "UCSD",
     tag: "Movie",
     image: "images/pitch.jpg"
   },
   {
     title: "Company Tour Viasat",
     desc: "Visit Viasat's Carlsbad office.",
     date: "April 17",
     time: "9:00 AM",
     org: "AIAA",
     tag: "Professional Development",
     image: "images/viasat.png"
   },
   {
     title: "Microadventure Hike",
     desc: "Tritons Rise With Outlook",
     date: "April 24",
     time: "?",
     org: "Recreation",
     tag: "Nature",
     image: "images/nature.png"
   },
   {
     title: "Transfer Career Day",
     desc: "Headshots, resume review, public speaking tips",
     date: "April 30",
     time: "2:00 PM",
     org: "Triton Transfer",
     tag: "Professional Development",
     image: "images/transfer.jpg"
   }
 ];


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
    updateUI(currentFilter);
  }

  function createCard(event) {
    const card = document.createElement("div");
    card.className = "event-card";

    // Card content
    card.innerHTML = `
      <h3>${event.title}</h3>
      <p class="event-desc">${event.desc}</p>
      <div class="event-details">
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Org:</strong> ${event.org}</p>
      </div>
      <div class="event-footer">
        <span class="event-tag">${event.tag}</span>
        <button class="save-btn ${isSaved(event) ? "saved" : ""}">
          ${isSaved(event) ? "Unsave" : "Save"}
        </button>
      </div>
    `;

    // Save button
    const saveBtn = card.querySelector(".save-btn");
    saveBtn.addEventListener("click", e => {
      e.stopPropagation(); // prevent card click
      toggleSave(event);
    });

    // Modal popup
    card.addEventListener("click", () => {
      openModal(event.image, event.title);
    });

    return card;
  }

  // ----- Modal -----
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <img src="" alt="Event Flyer" id="modal-image">
      <h3 id="modal-title"></h3>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("#modal-image");
  const modalTitle = modal.querySelector("#modal-title");
  const closeBtn = modal.querySelector(".close-btn");

  function openModal(src, title) {
    modal.style.display = "block";
    modalImg.src = src;
    modalTitle.textContent = title;
  }

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // ----- Filters -----
  let currentFilter = "All";
  function renderEvents(filter = "All") {
    personalContainer.innerHTML = "";
    allContainer.innerHTML = "";

    const filtered = filter === "All" ? events : events.filter(e => e.tag === filter);

    filtered.forEach(event => {
      allContainer.appendChild(createCard(event));

      if (interests.includes(event.tag)) {
        personalContainer.appendChild(createCard(event));
      }
    });
  }

  function renderSaved() {
    savedContainer.innerHTML = "";
    savedEvents.forEach(event => savedContainer.appendChild(createCard(event)));
  }

  function updateUI(filter = "All") {
    currentFilter = filter;
    renderEvents(filter);
    renderSaved();
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

// ----- Navigation -----
function navigateTo(page) {
  window.location.href = page;
}