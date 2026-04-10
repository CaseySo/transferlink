/* ==============================
   Navigation
   ============================== */
function navigateTo(page) {
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {

  const page = window.location.pathname.split("/").pop();
  const pill = document.getElementById(page.replace(".html", "") + "-pill");
  if (pill) pill.classList.add("selected");

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
      interests: ["AI", "Culture", "Art"],
      email: "alice@ucsd.edu",
      instagram: "@alicecodes",
      image: "images/p1.png",
      going: ["SunGod Festival", "Company Tour Viasat"]
    },
    {
      name: "Bob Smith",
      major: "Biology (B.S.)",
      clubs: ["Bio Society"],
      interests: ["Nature", "Fitness", "Music"],
      email: "bob@ucsd.edu",
      instagram: "@bobbio",
      image: "images/p2.png",
      going: ["Microadventure Hike", "Midterm De-Stress"]
    },
    {
      name: "Clara Lee",
      major: "Computer Science (B.S.)",
      clubs: ["Design Club"],
      interests: ["Design", "Art", "Professional Development", "Gaming"],
      email: "clara@ucsd.edu",
      instagram: "@claradesign",
      image: "images/p3.png",
      going: ["SunGod Festival", "Pitch Perfect"]
    },
    {
      name: "Daniel Kim",
      major: "Data Science (B.S.)",
      clubs: ["DS Club"],
      interests: ["Data", "AI", "Travel"],
      email: "daniel@ucsd.edu",
      instagram: "@datadan",
      image: "images/p4.png",
      going: ["UC D.C. Session", "Transfer Career Day"]
    },
    {
      name: "John Snow",
      major: "Public Health (B.S.)",
      clubs: ["PH Club"],
      interests: ["Gaming", "Fitness"],
      email: "john@ucsd.edu",
      instagram: "@johnsnow",
      image: "images/p5.jpg",
      going: []
    },
    {
      name: "Jane Doe",
      major: "Mathematics (B.S.)",
      clubs: ["Math Club"],
      interests: ["Art", "Nature"],
      email: "jane@ucsd.edu",
      instagram: "@janedoe",
      image: "images/p6.webp",
      going: ["Bingo", "Midterm De-Stress"]
    },
    {
      name: "Spencer Reid",
      major: "Economics (B.A.)",
      clubs: ["Econ Club", "Finance Society", "Music"],
      interests: ["Art", "Nature", "Travel"],
      email: "spencer@ucsd.edu",
      instagram: "@spencerreid",
      image: "images/p7.webp",
      going: ["Hello Keebs & Friends", "Black Violin: Full Circle Tour"]
    },
    {
      name: "Sherlock Holmes",
      major: "Psychology (B.S.)",
      clubs: ["Detective Club", "Literature Society", "Mystery Enthusiasts"],
      interests: ["Books", "Performing", "Travel"],
      email: "sherlock@ucsd.edu",
      instagram: "@sherlockholmes",
      image: "images/p8.jpeg",
      going: ["Company Tour Viasat", "Black Violin: Full Circle Tour"]
    },
  ];
  localStorage.setItem("people", JSON.stringify(people));

  const peopleContainer = document.getElementById("people-carousel");

  const filteredPeople = people.filter(p =>
    p.major === userMajor ||
    p.interests.some(i => userInterests.includes(i))
  );

  const displayPeople = filteredPeople.length ? filteredPeople : people;

  displayPeople.forEach(p => {

    const card = document.createElement("div");
    card.className = "carousel-card people-card";

    // ===== MATCH SCORE =====
    let matchScore = 0;

    if (p.major === userMajor) matchScore += 40;

    const sharedInterests = p.interests.filter(i =>
      userInterests.includes(i)
    );

    matchScore += sharedInterests.length * 12;

    if (sharedInterests.length >= 3) matchScore += 10;

    matchScore = Math.min(matchScore, 100);

    const vibe =
      matchScore > 70 ? "Highly Compatible" :
      matchScore > 40 ? "Good Match" : "Explore";

    const goingText = p.going?.length
      ? "Going to: " + p.going.slice(0, 3).join(", ")
      : "Not going to events yet";

    card.innerHTML = `
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>${p.major}</p>

      <p class="match">${matchScore}% match • ${vibe}</p>

      <p class="shared">
        ${sharedInterests.length ? "Shared: " + sharedInterests.join(", ") : ""}
      </p>

      <p class="going">
        ${goingText}
      </p>
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
  const clubsContainer = document.getElementById("clubs-container");

  const clubs = [
    {
      name: "Data Science Student Society",
      desc: "Expanding AI & data science community.",
      instagram: "@ds3atucsd",
      image: "images/club1.png",
      majors: ["Computer Science (B.S.)", "Data Science (B.S.)"],
      interests: ["AI", "Coding"]
    },
    {
      name: "Bio Society",
      desc: "Professional development & community service.",
      instagram: "@bssa_at_ucsd",
      image: "images/club2.png",
      majors: ["Biology (B.S.)", "Public Health (B.S.)"],
      interests: ["Nature", "Research", "Professional Development"]
    }
  ];

  const filteredClubs = clubs.filter(c =>
    c.majors.includes(userMajor) ||
    c.interests.some(i => userInterests.includes(i))
  );

  const displayClubs = filteredClubs.length ? filteredClubs : clubs;

  displayClubs.forEach(c => {
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

  const allGroups = [
    { course: "CSE101", name: "CSE 101 Study Group", email: "____@ucsd.edu", image: "images/study.jpg" },
    { course: "CSE110", name: "CSE 110 Project Group", email: "____@ucsd.edu", image: "images/study.jpg" },
    { course: "CSE120", name: "CSE 120 Lab Group", email: "____@ucsd.edu", image: "images/study.jpg" },
    { course: "DSC10", name: "DSC 10 Study Group", email: "____@ucsd.edu", image: "images/study.jpg" },
    { course: "BILD1", name: "BILD 1 Study Group", email: "____@ucsd.edu", image: "images/study.jpg" },
    { course: "PSYC60", name: "Psych 60 Study Group", email: "____@ucsd.edu", image: "images/study.jpg" },
    { course: "MATH20A", name: "Math 20A Study Group", email: "____@ucsd.edu", image: "images/study.jpg" },
    { course: "ART10", name: "Art 10 Workshop Group", email: "____@ucsd.edu", image: "images/study.jpg" },
    { course: "PH100", name: "Public Health 100 Study Group", email: "____@ucsd.edu", image: "images/study.jpg" }
  ];

  const groupsContainer = document.getElementById("groups-container");

  const recommendedCourses = majorToCourses[userMajor] || [];
  const filteredGroups = allGroups.filter(g => recommendedCourses.includes(g.course));

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
    card.dataset.email = g.email;
    card.dataset.img = g.image;

    groupsContainer.appendChild(card);
  });


  /* ==============================
     MODAL
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

    if (card.dataset.type === "club") {
      modalDesc.innerHTML = `
        ${card.dataset.desc}<br><br>
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

/* ==============================
   Profile Initial
   ============================== */
if (document.getElementById("profile-initial")) {
  const name = localStorage.getItem("name");
  const initial = document.getElementById("profile-initial");

  if (name && initial) {
    initial.textContent = name.charAt(0).toUpperCase();
  }
}