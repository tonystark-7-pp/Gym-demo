
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    function closeMenu() {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        document.body.classList.remove("menu-open");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        document.body.classList.toggle("menu-open", isOpen);
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 720) {
            closeMenu();
        }
    });

    // SCROLL REVEAL
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("visible"));
    }

    // HERO INTRO
    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
        requestAnimationFrame(() => {
            heroContent.classList.add("visible");
        });
    }

    // PROGRAM SELECTION
    const goalSelect = document.getElementById("goal");

    document.querySelectorAll("[data-program]").forEach(link => {
        link.addEventListener("click", () => {
            const program = link.dataset.program;

            if (program === "Raw Strength") {
                goalSelect.value = "Increase strength";
            } else if (program === "Iron Architecture") {
                goalSelect.value = "Build muscle";
            } else if (program === "Elite Conditioning") {
                goalSelect.value = "Improve conditioning";
            }
        });
    });

    // CONTACT FORM DEMO
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const goal = String(formData.get("goal") || "");
        const message = String(formData.get("message") || "").trim();

        // This is a local demo, not a real submission.
        const requestText = [
            "NOIR ATHLETICS — ACCESS REQUEST",
            "",
            "Name: " + name,
            "Email: " + email,
            "Objective: " + goal,
            "Message: " + (message || "No additional message")
        ].join("\n");

        formStatus.textContent =
            "Demo request prepared. Copy the details below to contact the gym.";

        const preview = document.createElement("textarea");
        preview.readOnly = true;
        preview.value = requestText;
        preview.rows = 7;
        preview.setAttribute("aria-label", "Prepared request details");
        preview.style.width = "100%";
        preview.style.marginTop = "10px";
        preview.style.padding = "12px";
        preview.style.background = "#100e0e";
        preview.style.color = "#d1c6be";
        preview.style.border = "1px solid #40302e";
        preview.style.font = "12px monospace";
        preview.style.overflowWrap = "anywhere";

        const oldPreview = document.getElementById("requestPreview");

        if (oldPreview) {
            oldPreview.remove();
        }

        preview.id = "requestPreview";
        formStatus.after(preview);

        preview.focus();
        preview.select();
    });

    // CURRENT YEAR
    const year = new Date().getFullYear();
    const footerCopyright = document.querySelector(".footer-bottom span");

    if (footerCopyright) {
        footerCopyright.textContent = "© " + year + " NOIR ATHLETICS";
    }
});
