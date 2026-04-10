/* ==============================
   General Utilities
   ============================== */

// Navigation helper
function navigateTo(page) {
  window.location.href = page;
}
/* ==============================
   Backgrounds
   ============================== */
document.addEventListener("DOMContentLoaded", () => {

  // ===== INDEX (login page) =====
  if (document.getElementById('email')) {
    document.body.classList.add("index-bg");
  }

  // ===== PROFILE PAGE =====
  if (document.getElementById('name')) {
    document.body.classList.add("profile-bg");
  }

  // ===== HOME PAGE =====
  if (document.getElementById('greeting')) {
    document.body.classList.add("home-bg");
  }

});
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

  // Render dropdown helper
  function renderDropdown(list) {
    dropdown.innerHTML = "";

    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "dropdown-item";
      div.textContent = item;

      div.addEventListener("click", () => {
        input.value = item;
        dropdown.style.display = "none";
      });

      dropdown.appendChild(div);
    });

    dropdown.style.display = list.length ? "block" : "none";
  }

  // TYPE TO FILTER
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();

    const filtered = dataList.filter(item =>
      item.toLowerCase().includes(query)
    );

    renderDropdown(filtered);
  });

  // CLICK / FOCUS TO SHOW FULL LIST (ONLY IF EMPTY)
  input.addEventListener("focus", () => {
    if (input.value.trim() !== "") return;
    renderDropdown(dataList);
  });

  input.addEventListener("click", () => {
    if (input.value.trim() !== "") return;
    renderDropdown(dataList);
  });

  // CLICK OUTSIDE TO CLOSE
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
        panel.style.maxHeight = null;
        panel.classList.remove("open");
        button.classList.remove("active");
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.classList.add("open");
        button.classList.add("active");
        setTimeout(() => {
          if (panel.classList.contains("open")) {
            panel.style.maxHeight = "none";
          }
        }, 300);
      }
    });
  });
});

/* ==============================
   Events Page JS (CLEAN FIX)
   ============================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     PEOPLE (from Community)
     ============================== */
  const people = JSON.parse(localStorage.getItem("people") || "[]");

  function getPeopleGoing(eventTitle) {
    return people.filter(p => p.going?.includes(eventTitle));
  }

  /* ==============================
     MODAL (PERSON)
     ============================== */
  const personModal = document.createElement("div");
  personModal.className = "modal";
  personModal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <img id="person-img" />
      <h3 id="person-name"></h3>
      <p id="person-info"></p>
    </div>
  `;
  document.body.appendChild(personModal);

  const personImg = personModal.querySelector("#person-img");
  const personName = personModal.querySelector("#person-name");
  const personInfo = personModal.querySelector("#person-info");

  function showPersonModal(p) {
    personImg.src = p.image;
    personName.innerText = p.name;

    personInfo.innerHTML = `
      <strong>Major:</strong> ${p.major}<br>
      📧 ${p.email}<br>
      📸 ${p.instagram}
    `;

    personModal.style.display = "flex";
  }

  personModal.querySelector(".close-btn").onclick = () => {
    personModal.style.display = "none";
  };

  personModal.onclick = (e) => {
    if (e.target === personModal) personModal.style.display = "none";
  };

  /* ==============================
     DATA
     ============================== */
  const personalContainer = document.getElementById("personal-events");
  const allContainer = document.getElementById("all-events");
  const savedContainer = document.getElementById("saved-events");

  const interests = JSON.parse(localStorage.getItem("interests") || "[]");
  let savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

  const events = [
    {
      title: "Bingo",
      desc: "Play Bingo",
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
      title: "Midterm De-Stress",
      desc: "Free boba and goodie bags",
      location: "PCE Lodge",
      date: "April 16",
      time: "7:00 PM",
      org: "RCO",
      tag: ["Study"],
      category: "Academic",
      image: "images/destress.png"
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
      desc: "Music + performance event",
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
      tag: ["Nature", "Fitness"],
      category: "Social",
      image: "images/nature.png"
    },
    {
      title: "Transfer Career Day",
      desc: "Resume + networking",
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
      desc: "Big campus festival",
      location: "RIMAC Field",
      date: "May 2",
      time: "12:00 PM",
      org: "ASCE",
      tag: ["Performing", "Music"],
      category: "Social",
      image: "images/sungod.png"
    }
  ];

  /* ==============================
     HELPERS
     ============================== */
  function isSaved(event) {
    return savedEvents.some(e => e.title === event.title);
  }

  function toggleSave(event) {
    const index = savedEvents.findIndex(e => e.title === event.title);

    if (index > -1) savedEvents.splice(index, 1);
    else savedEvents.push(event);

    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    updateUI(currentFilter);
  }

  /* ==============================
     EVENT CARD
     ============================== */
  function createCard(event) {
  const card = document.createElement("div");
  card.className = "event-card";

  if (isSaved(event)) card.classList.add("saved-card");

  const goingPeople = getPeopleGoing(event.title);

  /* ==============================
     GOING (INSIDE CARD BODY)
     ============================== */
  const goingHTML = `
    <div class="going-container">
      <strong>Going:</strong>
      ${
        goingPeople.length
          ? goingPeople
              .map(
                p => `
                  <span class="going-name" data-name="${p.name}">
                    ${p.name}
                  </span>
                `
              )
              .join(" ")
          : `<em>No one going yet</em>`
      }
    </div>
  `;

  /* ==============================
     TAGS (LEFT SIDE OF FOOTER)
     ============================== */
  const tagsHTML = `
    <div class="event-tags">
      ${event.tag.map(t => `<span class="event-tag">${t}</span>`).join(" ")}
    </div>
  `;

  card.innerHTML = `
    <h3>${event.title}</h3>
    <p>${event.desc}</p>

    <div class="event-details">
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Org:</strong> ${event.org}</p>
      <p><strong>Location:</strong> ${event.location}</p>
    </div>

    ${goingHTML}
  `;

  /* ==============================
     FOOTER (TAGS LEFT + SAVE RIGHT)
     ============================== */
  const footer = document.createElement("div");
  footer.className = "event-footer";

  const left = document.createElement("div");
  left.className = "footer-left";
  left.innerHTML = tagsHTML;

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn-square";

  function refreshSave() {
    const saved = isSaved(event);
    saveBtn.textContent = saved ? "Saved" : "Save";
    saveBtn.classList.toggle("saved", saved);
  }

  refreshSave();

  saveBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSave(event);
    refreshSave();
  });

  footer.appendChild(left);
  footer.appendChild(saveBtn);
  card.appendChild(footer);

  /* ==============================
     CLICK LOGIC (GOING + MODAL)
     ============================== */
  card.addEventListener("click", (e) => {
    const nameClick = e.target.closest(".going-name");

    if (nameClick) {
      e.stopPropagation();
      const person = people.find(p => p.name === nameClick.dataset.name);
      if (person) showPersonModal(person);
      return;
    }

    showModal(event.image, event.title);
  });

  return card;
}

  /* ==============================
     RENDER
     ============================== */
  let currentFilter = "All";

  function renderEvents(filter = "All") {
    personalContainer.innerHTML = "";
    allContainer.innerHTML = "";

    events.forEach(event => {
      const matches = interests.some(i => event.tag.includes(i));
      if (matches && !isSaved(event)) {
        personalContainer.appendChild(createCard(event));
      }
    });

    let filtered = events;

    if (filter !== "All") {
      filtered = events.filter(e => e.category === filter);
    }

    filtered = filtered.filter(e => {
      const isPersonal = interests.some(i => e.tag.includes(i));
      return !isSaved(e) && !isPersonal;
    });

    filtered.forEach(event => {
      allContainer.appendChild(createCard(event));
    });
  }

  function renderSaved() {
    savedContainer.innerHTML = "";
    savedEvents.forEach(event => {
      savedContainer.appendChild(createCard(event));
    });
  }

  function updateUI(filter = "All") {
    currentFilter = filter;
    renderEvents(filter);
    renderSaved();
  }

  /* ==============================
     FILTER BUTTONS
     ============================== */
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
const name = localStorage.getItem("name");
const initial = document.getElementById("profile-initial");

if (name && initial) {
  initial.textContent = name.charAt(0).toUpperCase();
}