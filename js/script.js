/* ==============================
   Login Page JS
   ============================== */

function startApp() {
  const email = document.getElementById('email').value.trim();

  // Validate email
  if (!email) {
    alert("Please enter your UCSD email");
    return;
  }

  if (!email.endsWith("@ucsd.edu")) {
    alert("Please enter a valid UCSD email ending with @ucsd.edu");
    return;
  }

  // Save email to localStorage for later pages
  localStorage.setItem('email', email);

  // Redirect to profile setup page
  window.location.href = "profile.html";
}

/* ==============================
   Profile Page JS
   ============================== */

const selectedInterests = new Set();
const counter = document.getElementById('interest-count');

// Toggle interests
document.querySelectorAll('.interest-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const interest = btn.dataset.interest;
    if (selectedInterests.has(interest)) {
      selectedInterests.delete(interest);
      btn.classList.remove('selected');
    } else {
      if (selectedInterests.size >= 3) {
        alert("You can only select up to 3 interests");
        return;
      }
      selectedInterests.add(interest);
      btn.classList.add('selected');
    }
    updateCounter();
  });
});

// Update counter
function updateCounter() {
  const count = selectedInterests.size;
  counter.textContent = `${count} interest${count !== 1 ? 's' : ''} selected`;
}

// Finish profile
function finishProfile() {
  const name = document.getElementById('name').value.trim();
  const major = document.getElementById('major').value;
  const college = document.getElementById('college').value;

  if (!name || !major || !college) {
    alert("Please fill out name, major, and college");
    return;
  }

  // Save to localStorage
  localStorage.setItem('name', name);
  localStorage.setItem('major', major);
  localStorage.setItem('college', college);
  localStorage.setItem('interests', JSON.stringify([...selectedInterests]));

  // Go to home page
  window.location.href = "home.html";
}

// Load saved profile data if available
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem('name');
  const major = localStorage.getItem('major');
  const college = localStorage.getItem('college');
  const interests = JSON.parse(localStorage.getItem('interests') || "[]");

  if (name) document.getElementById('name').value = name;
  if (major) document.getElementById('major').value = major;
  if (college) document.getElementById('college').value = college;

  interests.forEach(interest => {
    const btn = document.querySelector(`.interest-btn[data-interest="${interest}"]`);
    if (btn) {
      btn.classList.add('selected');
      selectedInterests.add(interest);
    }
  });

  updateCounter();
});
/* ==============================
   Home Page JS
   ============================== */
document.addEventListener("DOMContentLoaded", () => {
  // Load profile info from localStorage
  const name = localStorage.getItem("name") || "Student"; // ✅ use 'name'
  const major = localStorage.getItem("major") || "";
  const college = localStorage.getItem("college") || "";
  const interests = JSON.parse(localStorage.getItem("interests") || "[]");

  // Display greeting
  document.getElementById("greeting").innerText = `Welcome, ${name}!`;

  // Display major, college, and interests
  const profileInfoEl = document.getElementById("profile-info");
  const interestText = interests.length ? interests.join(", ") : "No interests selected";
  let profileText = "";
  if (major) profileText += `${major} major`;
  if (college) profileText += `${major ? ", " : ""}${college} College`;
  profileText += `\nInterests: ${interestText}`;
  profileInfoEl.innerText = profileText;

  // Recommended cards
  const recommendations = [
    { title: "Math Workshop", desc: "Boost your calculus skills", link: "#" },
    { title: "Coding Club Meetup", desc: "Meet fellow programmers", link: "#" },
    { title: "Volunteering Fair", desc: "Find ways to give back", link: "#" },
  ];

  const recContainer = document.getElementById("recommendations");
  recommendations.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
    card.addEventListener("click", () => {
      window.location.href = item.link;
    });
    recContainer.appendChild(card);
  });
});

// Navigation helper
function navigateTo(page) {
  window.location.href = page;
}