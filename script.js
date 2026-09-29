/* =========================================================
   👑 BIST RAJAN — DARK KING EDITION
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. PAGE LOADER
       ===================================================== */

    document.body.classList.add("page-loaded");


    /* =====================================================
       2. SMOOTH NAVIGATION
       ===================================================== */

    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       3. SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section, .skill-card, .project-card, .achievement-card, .timeline-item, .gallery-item, .goal"
    );

    revealElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(35px)";
        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       4. ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".navbar nav a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       5. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    function navbarEffect() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(0,0,0,0.92)";

            navbar.style.boxShadow =
                "0 10px 40px rgba(0,0,0,0.5)";

        } else {

            navbar.style.background =
                "rgba(0,0,0,0.72)";

            navbar.style.boxShadow = "none";

        }

    }

    window.addEventListener(
        "scroll",
        navbarEffect,
        { passive: true }
    );


    /* =====================================================
       6. HERO PARALLAX
       ===================================================== */

    const heroContent =
        document.querySelector(".hero-content");

    window.addEventListener(
        "scroll",
        () => {

            if (!heroContent) return;

            if (window.scrollY < window.innerHeight) {

                const movement =
                    window.scrollY * 0.18;

                heroContent.style.transform =
                    `translateY(${movement}px)`;

                heroContent.style.opacity =
                    Math.max(
                        0,
                        1 - window.scrollY / 600
                    );

            }

        },
        { passive: true }
    );


    /* =====================================================
       7. TYPING EFFECT
       ===================================================== */

    const typingElement =
        document.querySelector(".hero h2");

    if (typingElement) {

        const originalText =
            typingElement.textContent.trim();

        typingElement.textContent = "";

        let characterIndex = 0;

        function typeText() {

            if (characterIndex < originalText.length) {

                typingElement.textContent +=
                    originalText.charAt(characterIndex);

                characterIndex++;

                setTimeout(typeText, 80);

            }

        }

        setTimeout(typeText, 700);

    }


    /* =====================================================
       8. CARD TILT EFFECT
       ===================================================== */

    const cards = document.querySelectorAll(
        ".skill-card, .project-card, .achievement-card"
    );

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 800) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(700px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =====================================================
       9. IMAGE HOVER EFFECT
       ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            image.classList.toggle("image-active");

        });

    });


    /* =====================================================
       10. MOUSE GLOW
       ===================================================== */

    const mouseGlow =
        document.createElement("div");

    mouseGlow.className = "mouse-glow";

    document.body.appendChild(mouseGlow);

    const glowStyle =
        document.createElement("style");

    glowStyle.textContent = `
        .mouse-glow {
            position: fixed;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            background: radial-gradient(
                circle,
                rgba(255,255,255,0.07),
                transparent 65%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        @media (hover: hover) and (pointer: fine) {
            .mouse-glow {
                opacity: 1;
            }
        }

        .navbar nav a.active {
            color: #ffffff;
        }

        .image-active {
            transform: scale(1.04) !important;
            filter: grayscale(0%) !important;
        }
    `;

    document.head.appendChild(glowStyle);


    document.addEventListener("mousemove", event => {

        mouseGlow.style.left =
            event.clientX + "px";

        mouseGlow.style.top =
            event.clientY + "px";

    });


    /* =====================================================
       11. CURRENT YEAR
       ===================================================== */

    const copyright =
        document.querySelector(".copyright");

    if (copyright) {

        const currentYear =
            new Date().getFullYear();

        copyright.textContent =
            `© ${currentYear} Bist Rajan. All Rights Reserved.`;

    }


    /* =====================================================
       12. BACK TO TOP
       ===================================================== */

    const backTop =
        document.createElement("button");

    backTop.innerHTML = "↑";

    backTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backTop.className = "back-top";

    document.body.appendChild(backTop);


    const backTopStyle =
        document.createElement("style");

    backTopStyle.textContent = `
        .back-top {
            position: fixed;
            right: 22px;
            bottom: 22px;

            width: 48px;
            height: 48px;

            border: 1px solid #444;

            background: rgba(0,0,0,0.85);

            color: #fff;

            font-size: 20px;

            cursor: pointer;

            opacity: 0;
            visibility: hidden;

            transform: translateY(20px);

            transition: 0.3s;

            z-index: 2000;
        }

        .back-top.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .back-top:hover {
            background: #fff;
            color: #000;
            border-color: #fff;
        }
    `;

    document.head.appendChild(backTopStyle);


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }

        },
        { passive: true }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       13. CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%c👑 BIST RAJAN",
        "font-size: 30px; font-weight: bold;"
    );

    console.log(
        "%cDREAM • BUILD • GROW",
        "font-size: 16px;"
    );


    /* =====================================================
       14. PAGE READY
       ===================================================== */

    setTimeout(() => {

        document.body.classList.add(
            "website-ready"
        );

    }, 100);

});