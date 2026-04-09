function navigateTo(page) {
  window.location.href = page;
}

/* ⭐ Generate Stars */
function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? "★" : "☆";
  }
  return stars;
}

document.addEventListener("DOMContentLoaded", () => {

  const sections = [
    {
      title: "RESOURCES",
      items: [
        { name: "Library", image: "https://via.placeholder.com/300x200", info: "Books, study rooms, research help." },
        { name: "Student Services", image: "https://via.placeholder.com/300x200", info: "Advising and support." },
        { name: "Tech Support", image: "https://via.placeholder.com/300x200", info: "Help with WiFi and devices." }
      ]
    },
    {
      title: "STUDY SPOTS",
      items: [
        { name: "Geisel Library", image: "https://via.placeholder.com/300x200", info: "Quiet and group study.", rating: 5 },
        { name: "Revelle Study Hall", image: "https://via.placeholder.com/300x200", info: "Low distraction.", rating: 4 },
        { name: "Campus Cafe", image: "https://via.placeholder.com/300x200", info: "Coffee + studying.", rating: 3 }
      ]
    },
    {
      title: "RESEARCH + JOB SEARCH HELP",
      items: [
        { name: "Career Center", image: "https://via.placeholder.com/300x200", info: "Internships and resumes." },
        { name: "Networking", image: "https://via.placeholder.com/300x200", info: "Meet recruiters." },
        { name: "Research Labs", image: "https://via.placeholder.com/300x200", info: "Join faculty research." }
      ]
    },
    {
      title: "TRANSPORTATION",
      items: [
        { name: "Campus Shuttle", 
            image: "https://via.placeholder.com/300x200", 
            info: "Get around campus for free" ,
            link: "https://shuttle.example.com"
        },
        { name: "Bike Routes", image: "https://via.placeholder.com/300x200", info: "Safe biking paths." },
        { name: "Parking", image: "https://via.placeholder.com/300x200", info: "Permits and zones." }
      ]
    }
  ];

  const container = document.getElementById("guide-sections");

  sections.forEach(section => {
    const sectionEl = document.createElement("div");
    sectionEl.className = "guide-section";

    const title = document.createElement("h2");
    title.textContent = section.title;

    const wrapper = document.createElement("div");
    wrapper.className = "carousel-wrapper";

    const cards = document.createElement("div");
    cards.className = "flip-cards-container";

    section.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "flip-card";

      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${item.image}">
            <h4>${item.name}</h4>
            ${item.rating ? `<div class="stars">${generateStars(item.rating)}</div>` : ""}
          </div>
          <div class="flip-card-back">
            <p>${item.info}</p>
            ${item.link ? `<a href="${item.link}" target="_blank" class="info-btn">More Info</a>` : ""}
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });

      cards.appendChild(card);
    });

    // arrows
    const left = document.createElement("button");
    left.className = "arrow arrow-left";
    left.innerHTML = "‹";
    left.onclick = () => cards.scrollBy({ left: -250, behavior: "smooth" });

    const right = document.createElement("button");
    right.className = "arrow arrow-right";
    right.innerHTML = "›";
    right.onclick = () => cards.scrollBy({ left: 250, behavior: "smooth" });

    wrapper.appendChild(left);
    wrapper.appendChild(cards);
    wrapper.appendChild(right);

    sectionEl.appendChild(title);
    sectionEl.appendChild(wrapper);

    container.appendChild(sectionEl);
  });
});