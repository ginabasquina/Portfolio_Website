/*Menu Toggle*/
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});

let lastScrollY = window.scrollY; // Initial scroll position
const header = document.querySelector('.header'); // Select the header

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down: hide the header
        header.classList.add('hidden');
    } else {
        // Scrolling up: show the header
        header.classList.remove('hidden');
        header.classList.add('scrolled-up');
    }

    // Update the last scroll position
    lastScrollY = currentScrollY;
});



document.addEventListener("DOMContentLoaded", function () {
    const firstWordElement = document.getElementById("first-word");
    const secondWordElement = document.getElementById("second-word");

    const firstWords = ["Gina", "Web", "UX/UI", "Data"];
    const secondWords = ["Basquiña", "Developer", "Designer", "Analyst"];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseBetweenWords = 1500;

    function changeFirstWord() {
        firstWordElement.classList.add("fade-out");
        setTimeout(() => {
            firstWordElement.textContent = firstWords[textIndex];
            firstWordElement.classList.remove("fade-out");
            firstWordElement.classList.add("fade-in");
        }, 500); // Adjust timing as needed
    }

    function typeSecondWord() {
        let fullText = secondWords[textIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        secondWordElement.innerHTML = fullText.substring(0, charIndex);

        if (!isDeleting && charIndex === fullText.length) {
            setTimeout(() => {
                isDeleting = true;
                typeSecondWord();
            }, pauseBetweenWords);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % firstWords.length; // Move to next word
            changeFirstWord();
            setTimeout(typeSecondWord, 500);
        } else {
            setTimeout(typeSecondWord, isDeleting ? deletingSpeed : typingSpeed);
        }
    }

    changeFirstWord(); // Initialize first word
    typeSecondWord(); // Start typing effect
});


// Show "Projects" tab by default on page load
document.addEventListener('DOMContentLoaded', function () {
    const defaultTabButton = document.querySelector('.tab-btn[data-tab="projects"]');
    if (defaultTabButton) {
        defaultTabButton.click(); // Simulate a click to show the default tab
    }
});

function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.style.display = 'none');

    // Remove 'active' class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Show the selected tab
    document.getElementById(tabName).style.display = 'block';

    // Add 'active' class to the clicked tab
    event.target.classList.add('active');
}

// Show "Projects" tab by default on page load
document.addEventListener("DOMContentLoaded", function() {
    showTab('projects');
});


function openModal(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = 'flex'; // Ensures proper centering with flexbox
    modalImg.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
}


function toggleCertificates() {
    const allCertificates = document.querySelectorAll('.certificate-item');
    const seeMoreText = document.getElementById('seeMoreTextCertificates');

    // Check current state: are we showing or hiding?
    const isCurrentlyHidden = allCertificates[8]?.classList.contains('hidden');

    allCertificates.forEach((item, index) => {
        if (index >= 8) {
            if (isCurrentlyHidden) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });

    // Update text based on action
    seeMoreText.textContent = isCurrentlyHidden ? "See Less" : "See More";
}


function toggleProjects() {
    const allProjects = document.querySelectorAll('.project-item');
    const seeMoreText = document.getElementById('seeMoreTextProjects');

    let isExpanded = false; // <-- This was missing

    allProjects.forEach((item, index) => {
        if (index >= 6) {
            item.classList.toggle('hidden');
            if (!item.classList.contains('hidden')) {
                isExpanded = true;
            }
        }
    });

    seeMoreText.textContent = isExpanded ? "See Less" : "See More";
}


// Load JSON Data
let projects = [];

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        projects = data; // Store JSON data in the projects array
        initializeButtons();
    });

// Initialize Buttons with Click Listeners
function initializeButtons() {
    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', function () {
            const projectId = this.getAttribute('data-id');
            const project = projects[projectId];

            // Get Modal Elements
            const modalTitle = document.getElementById('projectModalLabel');
            const modalDescription = document.getElementById('projectDescription');
            const modalImage = document.getElementById('projectImage');

            // Populate Modal Content
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalImage.src = project.image;

            // Show Modal
            const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
            projectModal.show();
        });
    });
}
