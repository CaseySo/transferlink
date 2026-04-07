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

document.querySelectorAll('.interest-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const interest = btn.dataset.interest;

    if (selectedInterests.has(interest)) {
      selectedInterests.delete(interest);
      btn.classList.remove('selected');
    } else {
      selectedInterests.add(interest);
      btn.classList.add('selected');
    }

    updateCounter();
  });
});

// Update counter text
function updateCounter() {
  const count = selectedInterests.size;
  counter.textContent = `${count} interest${count !== 1 ? 's' : ''} selected`;
}
// Save data
function finishProfile() {
  const name = document.getElementById('name').value.trim();
  const major = document.getElementById('major').value;
  const college = document.getElementById('college').value;

  if (!name || !major || !college) {
    alert("Please fill out name, major, and college");
    return;
  }

  localStorage.setItem('name', name);
  localStorage.setItem('major', major);
  localStorage.setItem('college', college);
  localStorage.setItem('interests', JSON.stringify([...selectedInterests]));

  window.location.href = "home.html";
}

// Load saved data
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem('name');
  const major = localStorage.getItem('major');
  const college = localStorage.getItem('college');
  const interests = JSON.parse(localStorage.getItem('interests') || "[]");

  if (name) document.getElementById('name').value = name;
  if (major) document.getElementById('major').value = major;
  if (college) document.getElementById('college').value = college;

  document.querySelectorAll('.interest-btn').forEach(btn => {
    if (interests.includes(btn.dataset.interest)) {
      btn.classList.add('selected');
      selectedInterests.add(btn.dataset.interest);
    }
  });
});

/* ==============================
   Home Page JS
   ============================== */
document.addEventListener("DOMContentLoaded", () => {
  // Load username from profile
  const username = localStorage.getItem("name") || "Student"; // <-- correct key
  document.getElementById("greeting").innerText = `Welcome, ${username}!`;

  // Recommended cards (dynamic)
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