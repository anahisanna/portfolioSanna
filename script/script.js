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

// PORTFOLIO

function createPortfolioFromJSON() {
    const track = document.getElementById("carouselTrack");
    let currentIndex = 0;
    let visibleCards = 3;
    let data = [];

    // Fonction pour déterminer le nombre de cartes visibles selon la taille de l'écran
    function getVisibleCards() {
        const width = window.innerWidth;
        if (width < 768) {
            return 1; // Mobile
        } else if (width < 1024) {
            return 2; // Tablette
        } else {
            return 3; // Desktop
        }
    }

    // Fonction pour afficher les cartes dans le carrousel
    function renderCards(startIndex) {
        visibleCards = getVisibleCards(); // Met à jour selon la taille actuelle
        track.innerHTML = "";
        const total = data.length;

        for (let i = 0; i < visibleCards; i++) {
            const index = (startIndex + i) % total;
            const item = data[index];
            const objectifsArray = item.objectifs || item.text || [];

            const card = document.createElement("div");
            card.classList.add("card", "portfolioContent");
            card.innerHTML = `
                <img class="card-img-top" src="images/${item.image}" />
                <div class="card-body">
                    <h4 class="card-title" onclick='openModal("${item.title}", ${JSON.stringify(objectifsArray)})'>
                        ${item.title}
                    </h4>
                    <div class="btn-group-custom">
                        <a href="${item.code}" class="btn-custom" target="_blank">Code</a>
                        <a href="${item.link}" class="btn-custom" target="_blank">Site web</a>
                    </div>
                </div>
            `;
            track.appendChild(card);
        }
    }

    // Requête fetch pour récupérer les données JSON
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData;
            renderCards(currentIndex);

            // Réaffiche les cartes si on redimensionne la fenêtre
            window.addEventListener("resize", () => {
                renderCards(currentIndex);
            });

            // Bouton suivant
            document.getElementById("nextBtn").addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % data.length;
                renderCards(currentIndex);
            });

            // Bouton précédent
            document.getElementById("prevBtn").addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + data.length) % data.length;
                renderCards(currentIndex);
            });
        });
}
// Ouvre la modale avec les objectifs
function openModal(title, objectifs) {
    document.getElementById("modalTitle").innerText = title;
    const content = document.getElementById("modalContent");
    content.innerHTML = objectifs.map(obj => `<li>📌 ${obj}</li>`).join("");
    document.getElementById("customModal").style.display = "flex";
}

// Ferme la modale
function closeModal() {
    document.getElementById("customModal").style.display = "none";
}

// Ferme la modale si on clique à l'extérieur
window.addEventListener("click", function (e) {
    const modal = document.getElementById("customModal");
    if (e.target === modal) {
        closeModal();
    }
});

// Ferme la modale avec la touche Échap
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal();
    }
});


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
