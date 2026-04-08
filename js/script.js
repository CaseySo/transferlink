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
  let savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

  const events = [
    {
      title: "Bingo",
      desc: "Talk about AI projects and meet others",
      location: "Shores Diner",
      date: "April 10",
      time: "6:00 PM",
      org: "Student Center",
      tag: ["Gaming"],
      category: "Social",
      image: "images/bingo.jpg"
    },
    {
      title: "UC D.C. Session",
      desc: "Transfers, interested in interning in Washington D.C.",
      location: "RYA Community Room",
      date: "April 15",
      time: "3:00 PM",
      org: "Triton Transfer",
      tag: ["Academic", "Travel"],
      category: "Professional Development",
      image: "images/ucdc.jpg"
    },
    {
      title: "Pitch Perfect",
      desc: "Pitch Perfect 3",
      location: "Price Center",
      date: "April 16",
      time: "6:30 PM",
      org: "UCSD",
      tag: ["Movie"],
      category: "Social",
      image: "images/pitch.jpg"
    },
    {
      title: "Company Tour Viasat",
      desc: "Visit Viasat's Carlsbad office.",
      location: "Carlsbad",
      date: "April 17",
      time: "9:00 AM",
      org: "AIAA",
      tag: ["Professional Development", "Travel"],
      category: "Career",
      image: "images/viasat.png"
    },
    {
      title: "Black Violin: Full Circle Tour",
      desc: "Step into Black Violin’s Full Circle Tour, where GRAMMY-nominated duo Wil Baptiste and Kev Marcus redefine the possibilities of music by merging classical depth with hip-hop’s pulse.",
      location: "Epstein Family Amphitheater",
      date: "April 17",
      time: "7:30 PM",
      org: "ArtPower",
      tag: ["Performing", "Culture", "Music"],
      category: "Social",
      image: "images/violin.png"
    },
    {
      title: "Microadventure Hike",
      desc: "Tritons Rise With Outlook",
      location: "Torrey Pines",
      date: "April 24",
      time: "?",
      org: "Recreation",
      tag: ["Nature", "Fitness"], // multiple tags
      category: "Social",
      image: "images/nature.png"
    },
    {
      title: "Transfer Career Day",
      desc: "Headshots, resume review, public speaking tips",
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
      desc: "Sun God, an iconic festival with good music and delicious food, seems to be the perfect way to let loose in the middle of Spring Quarter.",
      location: "RIMAC Field",
      date: "May 2",
      time: "12:00 PM",
      org: "ASCE",
      tag: ["Performing", "Music"],
      category: "Social",
      image: "images/sungod.png"
    },
    {
      title: "Hello Keebs & Friends",
      desc: "This event is open to the public! UCSD students can attend for free; all other attendees must pay a small entry fee which will go towards event funding.",
      location: "UC San Diego, Student Services Center Multi Purpose Room and Matthew’s Quad",
      date: "May 24",
      time: "12:00 PM",
      org: "Keyboard Club",
      tag: ["Gaming", "Art"],
      category: "Social",
      image: "images/keebs.png"
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
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

  function showModal(src, title) {
    modal.style.display = "block";
    modalImg.src = src;
    modalTitle.textContent = title;
  }

  // ----- Create Event Card -----
  function createCard(event) {
    const card = document.createElement("div");
    card.className = "event-card";

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

    // Tags + Save button container
    const footer = document.createElement("div");
    footer.className = "event-footer";

    // Multiple tags
    event.tag.forEach(t => {
      const tagEl = document.createElement("span");
      tagEl.className = "event-tag";
      tagEl.innerText = t;
      footer.appendChild(tagEl);
    });

    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.className = "save-btn";
    saveBtn.innerText = isSaved(event) ? "Unsave" : "Save";
    if (isSaved(event)) saveBtn.classList.add("saved");

    saveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSave(event);
      saveBtn.classList.toggle("saved");
      saveBtn.innerText = saveBtn.classList.contains("saved") ? "Unsave" : "Save";
    });

    footer.appendChild(saveBtn);
    card.appendChild(footer);

    // Click card to show modal
    card.addEventListener("click", () => showModal(event.image, event.title));

    return card;
  }

  // ----- Render Functions -----
  let currentFilter = "All";

  function renderEvents(filter = "All") {
    personalContainer.innerHTML = "";
    allContainer.innerHTML = "";

    const filtered = filter === "All" 
      ? events 
      : events.filter(e => e.category === filter);

    filtered.forEach(event => {
      allContainer.appendChild(createCard(event));
      if (interests.some(i => event.tag.includes(i))) {
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

  // Filter buttons
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