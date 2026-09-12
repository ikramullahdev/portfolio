const words = [
    "Data Science Student",
    "Database Administrator",
    "Web Developer",
    "Python Developer"
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

        }

    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();


// ==========================
// Skill Progress Animation
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.querySelectorAll(".progress-bar").forEach(bar => {
            bar.classList.add("animate");
        });

        document.querySelectorAll(".percent").forEach(counter => {

            const target = parseInt(counter.dataset.target);
            let count = 0;

            const timer = setInterval(() => {

                count++;

                counter.textContent = count + "%";

                if (count >= target) {
                    clearInterval(timer);
                }

            }, 20);

        });

    }, 500);

});


// ==========================
// Scroll Reveal
// ==========================

const revealItems = document.querySelectorAll(
    ".about-container, .skill-card, .progress-box, .project-card, .certificate-card, .contact-card"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealItems.forEach(item => {

        item.classList.add("hidden");
        revealObserver.observe(item);

    });

}


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

if ("IntersectionObserver" in window && counters.length > 0) {

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const counter = entry.target;
                const target = parseInt(counter.dataset.target);

                let count = 0;

                const updateCounter = () => {

                    const increment = Math.ceil(target / 100);

                    if (count < target) {

                        count += increment;

                        if (count > target) {
                            count = target;
                        }

                        counter.textContent = count;

                        setTimeout(updateCounter, 20);

                    } else {

                        counter.textContent = target;

                    }

                };

                updateCounter();

                counterObserver.unobserve(counter);

            }

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

}


// ==========================
// Particles Background
// ==========================

if (typeof particlesJS !== "undefined" &&
    document.getElementById("particles-js")) {

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

}


// ==========================
// Mobile Menu
// ==========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

    document.querySelectorAll("#nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}


// ==========================
// Toast Notification Helper
// ==========================

function showToast(message, duration = 3000) {

    const toast = document.getElementById("toastNotification");

    if (!toast) return;

    toast.innerHTML = message;
    toast.classList.add("show");

    if (toast.timer) {
        clearTimeout(toast.timer);
    }

    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, duration);

}


// ==========================
// EmailJS Contact Form
// ==========================

if (typeof emailjs !== "undefined") {

    emailjs.init("tFlODmWgN7yCvUJJp");

}

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn = document.getElementById("submit-btn");
        const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
        const btnLoader = submitBtn ? submitBtn.querySelector(".btn-loader") : null;

        if (submitBtn) submitBtn.disabled = true;
        if (btnText) btnText.style.display = "none";
        if (btnLoader) btnLoader.style.display = "inline-flex";

        if (formStatus) {
            formStatus.className = "form-status-box";
            formStatus.style.display = "none";
        }

        if (typeof emailjs !== "undefined") {

            emailjs.sendForm(
                "service_1ph2e3i",
                "template_p2fqybd",
                this
            )
                .then(() => {

                    if (formStatus) {
                        formStatus.className = "form-status-box success";
                        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                        formStatus.style.display = "block";
                    }

                    showToast('<i class="fas fa-check-circle" style="color: #22c55e;"></i> Message sent successfully!');

                    contactForm.reset();

                })
                .catch((error) => {

                    if (formStatus) {
                        formStatus.className = "form-status-box error";
                        formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send email. You can chat directly via WhatsApp!';
                        formStatus.style.display = "block";
                    }

                    showToast('<i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i> Message failed. Try WhatsApp instead!');

                    console.error("EmailJS Error:", error);

                })
                .finally(() => {

                    if (submitBtn) submitBtn.disabled = false;
                    if (btnText) btnText.style.display = "inline-flex";
                    if (btnLoader) btnLoader.style.display = "none";

                });

        } else {

            // Fallback if EmailJS CDN fails to load
            if (formStatus) {
                formStatus.className = "form-status-box success";
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Form submitted! Alternatively, chat on WhatsApp.';
                formStatus.style.display = "block";
            }

            showToast('<i class="fas fa-check-circle" style="color: #22c55e;"></i> Form submitted successfully!');

            contactForm.reset();

            if (submitBtn) submitBtn.disabled = false;
            if (btnText) btnText.style.display = "inline-flex";
            if (btnLoader) btnLoader.style.display = "none";

        }

    });

}


// ==========================
// Send via WhatsApp Button
// ==========================

const whatsappSendBtn = document.getElementById("whatsappSendBtn");

if (whatsappSendBtn) {

    whatsappSendBtn.addEventListener("click", () => {

        const name = document.getElementById("from_name") ? document.getElementById("from_name").value.trim() : "";
        const email = document.getElementById("from_email") ? document.getElementById("from_email").value.trim() : "";
        const subject = document.getElementById("subject") ? document.getElementById("subject").value.trim() : "";
        const message = document.getElementById("message") ? document.getElementById("message").value.trim() : "";

        let whatsappText = "Hello Muhammad Ikram Ullah,";

        if (name || message) {

            whatsappText += "\n\n";

            if (name) whatsappText += `*Name:* ${name}\n`;
            if (email) whatsappText += `*Email:* ${email}\n`;
            if (subject) whatsappText += `*Subject:* ${subject}\n`;
            if (message) whatsappText += `\n*Message:* ${message}`;

        } else {

            whatsappText += " I saw your portfolio and would like to connect with you regarding a project inquiry!";

        }

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

        showToast('<i class="fab fa-whatsapp" style="color: #25D366;"></i> Opening WhatsApp chat...');

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    });

}


// ==========================
// Copy Email with Feedback
// ==========================

const copyBtn = document.getElementById("copyEmail");
const copyText = document.getElementById("copyText");

if (copyBtn) {

    copyBtn.addEventListener("click", async () => {

        const emailAddress = "ikramahmed12201@gmail.com";

        try {

            if (navigator.clipboard && navigator.clipboard.writeText) {

                await navigator.clipboard.writeText(emailAddress);

            } else {

                // Fallback for older browsers or non-secure contexts
                const tempInput = document.createElement("textarea");
                tempInput.value = emailAddress;
                tempInput.style.position = "fixed";
                tempInput.style.opacity = "0";
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);

            }

            if (copyText) {
                copyText.textContent = "Copied! ✓";
            }

            showToast('<i class="fas fa-copy" style="color: #38bdf8;"></i> Email copied to clipboard!');

            setTimeout(() => {

                if (copyText) {
                    copyText.textContent = "Copy";
                }

            }, 2500);

        } catch (error) {

            console.error("Copy failed:", error);
            showToast('<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i> Failed to copy email.');

        }

    });

}


// ==========================
// Preloader
// ==========================

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.classList.add("hide");
    }

});


// ==========================
// Certificate Modal Lightbox
// ==========================

const certModal = document.getElementById("certificateModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalOpenNewTab = document.getElementById("modalOpenNewTab");
const modalDownload = document.getElementById("modalDownload");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalBackdrop = document.getElementById("modalBackdrop");

function openCertificateModal(imgSrc, title, desc) {

    if (!certModal || !modalImage) return;

    modalImage.src = imgSrc;
    modalImage.alt = title || "Certificate Preview";

    if (modalTitle) {
        modalTitle.textContent = title || "Certificate Preview";
    }

    if (modalDesc) {
        modalDesc.textContent = desc || "Professional Credential";
    }

    if (modalOpenNewTab) {
        modalOpenNewTab.href = imgSrc;
    }

    if (modalDownload) {
        modalDownload.href = imgSrc;
        const filename = imgSrc.split("/").pop() || "certificate.jpg";
        modalDownload.setAttribute("download", filename);
    }

    certModal.classList.add("active");
    certModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

}

function closeCertificateModal() {

    if (!certModal) return;

    certModal.classList.remove("active");
    certModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

}

// Bind click events on certificate cards, images, and view buttons
document.querySelectorAll(".certificate-card, .certificate-img-wrap, .cert-view-btn").forEach((elem) => {

    elem.addEventListener("click", function (e) {

        e.stopPropagation();

        const card = this.closest(".certificate-card") || this;
        const imgSrc = this.dataset.img || card.dataset.img || (card.querySelector("img") ? card.querySelector("img").getAttribute("src") : "");
        const title = this.dataset.title || card.dataset.title || (card.querySelector("h3") ? card.querySelector("h3").textContent : "Certificate");
        const desc = this.dataset.desc || card.dataset.desc || (card.querySelector("p") ? card.querySelector("p").textContent : "");

        if (imgSrc) {
            openCertificateModal(imgSrc, title, desc);
        }

    });

});

if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeCertificateModal);
}

if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeCertificateModal);
}

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
        closeCertificateModal();
    }

});

