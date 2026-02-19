// // ૧. ડેટા લિસ્ટ
// const infoList = [
//     { title: "Cross-Domain Engineer", desc: "Engineering is about solving problems." },
//     { title: "Creative Technologist", desc: "Blending creativity and technology." },
//     { title: "Problem Solver", desc: "Always finding solutions." }
// ];

// let infoIndex = 0;

// // ૨. ઇન્ફો ચેન્જ ફંક્શન
// function changeInfo() {
//     const subtitle = document.getElementById("subtitle");
//     const description = document.getElementById("description");
//     if (subtitle && description) {
//         infoIndex = (infoIndex + 1) % infoList.length;
//         subtitle.textContent = infoList[infoIndex].title;
//         description.textContent = infoList[infoIndex].desc;
//     }
// }
// setInterval(changeInfo, 3000);

// // ૩. કોન્ટેક્ટ ફોર્મ (આ ભાગ ધ્યાનથી જોજો)
// function setupContactForm() {
//     const contactForm = document.getElementById('contact-form');
//     if (contactForm) {
//         contactForm.addEventListener('submit', async (e) => {
//             e.preventDefault(); // રિલોડ રોકવા માટે

//             const formData = {
//                 name: document.getElementById('name').value,
//                 email: document.getElementById('email').value,
//                 subject: document.getElementById('subject').value,
//                 message: document.getElementById('message').value
//             };

//             try {
//                 const response = await fetch('http://localhost:5000/api/connect', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(formData)
//                 });

//                 const result = await response.json();
//                 if (result.success) {
//                     alert("🚀 MongoDB માં ડેટા સેવ થઈ ગયો!");
//                     contactForm.reset();
//                 }
//             } catch (error) {
//                 console.error("Error:", error);
//                 alert("❌ સર્વર કનેક્શનમાં ભૂલ છે. શું Node.js ચાલુ છે?");
//             }
//         });
//     }
// }

// document.addEventListener('DOMContentLoaded', setupContactForm);



// async function loadProjects() {
//     try {
//         const response = await fetch('http://localhost:5000/api/projects');
//         const projects = await response.json();

//         const projectContainer = document.querySelector('.project-grid-modern');
//         // જો તમે ઈચ્છો તો અહીં જૂના સ્ટેટિક પ્રોજેક્ટ્સ ક્લિયર કરી શકો:
//         // projectContainer.innerHTML = ''; 

//         projects.forEach(proj => {
//             const projectHTML = `
//                 <div class="modern-card">
//                     <img src="${proj.image}" alt="${proj.title}">
//                     <div class="card-overlay">
//                         <div class="overlay-content">
//                             <h3>${proj.title}</h3>
//                             <p>${proj.description}</p>
//                             <a href="${proj.link}" class="view-btn-modern">View Project</a>
//                         </div>
//                     </div>
//                 </div>`;
//             projectContainer.innerHTML += projectHTML;
//         });
//     } catch (err) {
//         console.error("પ્રોજેક્ટ્સ લોડ કરવામાં એરર:", err);
//     }
// }

// // પેજ લોડ થાય ત્યારે પ્રોજેક્ટ્સ બતાવો
// window.onload = loadProjects; 


// async function loadProjects() {
//     try {
//         const response = await fetch('http://localhost:5000/api/projects');
//         const projects = await response.json();

//         const projectContainer = document.querySelector('.project-grid-modern');
//         // જો તમે ઈચ્છો તો અહીં જૂના સ્ટેટિક પ્રોજેક્ટ્સ ક્લિયર કરી શકો:
//         // projectContainer.innerHTML = ''; 

//         projects.forEach(proj => {
//             const projectHTML = `
//                 <div class="modern-card">
//                     <img src="${proj.image}" alt="${proj.title}">
//                     <div class="card-overlay">
//                         <div class="overlay-content">
//                             <h3>${proj.title}</h3>
//                             <p>${proj.description}</p>
//                             <a href="${proj.link}" class="view-btn-modern">View Project</a>
//                         </div>
//                     </div>
//                 </div>`;
//             projectContainer.innerHTML += projectHTML;
//         });
//     } catch (err) {
//         console.error("પ્રોજેક્ટ્સ લોડ કરવામાં એરર:", err);
//     }
// }

// // પેજ લોડ થાય ત્યારે પ્રોજેક્ટ્સ બતાવો
// window.onload = loadProjects; 



// // Contact Form સબમિટ કરવા માટે
// const response = await fetch('http://localhost:5000/api/connect', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(formData)
// });



// --- ૧. હીરો સેક્શનમાં ટેક્સ્ટ ચેન્જ કરવા માટે ---
const infoList = [
    { title: "Cross-Domain Engineer", desc: "Engineering is about solving problems." },
    { title: "Creative Technologist", desc: "Blending creativity and technology." },
    { title: "Problem Solver", desc: "Always finding solutions." }
];

let infoIndex = 0;

function changeInfo() {
    const subtitle = document.getElementById("subtitle");
    const description = document.getElementById("description");
    if (subtitle && description) {
        infoIndex = (infoIndex + 1) % infoList.length;
        subtitle.textContent = infoList[infoIndex].title;
        description.textContent = infoList[infoIndex].desc;
    }
}
setInterval(changeInfo, 3000);

// --- ૨. MongoDB માં પ્રોજેક્ટ્સ લોડ કરવા માટે ---
async function loadProjects() {
    try {
        const response = await fetch('http://localhost:5000/api/projects');
        const projects = await response.json();

        const projectContainer = document.querySelector('.project-grid-modern');

        if (projects && projects.length > 0) {
            // સ્ટેટિક પ્રોજેક્ટ્સ કાઢવા હોય તો નીચેની લાઇન અનકમેન્ટ કરો:
            // projectContainer.innerHTML = ''; 

            projects.forEach(proj => {
                const projectHTML = `
                    <div class="modern-card" data-aos="fade-up">
                        <img src="${proj.image}" alt="${proj.title}">
                        <div class="card-overlay">
                            <div class="overlay-content">
                                <h3>${proj.title}</h3>
                                <p>${proj.description}</p>
                                <a href="${proj.link}" target="_blank" class="view-btn-modern">View Project</a>
                            </div>
                        </div>
                    </div>`;
                projectContainer.innerHTML += projectHTML;
            });
        }
    } catch (err) {
        console.error("❌ પ્રોજેક્ટ્સ લોડ કરવામાં એરર:", err);
    }
}

// --- ૩. કોન્ટેક્ટ ફોર્મ સબમિટ કરવા માટે ---
function setupContactForm() {
    const contactForm = document.getElementById('contact-form'); // ખાતરી કરો કે HTML માં id="contact-form" છે

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const successMsg = document.getElementById('success-msg');

            // Disable button
            submitBtn.disabled = true;
            submitBtn.textContent = "SENDING...";

            // ફોર્મ ડેટા ભેગો કરવો
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.querySelector('textarea').value // ટેક્સ્ટ એરિયા માટે
            };

            try {
                const response = await fetch('http://localhost:5000/api/connect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    // Show custom success message
                    successMsg.style.display = 'block';
                    contactForm.reset();

                    // Hide after 5 seconds
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                } else {
                    alert("❌ ભૂલ: " + result.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("❌ સર્વર કનેક્ટ થઈ શક્યું નથી. શું તમારો Node.js પ્રોગ્રામ ચાલુ છે?");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "SUBMIT NOW ➝";
            }
        });
    }
}

// --- ૪. પેજ લોડ થાય ત્યારે બધું સ્ટાર્ટ કરવું ---
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();      // ડેટાબેઝમાંથી પ્રોજેક્ટ્સ લાવશે
    setupContactForm();  // ફોર્મ સબમિટ કરવાનું લોજિક સેટ કરશે
});



// Certificate Modal Functionality
const modal = document.getElementById('certModal');
const viewBtns = document.querySelectorAll('.view-btn');
const closeBtn = document.querySelector('.close-modal');

// Open modal when clicking "View Certificate"
viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.cert-card');
        const certImg = card.getAttribute('data-cert-img');
        const modalImg = modal.querySelector('.modal-body img');

        if (certImg && modalImg) {
            modalImg.src = certImg;
        }

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal when clicking X
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const certCards = document.querySelectorAll('.cert-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Get filter value
        const filterValue = btn.getAttribute('data-filter');

        // Filter cards with animation
        certCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.style.animation = 'fadeInUp 0.6s ease';
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Verify Button Functionality
const verifyBtns = document.querySelectorAll('.verify-btn');

verifyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Show verification message
        const card = btn.closest('.cert-card');
        const certTitle = card.querySelector('h3').textContent;

        // Create temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #1A4D4E, #2a6d6e);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
            max-width: 350px;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <i class="fas fa-check-circle" style="font-size: 24px;"></i>
                <div>
                    <strong style="display: block; margin-bottom: 5px;">Verification Successful!</strong>
                    <span style="font-size: 0.9rem;">${certTitle} is verified and authentic.</span>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 500);
        }, 4000);
    });
});

// Scroll Animation for Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all certificate cards
certCards.forEach(card => {
    observer.observe(card);
});

// Add stagger effect to cards on initial load
certCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Smooth scroll for any anchor links (if you add navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover sound effect (optional - uncomment if you want sound)
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnMpBSuBzvLZiTYIGGe77OScTgwNUKXi8LZjHAU5kdXzzHksBSR2yPDdkEELFF+z6eunVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmUgND1as5++wXRgIPpXa8sZzKQUrgc7y2Yk2CBhnvOzknE4MDVCl4vC2YxwFOZHV88x5LAUkdsfw3ZBBCxRfs+nrp1UUCkaf4PK+bCEFMYfR89OCMwYebsDv45lIDQ9WrOfvsF0YCD6V2vLGcykFK4HO8tmJNggYZ7zs5JxODA1QpeLwtmMcBTmR1fPMeSwFJHbH8N2QQQsUX7Pp66dVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ldryx');
hoverSound.volume = 0.2;

certCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => { }); // Ignore if autoplay is blocked
    });
});


console.log('🎓 Certification section loaded successfully!');
