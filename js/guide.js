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
            image: "images/lib.jpg", 
            info: "The Go To Study Spot. Group study floors 1 and 2, quiet study floors 4 to 7, and silent study floor 8. Study rooms available for reservation. Open 24/5. Audrey's Cafe open on weekdays. Events Every Week!", 
            rating: 4.5,
            link: "https://library.ucsd.edu/"
         },
        { name: "WongAvery", 
            image: "images/wong.png", 
            info: "Low distraction. Located near the Medical Campus. Study room reservations available.", 
            rating: 4,
            link: "https://library.ucsd.edu/about/geisel-library-and-wongavery-library/wongavery-library.html"
        },
        { name: "Pinpoint Cafe", 
            image: "images/pinpoint.jpg", 
            info: "Two Locations, one next to the beach (outdoors), and one in the PCW (indoors). Great food, great vibes, has a UCSD discount for students", 
            rating: 5,
            link: "https://www.pinpoint-cafe.com/"
         },
         { name: "Sixth 5th floor Terrace", 
            image: "images/sixth.jpg", 
            info: "Great view of the ocean, many tables, but no outlets", 
            rating: 3,
            link: "https://artsandhumanities.ucsd.edu/initiatives/living-learning-neighborhood.html"
         },
         { name: "Computer Science and Engineering Building", 
            image: "images/cse.jpg", 
            info: "Quiet, no view (basement), but open at a variety of times including weekends.", 
            rating: 3,
            link: "https://cse.ucsd.edu/"
         },
         { name: "The Beach (La Jolla Shores)", 
            image: "images/beach.jpg", 
            info: "Take the SIO shuttle to Scripps Seaside Forum ! A bit unconventional, but a great place to study outdoors. Many cafe spots have outdoor seating. Better yet, bring a blanket. Wifi can be spotty but UCSD wifi does reach the beach. Tan, play music, and study = perfect combo!", 
            rating: 5,
            link: "https://transportation.ucsd.edu/campus/shuttles/sio.html"
         },
         { name: "Franklin Antonio Hall", 
            image: "images/fah.jpg", 
            info: "Pretty interior, many seating on different floors, not ideal for group study since the seating is mostly in the public eye. Has cafe on first floor open on weekdays with specials.", 
            rating: 4,
            link: "https://fah.ucsd.edu/"
         },
         { name: "Library Walk Hammocks", 
            image: "images/hammock.jpg", 
            info: "Campus Hammocks for relaxation and study. Located on Library walk, perfect for reading and studying. No outlets and wifi can be spotty at times.", 
            rating: 3,
            link: "https://library.ucsd.edu/"
         },
         { name: "Price Center", 
            image: "images/price.jpg", 
            info: "Open 24/7, food options avaiable. Not for quiet study, computers are avaiable for use, and printing is available.", 
            rating: 4,
            link: "https://universitycenters.ucsd.edu/visit/building-hours.html"
         },
         { name: "By College Study Halls", 
            image: "images/college.png", 
            info: "Each College has their own study hall spaces. Find one near you or most convenient!", 
            rating: 4,
            link: "https://students.ucsd.edu/campus-services/technology/campus-study-locations.html#roosevelt-college"
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
        { name: "RIMAC", 
            image: "images/rimac.jpg", 
            info: "Largest Campus Gym, has rooms to reserve for other sports. Classes and open rec available.",
            link: "https://recreation.ucsd.edu/facilities/"
         },
        { name: "Main Gym", 
            image: "images/maingym.webp", 
            info: "Smaller than RIMAC, but also less crowded",
            link: "https://recreation.ucsd.edu/facilities/"
        },
        { name: "Canyonview",
            image: "images/canyonview.webp",
            info: "Small Gym, Climbing, and Large Pool. Times vary.",
            link: "https://recreation.ucsd.edu/facilities/"
        },
        { name: "Outdoor Courts",
            image: "images/courts.webp",
            info: "Has open times, but some may need reservations (Pickleball + Tennis)",
            link: "https://recreation.ucsd.edu/facilities/"
        },
        {
            name: "TEC CAFE and TEC 2",
            image: "images/tec.jpg",
            info: "Triton Esports Center Located in the RIMAC Annex and Marshall College ",
            link: "https://recreation.ucsd.edu/facilities/"
        },
        {
            name: "Art Power + Events",
            image: "images/artpower.jpeg",
            info: "Performing Arts, Concerts, and MORE",
            link: "https://artpower.ucsd.edu/"
        },
        {
            name: "Craft Center",
            image: "images/craft.jpg",
            info: "Located in Sixth College, classes are available for multitude of crafts from painting to pottery to matcha making, as well as open studio. There are events weekly and times vary.",
            link: "https://craftcenter.ucsd.edu/"
        },
        {
            name: "Recreation Programs",
            image: "images/recp.jpeg",
            info: "Variety of classes available for students (surfing, yoga, etc.), as well as adventures (hiking, kayaking, etc.), gear rental is available.",
            link: "https://recreation.ucsd.edu/"
        },
        {
            name: "Intramural Sports",
            image: "images/intramural.jpeg",
            info: "Sports rotate every quarter. Meet new friends, play some games, and win prizes!",
            link: "https://recreation.ucsd.edu/competitive-sports/intramurals/"
        }
        
      ]
    },
    {
      title: "FUN THINGS TO DO + PLACES TO VISIT IN SAN DIEGO",
      items: [
        { name: "San Diego Zoo",
            image: "https://via.placeholder.com/300x200",
            info: "World-famous zoo with a wide variety of animals.",
            link: "https://www.sandiegozoo.org/"
         },
        { name: "Visit Balboa Park", 
            image: "https://via.placeholder.com/300x200", 
            info: "Advising and support.",
            link: "https://students.ucsd.edu/"
        },
        { name: "Birch Aquarium",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        },
        { name: "Explore Little Italy and Old Town",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        },
        { name: "Petco Park",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        },
        { name: "La Jolla Cove",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        },
        { name: "Hike Torrey Pines",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        },
        { name: "Explore Convoy",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        },
        { name: "Check out the Bioluminescence",
            image: "https://via.placeholder.com/300x200",
            info: "Help with WiFi and devices.",
            link: "https://blink.ucsd.edu/techsupport/"
        },
        { name: "Check out the Amazing Food",
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
      cards.scrollLeft = 0;

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
