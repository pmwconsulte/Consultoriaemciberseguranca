/* =====================================================
   PEDRO WENG CYBERSECURITY WEBSITE
   JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");

    const backToTop = document.getElementById("back-to-top");

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitButton = document.getElementById("submit-button");

    const videoModal = document.getElementById("video-modal");
    const videoPlayer = document.getElementById("video-player");
    const videoTitle = document.getElementById("video-modal-title");
    const closeVideo = document.getElementById("video-modal-close");

    const playButtons = document.querySelectorAll(".play-button");

    const filters = document.querySelectorAll(".video-filter");
    const videoCards = document.querySelectorAll(".video-card");


    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    function closeMobileMenu() {

        if (!nav || !menuToggle) {
            return;
        }

        nav.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
    }


    function openMobileMenu() {

        if (!nav || !menuToggle) {
            return;
        }

        nav.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';
    }


    if (menuToggle && nav) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                nav.classList.contains("active");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            if (
                nav.classList.contains("active") &&
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMobileMenu();

            }

        });


        /* Close menu with Escape */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        });

    }


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    function handleHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleHeader,
        { passive: true }
    );

    handleHeader();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =================================================
       VIDEO FILTERING
    ================================================= */

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            const selectedCategory =
                filter.dataset.filter;


            /* Active filter */

            filters.forEach(button => {

                button.classList.remove("active");

                button.setAttribute(
                    "aria-pressed",
                    "false"
                );

            });


            filter.classList.add("active");

            filter.setAttribute(
                "aria-pressed",
                "true"
            );


            /* Filter video cards */

            videoCards.forEach(card => {

                const cardCategory =
                    card.dataset.category;

                const shouldShow =
                    selectedCategory === "all" ||
                    cardCategory === selectedCategory;


                if (shouldShow) {

                    card.style.display = "";

                    requestAnimationFrame(() => {

                        card.classList.remove(
                            "video-hidden"
                        );

                    });

                } else {

                    card.classList.add(
                        "video-hidden"
                    );

                    setTimeout(() => {

                        if (
                            card.classList.contains(
                                "video-hidden"
                            )
                        ) {

                            card.style.display = "none";

                        }

                    }, 250);

                }

            });

        });

    });


    /* =================================================
       VIDEO MODAL
    ================================================= */

    function openVideo(videoId, title) {

        if (!videoModal || !videoPlayer) {
            return;
        }


        /* Validate video ID */

        if (
            !videoId ||
            videoId.includes("YOUR_VIDEO_ID")
        ) {

            console.warn(
                "Please add a valid YouTube video ID."
            );

            return;

        }


        if (videoTitle) {

            videoTitle.textContent =
                title || "Cybersecurity Training";

        }


        /*
           YouTube embed URL
        */

        videoPlayer.src =
            `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;


        videoModal.classList.add("active");

        videoModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "video-open"
        );

        document.body.style.overflow = "hidden";


        /* Focus close button */

        if (closeVideo) {

            setTimeout(() => {

                closeVideo.focus();

            }, 100);

        }

    }


    function closeVideoModal() {

        if (!videoModal) {
            return;
        }


        videoModal.classList.remove(
            "active"
        );

        videoModal.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
           Removing iframe source stops
           YouTube video/audio.
        */

        if (videoPlayer) {

            videoPlayer.src = "";

        }


        document.body.classList.remove(
            "video-open"
        );

        document.body.style.overflow = "";

    }


    /* Play buttons */

    playButtons.forEach(button => {

        button.addEventListener("click", () => {

            const videoId =
                button.dataset.video;

            const title =
                button.dataset.title;

            openVideo(
                videoId,
                title
            );

        });

    });


    /* Close button */

    if (closeVideo) {

        closeVideo.addEventListener(
            "click",
            closeVideoModal
        );

    }


    /* Click modal background */

    if (videoModal) {

        videoModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === videoModal
                ) {

                    closeVideoModal();

                }

            }
        );

    }


    /* Escape closes video */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                videoModal &&
                videoModal.classList.contains("active")
            ) {

                closeVideoModal();

            }

        }
    );


    /* =================================================
       BACK TO TOP
    ================================================= */

    function handleBackToTop() {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =================================================
       CONTACT FORM - FORMINIT
    ================================================= */

    /*
       IMPORTANT:
       Replace this with your REAL Forminit Form ID.

       Example:
       const FORMINIT_FORM_ID = "abc123xyz";
    */

    const FORMINIT_FORM_ID =
        "YOUR_REAL_FORM_ID";


    if (
        contactForm &&
        typeof Forminit !== "undefined"
    ) {

        const forminit =
            new Forminit();


        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                /* Validate Form ID */

                if (
                    !FORMINIT_FORM_ID ||
                    FORMINIT_FORM_ID ===
                    "YOUR_REAL_FORM_ID"
                ) {

                    console.error(
                        "Forminit Form ID has not been configured."
                    );


                    if (formStatus) {

                        formStatus.textContent =
                            "Contact form is not configured yet. Please add your Forminit Form ID.";

                        formStatus.className =
                            "form-status status-error";

                    }

                    return;

                }


                /* Loading state */

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML = `
                        <span>Sending...</span>
                        <i class="fa-solid fa-spinner fa-spin"></i>
                    `;

                }


                if (formStatus) {

                    formStatus.textContent =
                        "Sending your message...";

                    formStatus.className =
                        "form-status status-loading";

                }


                try {

                    const formData =
                        new FormData(
                            contactForm
                        );


                    const result =
                        await forminit.submit(
                            FORMINIT_FORM_ID,
                            formData
                        );


                    const {
                        data,
                        error
                    } = result;


                    if (error) {

                        throw new Error(
                            error.message ||
                            "Unable to send message."
                        );

                    }


                    console.log(
                        "Form submitted:",
                        data
                    );


                    /* Success */

                    if (formStatus) {

                        formStatus.textContent =
                            "Message sent successfully! Thank you for contacting me.";

                        formStatus.className =
                            "form-status status-success";

                    }


                    contactForm.reset();


                } catch (error) {

                    console.error(
                        "Form submission error:",
                        error
                    );


                    if (formStatus) {

                        formStatus.textContent =
                            error.message ||
                            "Something went wrong. Please try again.";

                        formStatus.className =
                            "form-status status-error";

                    }

                } finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML = `
                            <span>Send Message</span>
                            <i class="fa-solid fa-paper-plane"></i>
                        `;

                    }

                }

            }
        );

    } else if (contactForm) {

        console.error(
            "Forminit SDK was not loaded."
        );

    }


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top:
                            Math.max(
                                0,
                                targetPosition
                            ),

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* =================================================
       INITIALIZE VIDEO FILTER ACCESSIBILITY
    ================================================= */

    filters.forEach(filter => {

        filter.setAttribute(
            "aria-pressed",
            filter.classList.contains("active")
                ? "true"
                : "false"
        );

    });


    /* =================================================
       RESIZE HANDLING
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            /*
               CSS mobile menu breakpoint:
               max-width: 950px
            */

            if (window.innerWidth > 950) {

                closeMobileMenu();

            }

        }
    );


    /* =================================================
       CONSOLE MESSAGE
    ================================================= */

    console.log(
        "%cPedro Weng Cybersecurity Website",
        "color:#00e5ff;font-size:16px;font-weight:bold;"
    );

    console.log(
        "Website JavaScript initialized successfully."
    );

});
