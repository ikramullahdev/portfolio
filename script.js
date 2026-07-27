// ==========================
// Typing Animation
// ==========================

// ==========================
// Typing Animation
// ==========================

const words = [
    "Database Administrator",
    "Java Developer",
    "Web Developer",
    "Software Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    if (!typing) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typing.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex >= currentWord.length) {

            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;

        }

    } else {

        typing.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex <= 0) {

            isDeleting = false;
            charIndex = 0;

            wordIndex = (wordIndex + 1) % words.length;

            // Next word immediately start
            typing.textContent = words[wordIndex].charAt(0);
            charIndex = 1;

        }

    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);

}

typeEffect();
// ==========================
// Premium Skill Animation
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.querySelectorAll(".progress-bar").forEach(bar => {
            bar.classList.add("animate");
        });

        document.querySelectorAll(".percent").forEach(counter => {

            let target = parseInt(counter.dataset.target);
            let count = 0;

            let timer = setInterval(() => {

                count++;

                counter.innerHTML = count + "%";

                if(count >= target){

                    clearInterval(timer);

                }

            },20);

        });

    },500);

});


// ==========================
// Scroll Reveal
// ==========================

const revealItems = document.querySelectorAll(
".about-container, .skill-card, .progress-box, .project-card, .certificate-card, .contact-card"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, { threshold: 0.15 });

revealItems.forEach(item => {

    item.classList.add("hidden");
    revealObserver.observe(item);

});


// ==========================
// Dark Mode
// ==========================

const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';

    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';

        }

    });

}


// ==========================
// Scroll To Top
// ==========================

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            scrollBtn.classList.add("show");

        } else {

            scrollBtn.classList.remove("show");

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}
// ==========================
// Animated Counter
// ==========================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.getAttribute("data-target");

            let count = 0;

            const updateCounter = () => {

                const increment = Math.ceil(target / 100);

                if(count < target){

                    count += increment;

                    if(count > target){

                        count = target;

                    }

                    counter.innerText = count;

                    setTimeout(updateCounter,20);

                }else{

                    counter.innerText = target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});
// ==========================
// Particles Background
// ==========================

particlesJS("particles-js", {

    particles: {

        number: {
            value: 70
        },

        color: {
            value: "#2563eb"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.5
        },

        size: {
            value: 3
        },

        move: {
            enable: true,
            speed: 2
        },

        line_linked: {
            enable: true,
            color: "#2563eb",
            opacity: 0.3
        }

    }

});
// ==========================
// Mobile Menu
// ==========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if(menuToggle && navLinks){

    menuToggle.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}
if (navLinks) {

    document.querySelectorAll("#nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}
// ==========================
// EmailJS Contact Form
// ==========================

(function(){

    emailjs.init("tFlODmWgN7yCvUJJp");

})();

emailjs.init("tFlODmWgN7yCvUJJp");
const contactForm = document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();


        emailjs.sendForm(
            "service_1ph2e3i",
            "template_p2fqybd",
            this
        )
        .then(() => {

            alert("Message Sent Successfully!");

            contactForm.reset();

        })
        .catch((error)=>{

            alert("Message Failed!");
            console.log(error);

        });

    });

}
const copyBtn = document.getElementById("copyEmail");

if (copyBtn) {

    copyBtn.addEventListener("click", () => {

        navigator.clipboard.writeText("ikramahmed12201@gmail.com");

        alert("Email copied successfully!");

    });

}
// ==========================
// Preloader
// ==========================

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 1200);

    }

});
