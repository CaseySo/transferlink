/* ==============================
   Navigation
   ============================== */
function navigateTo(page) {
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== Highlight current page =====
  const page = window.location.pathname.split("/").pop();
  const pill = document.getElementById(page.replace(".html", "") + "-pill");
  if (pill) pill.classList.add("selected");

  // ===== Get user data =====
  const userMajor = localStorage.getItem("major") || "";
  const userInterests = JSON.parse(localStorage.getItem("interests") || "[]");
  const userCourses = JSON.parse(localStorage.getItem("courses") || "[]");

  /* ==============================
     PEOPLE (PERSONALIZED)
     ============================== */
  const people = [
    {
      name: "Alice Johnson",
      major: "Computer Science (B.S.)",
      clubs: ["AI Club", "Women in Computing"],
      interests: ["AI", "Coding"],
      email: "alice@ucsd.edu",
      instagram: "@alicecodes",
      image: "images/person1.jpg"
    },
    {
      name: "Bob Smith",
      major: "Biology (B.S.)",
      clubs: ["Bio Society"],
      interests: ["Nature", "Fitness"],
      email: "bob@ucsd.edu",
      instagram: "@bobbio",
      image: "images/person2.jpg"
    },
    {
      name: "Clara Lee",
      major: "Computer Science (B.S.)",
      clubs: ["Design Club"],
      interests: ["Design", "Art"],
      email: "clara@ucsd.edu",
      instagram: "@claradesign",
      image: "images/person3.jpg"
    },
    {
      name: "Daniel Kim",
      major: "Data Science (B.S.)",
      clubs: ["DS Club"],
      interests: ["Data", "AI"],
      email: "daniel@ucsd.edu",
      instagram: "@datadan",
      image: "images/person4.jpg"
    }
  ];

  const peopleContainer = document.getElementById("people-carousel");

  const filteredPeople = people.filter(p =>
    p.major === userMajor ||
    p.interests.some(i => userInterests.includes(i))
  );

  const displayPeople = filteredPeople.length ? filteredPeople : people;

  displayPeople.forEach(p => {
    const card = document.createElement("div");
    card.className = "carousel-card people-card";

    card.innerHTML = `
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>${p.major}</p>
    `;

    card.dataset.type = "person";
    card.dataset.name = p.name;
    card.dataset.major = p.major;
    card.dataset.clubs = p.clubs.join(", ");
    card.dataset.email = p.email;
    card.dataset.instagram = p.instagram;
    card.dataset.img = p.image;

    peopleContainer.appendChild(card);
  });

  /* ==============================
     CLUBS
     ============================== */
  const clubs = [
    {
      name: "AI Club",
      desc: "Build AI projects",
      instagram: "@ai_ucsd",
      image: "images/club1.jpg"
    },
    {
      name: "Bio Society",
      desc: "Biology + research",
      instagram: "@bio_ucsd",
      image: "images/club2.jpg"
    }
  ];

  const clubsContainer = document.getElementById("clubs-container");

  clubs.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${c.image}">
      <h4>${c.name}</h4>
      <p>${c.desc}</p>
    `;

    card.dataset.type = "club";
    card.dataset.name = c.name;
    card.dataset.desc = c.desc;
    card.dataset.instagram = c.instagram;
    card.dataset.img = c.image;

    clubsContainer.appendChild(card);
  });

  /* ==============================
     STUDY GROUPS
     ============================== */
    /* ==============================
     STUDY GROUPS (Dynamic by Major)
     ============================== */

  // Map majors → courses
  const majorToCourses = {
    "Computer Science (B.S.)": ["CSE101", "CSE110", "CSE120"],
    "Data Science (B.S.)": ["DSC10", "DSC20", "DSC40A"],
    "Biology (B.S.)": ["BILD1", "BILD2", "BICD100"],
    "Cognitive Science (B.S.)": ["COGS10", "COGS101"],
    "Psychology (B.S.)": ["PSYC60", "PSYC70"],
    "Economics (B.A.)": ["ECON1", "ECON2"],
    "Mathematics (B.S.)": ["MATH20A", "MATH20B", "MATH21A"],
    "Mechanical Engineering (B.S.)": ["ME101", "ME102"],
    "Visual Arts (B.A.)": ["ART10", "ART20"],
    "Public Health (B.S.)": ["PH100", "PH101"]
  };

  // All available groups
  const allGroups = [
    { course: "CSE101", name: "CSE 101 Study Group", instagram: "@cse101group", image: "images/group1.jpg" },
    { course: "CSE110", name: "CSE 110 Project Group", instagram: "@cse110group", image: "images/group2.jpg" },
    { course: "CSE120", name: "CSE 120 Lab Group", instagram: "@cse120group", image: "images/group3.jpg" },
    { course: "DSC10", name: "DSC 10 Study Group", instagram: "@dsc10group", image: "images/group4.jpg" },
    { course: "BILD1", name: "BILD 1 Study Group", instagram: "@bild1group", image: "images/group5.jpg" },
    { course: "PSYC60", name: "Psych 60 Study Group", instagram: "@psych60group", image: "images/group6.jpg" },
    { course: "MATH20A", name: "Math 20A Study Group", instagram: "@math20agroup", image: "images/group7.jpg" },
    { course: "ART10", name: "Art 10 Workshop Group", instagram: "@art10group", image: "images/group8.jpg" },
    { course: "PH100", name: "Public Health 100 Study Group", instagram: "@ph100group", image: "images/group9.jpg" }
  ];

  const groupsContainer = document.getElementById("groups-container");

  // Filter groups based on the user's major
  const recommendedCourses = majorToCourses[userMajor] || [];
  const filteredGroups = allGroups.filter(g => recommendedCourses.includes(g.course));

  // If no groups match the major, show all
  const displayGroups = filteredGroups.length ? filteredGroups : allGroups;

  displayGroups.forEach(g => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${g.image}" alt="${g.name}">
      <h4>${g.name}</h4>
      <p>${g.course}</p>
    `;

    card.dataset.type = "group";
    card.dataset.name = g.name;
    card.dataset.instagram = g.instagram;
    card.dataset.img = g.image;

    groupsContainer.appendChild(card);
  });

  /* ==============================
     MODAL (WORKS FOR ALL)
     ============================== */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeBtn = document.getElementById("close-modal");

  document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".card, .people-card");
    if (!card) return;

    modal.style.display = "flex";
    modalImg.src = card.dataset.img;
    modalTitle.textContent = card.dataset.name;

    if (card.dataset.type === "person") {
      modalDesc.innerHTML = `
        <strong>Major:</strong> ${card.dataset.major}<br>
        <strong>Clubs:</strong> ${card.dataset.clubs}<br><br>
        📧 ${card.dataset.email}<br>
        📸 ${card.dataset.instagram}
      `;
    }

    else if (card.dataset.type === "club") {
      modalDesc.innerHTML = `
        ${card.dataset.desc}<br><br>
        📸 ${card.dataset.instagram}
      `;
    }

    else if (card.dataset.type === "group") {
      modalDesc.innerHTML = `
        Study Group<br><br>
        📸 ${card.dataset.instagram}
      `;
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

});