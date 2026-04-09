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

// Updated highlights with date info
const highlights = [
  { title: "Career Fair", body: "Meet top employers and explore internship & job opportunities.", tag: "Career", date: "2026-04-20" },
  { title: "Sun God Festival", body: "Join the biggest campus festival of the year with music, food, and fun!", tag: "Festival", date: "2026-05-05" },
  { title: "Viasat Info Session", body: "Learn about career opportunities at Viasat and network with recruiters.", tag: "Tech", date: "2026-05-15" },
  { title: "Campus Tour", body: "Guided tour of UCSD’s iconic spots.", tag: "Campus", date: "2026-06-01" },   // ignored
  { title: "Hackathon", body: "Show off your coding skills in our annual hackathon event.", tag: "Tech", date: "2026-06-10" } // ignored
];

// Filter only the three events we want
const filteredHighlights = highlights.filter(event => 
  ["Career Fair", "Sun God Festival", "Viasat Info Session"].includes(event.title)
);

// Sort by date ascending (closest first)
filteredHighlights.sort((a,b) => new Date(a.date) - new Date(b.date));

// ===== Populate Newsletter =====
document.getElementById("newsletter-title").innerText = newsletter.title;
document.getElementById("newsletter-body").innerText = newsletter.body;

// ===== Populate Highlights =====
const highlightsContainer = document.getElementById("highlights");
filteredHighlights.forEach(event => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${event.title}</h3>
    <p>${event.body}</p>
    <div class="event-footer">
      <span class="event-tag">${event.tag}</span>
      <button class="save-btn">Save</button>
    </div>
  `;
  highlightsContainer.appendChild(card);
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
  card.className = "card";
  card.innerHTML = `
    <h3>${tip.title}</h3>
    <p>${tip.body}</p>
  `;
  tipsContainer.appendChild(card);
});

// ===== Save Button Toggle =====
document.addEventListener("click", function(e) {
  if(e.target.classList.contains("save-btn")) {
    e.target.classList.toggle("saved");
    e.target.innerText = e.target.classList.contains("saved") ? "Saved" : "Save";
  }
});