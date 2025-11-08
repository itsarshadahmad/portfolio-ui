import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function introAnimation() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 2. Text fades in
    gsap.from(".hero-content h1", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        delay: 1.5,
        ease: "power3.out",
    });
    gsap.from(".hero-content p", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        delay: 1.8,
        ease: "power3.out",
    });

    // --- Scroll-Triggered Animations ---
    // Animate each section as it scrolls into view
    // FIXED: Used fromTo to ensure animation works
    document.querySelectorAll(".fade-in-section").forEach((section) => {
        gsap.fromTo(
            section,
            {
                opacity: 0,
                y: 50,
            }, // From state
            {
                // To state
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%", // When top of section hits 85% from top of viewport
                    toggleActions: "play none none none",
                },
            }
        );
    });
}

// --- Smooth Scroll for Nav Links ---
document.querySelectorAll('a[href^="#home"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
            });
        }
    });
});

// --- Mobile Menu Toggle ---
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

const openMenu = () => {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
};

const closeMenu = () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    document.body.style.overflow = ""; // Re-enable scrolling
};

menuToggle.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
// Close menu when a link is clicked
mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Run everything
introAnimation();
