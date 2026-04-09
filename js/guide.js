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
      title: "STUDY SPOTS",
      items: [
        { name: "Geisel Library", 
            image: "https://via.placeholder.com/300x200", 
            info: "Quiet and group study.", 
            rating: 5,
            link: "https://library.ucsd.edu/"
         },
        { name: "Revelle Study Hall", 
            image: "https://via.placeholder.com/300x200", 
            info: "Low distraction.", 
            rating: 4,
            link: "https://students.ucsd.edu/campus-services/academic-support/study-halls/revelle.html"
        },
        { name: "Campus Cafe", 
            image: "https://via.placeholder.com/300x200", 
            info: "Coffee + studying.", 
            rating: 3,
            link: "https://students.ucsd.edu/campus-services/academic-support/study-halls/revelle.html"
         }
      ]
    },
    {
      title: "RESEARCH + JOB SEARCH HELP",
      items: [
        { name: "Career Center", 
            image: "images/career.png", 
            info: "No matter where you are in your search, resources are available to help. Tell us a little about yourself and we’ll point you in the right direction." ,
            link: "https://career.ucsd.edu/"
        },
        { name: "Handshake", 
            image: "images/handshake.png", 
            info: "Find on-campus jobs, research labs, etc." ,
            link: "https://ucsd.joinhandshake.com/explore"
        },
        { name: "Networking", 
            image: "images/connect.jpg", 
            info: "Tritons Connect is your UC San Diego resource, connecting alumni, students, faculty and staff to the greater campus community. Engage with mentors, join specialized interest groups, access a robust Triton directory and so much more." ,
            link: "https://tritonsconnect.com/"
        }
      ]
    },
    {
      title: "RECREATION ON CAMPUS",
      items: [
        { name: "Library", 
            image: "https://via.placeholder.com/300x200", 
            info: "Books, study rooms, research help.",
            link: "https://library.ucsd.edu/"
         },
        { name: "Student Services", 
            image: "https://via.placeholder.com/300x200", info: "Advising and support.",
            link: "https://students.ucsd.edu/"
        },
        { name: "Tech Support",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        }
      ]
    },
    {
      title: "FUN THINGS TO DO IN SAN DIEGO",
      items: [
        { name: "Library", 
            image: "https://via.placeholder.com/300x200", 
            info: "Books, study rooms, research help.",
            link: "https://library.ucsd.edu/"
         },
        { name: "Student Services", 
            image: "https://via.placeholder.com/300x200", info: "Advising and support.",
            link: "https://students.ucsd.edu/"
        },
        { name: "Tech Support",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        }
      ]
    },
    {
      title: "HEALTH AND WELLNESS",
      items: [
        { name: "Library", image: "https://via.placeholder.com/300x200", info: "Books, study rooms, research help." },
        { name: "Student Services", image: "https://via.placeholder.com/300x200", info: "Advising and support." },
        { name: "Tech Support", image: "https://via.placeholder.com/300x200", info: "Help with WiFi and devices." }
      ]
    },
    {
      title: "TRANSPORTATION AND NAVIGATION",
      items: [
        { name: "UCSD Map", 
            image: "images/ucsdmap.webp", 
            info: "Plan your route around campus." ,
            link: "https://maps.ucsd.edu/map/default.htm"
        },
        { name: "Campus Shuttle", 
            image: "images/shuttle.jpg", 
            info: "Get around campus for free, download the Transit App" ,
            link: "https://transportation.ucsd.edu/campus/shuttles/index.html"
        },
        { name: "MTS Buses and Trolley", 
            image: "images/mts.jpg", 
            info: "Take public transit to get around San Diego. Don't forget to get the Pronto App! Free for student, included in tuition.",
            link: "https://transportation.ucsd.edu/commute/transit/index.html"
        },
        { name: "Need to get the SAN Airport?", 
            image: "images/flyer.jpeg", 
            info: "Take the blue line trolley to San Ysidro till Old Town and transfer to the Free San Diego Flyer, takes about 1 hour",
            link: "https://students.ucsd.edu/campus-services/parking-transportation/holidays.html"
        },
        {
            name: "Taking AmTrak?",
            image: "images/amtrak.webp",
            info: "Take the blue line trolley to San Ysidro till Old Town and transfer to AmTrak",
            link: "https://students.ucsd.edu/campus-services/parking-transportation/holidays.html"
        },
        {
            name: "Parking",
            image: "images/parking.jpg",
            info: "Permits and zones.",
            link: "https://transportation.ucsd.edu/commute/permits/index.html"
        }
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