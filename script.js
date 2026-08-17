/* =====================================================
   PEDRO WENG CYBERSECURITY WEBSITE
   SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const header =
        document.getElementById("header");

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.getElementById("nav");

    const backToTop =
        document.getElementById("back-to-top");

    const contactForm =
        document.getElementById("contact-form");

    const formStatus =
        document.getElementById("form-status");

    const submitButton =
        document.getElementById("submit-button");

    const videoModal =
        document.getElementById("video-modal");

    const videoPlayer =
        document.getElementById("video-player");

    const videoTitle =
        document.getElementById("video-modal-title");

    const closeVideo =
        document.getElementById("video-modal-close");

    const playButtons =
        document.querySelectorAll(".play-button");

    const filters =
        document.querySelectorAll(".video-filter");

    const videoCards =
        document.querySelectorAll(".video-card");


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

        menuToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const isOpen =
                    nav.classList.contains("active");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            }
        );


        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {
                        closeMobileMenu();
                    }
                );

            });


        document.addEventListener(
            "click",
            event => {

                if (
                    nav.classList.contains("active") &&
                    !nav.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            closeMobileMenu();

            if (
                videoModal &&
                videoModal.classList.contains("active")
            ) {

                closeVideoModal();

            }

        }
    );


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

                        if (
                            entry.isIntersecting
                        ) {

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
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =================================================
       VIDEO FILTERING
    ================================================= */

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                const selectedCategory =
                    filter.dataset.filter;


                filters.forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                    button.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                });


                filter.classList.add(
                    "active"
                );

                filter.setAttribute(
                    "aria-pressed",
                    "true"
                );


                videoCards.forEach(card => {

                    const cardCategory =
                        card.dataset.category;

                    const shouldShow =
                        selectedCategory === "all" ||
                        cardCategory === selectedCategory;


                    if (shouldShow) {

                        card.style.display = "";

                        requestAnimationFrame(
                            () => {

                                card.classList.remove(
                                    "video-hidden"
                                );

                            }
                        );

                    } else {

                        card.classList.add(
                            "video-hidden"
                        );

                        setTimeout(
                            () => {

                                if (
                                    card.classList.contains(
                                        "video-hidden"
                                    )
                                ) {

                                    card.style.display =
                                        "none";

                                }

                            },
                            250
                        );

                    }

                });

            }
        );

    });


    /* =================================================
       VIDEO MODAL
    ================================================= */

    function openVideo(
        videoId,
        title
    ) {

        if (
            !videoModal ||
            !videoPlayer
        ) {

            return;

        }


        if (
            !videoId ||
            videoId.includes(
                "YOUR_VIDEO_ID"
            )
        ) {

            alert(
                "Please replace the YouTube placeholder with a real YouTube video ID."
            );

            return;

        }


        if (videoTitle) {

            videoTitle.textContent =
                title ||
                "Cybersecurity Training";

        }


        videoPlayer.src =
            "https://www.youtube.com/embed/" +
            encodeURIComponent(videoId) +
            "?autoplay=1&rel=0";


        videoModal.classList.add(
            "active"
        );

        videoModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "video-open"
        );


        if (closeVideo) {

            setTimeout(
                () => {
                    closeVideo.focus();
                },
                100
            );

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


        if (videoPlayer) {

            videoPlayer.src = "";

        }


        document.body.classList.remove(
            "video-open"
        );

    }


    playButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const videoId =
                    button.dataset.video;

                const title =
                    button.dataset.title;

                openVideo(
                    videoId,
                    title
                );

            }
        );

    });


    if (closeVideo) {

        closeVideo.addEventListener(
            "click",
            closeVideoModal
        );

    }


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


    /* =================================================
       BACK TO TOP
    ================================================= */

    function handleBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 600) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

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
       FORMINIT
    ================================================= */

    /*
       IMPORTANT:

       Replace this with your actual Forminit Form ID.

       Example:

       const FORMINIT_FORM_ID =
           "64ep4stw8gq";
    */

    const FORMINIT_FORM_ID =
        "64ep4stw8gq";


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


                if (
                    !FORMINIT_FORM_ID ||
                    FORMINIT_FORM_ID ===
                    "YOUR_REAL_FORM_ID"
                ) {

                    console.error(
                        "Forminit Form ID is not configured."
                    );


                    if (formStatus) {

                        formStatus.textContent =
                            "Contact form is not configured yet. Please add your Forminit Form ID.";

                        formStatus.className =
                            "form-status status-error";

                    }

                    return;

                }


                if (submitButton) {

                    submitButton.disabled =
                        true;

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
                        error
                    } = result;


                    if (error) {

                        throw new Error(
                            error.message ||
                            "Unable to send message."
                        );

                    }


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
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );


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

                        top: Math.max(
                            0,
                            targetPosition
                        ),

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =================================================
       RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =================================================
       IMAGE ERROR CHECK
    ================================================= */

    const profileImage =
        document.querySelector(
            ".profile-image"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                console.error(
                    "ERROR: profile.jpg could not be loaded."
                );

                console.error(
                    "Make sure profile.jpg is in the same folder as index.html."
                );

            }
        );

        profileImage.addEventListener(
            "load",
            () => {

                console.log(
                    "✓ profile.jpg loaded successfully."
                );

            }
        );

    }


    /* =================================================
       CONSOLE
    ================================================= */

    console.log(
        "%cPedro Weng Cybersecurity Website",
        "color:#00e5ff;font-size:16px;font-weight:bold;"
    );

    console.log(
        "✓ Website JavaScript initialized successfully."
    );

});
