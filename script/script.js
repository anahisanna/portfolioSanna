// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const track = document.getElementById("carouselTrack");

    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            let visibleCards = 3;
            let currentIndex = 0;
            const total = data.length;

            function renderCards(startIndex) {
                track.innerHTML = "";

                for (let i = 0; i < visibleCards; i++) {
                    const index = (startIndex + i) % total;
                    const item = data[index];

                    const card = document.createElement("div");
                    card.classList.add("card", "portfolioContent");
                    card.innerHTML = `
                        <img class="card-img-top" src="images/${item.image}" />
                        <div class="card-body">
                            <h4 class="card-title">${item.title}</h4>
                            <p class="card-text">${item.text}</p>
                            <div class="btn-group-custom">
    <a href="${item.code}" class="btn-custom">Code</a>
    <a href="${item.link}" class="btn-custom">Site web</a>
</div>

                        </div>
                    `;
                    track.appendChild(card);
                }
            }

            // Navigation - Avancer de 1 image à la fois
            document.getElementById("nextBtn").addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % total;
                renderCards(currentIndex);
            });

            document.getElementById("prevBtn").addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + total) % total;
                renderCards(currentIndex);
            });

            // Initialisation
            renderCards(currentIndex);
        });
}
// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function renderSkillsGrid() {
    const container = document.getElementById("skillsGrid");

    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((section) => {
                const col = document.createElement("div");
                col.className = "col-md-6 col-lg-3 mb-4";

                const card = document.createElement("div");
                card.className = "p-3 shadow-sm rounded bg-light h-100";

                const title = document.createElement("h5");
                title.className = "mb-3 fw-bold";
                title.innerText = section.category;

                const ul = document.createElement("ul");
                ul.className = "list-unstyled";

                section.skills.forEach((skill) => {
                    const li = document.createElement("li");
                    li.className = "mb-2 d-flex align-items-center gap-2";
                    li.innerHTML = `<i class="${skill.icon}" style="color: #B96F4E;"></i> <span style="color: #5A6F57;">${skill.name}</span>`;

                    ul.appendChild(li);
                });

                card.appendChild(title);
                card.appendChild(ul);
                col.appendChild(card);
                container.appendChild(col);
            });
        });
}



// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createPortfolioFromJSON();
renderSkillsGrid();     
