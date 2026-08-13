/* =====================================================
   PEDRO WENG CYBERSECURITY WEBSITE
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


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

    const revealElements =
        document.querySelectorAll(".reveal");


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
            '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

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
            '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';

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


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    nav.classList.contains("active")
                ) {

                    closeMobileMenu();

                    menuToggle.focus();

                }

            }
        );

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
        {
            passive: true
        }
    );


    handleHeader();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

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

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =================================================
       VIDEO FILTERING
    ================================================= */

    filters.forEach(
        filter => {

            filter.addEventListener(
                "click",
                () => {

                    const selectedCategory =
                        filter.dataset.filter;


                    /* Active filter */

                    filters.forEach(
                        button => {

                            button.classList.remove(
                                "active"
                            );

                            button.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        }
                    );


                    filter.classList.add(
                        "active"
                    );

                    filter.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                    /* Filter cards */

                    videoCards.forEach(
                        card => {

                            const cardCategory =
                                card.dataset.category;


                            const shouldShow =
                                selectedCategory === "all" ||
                                cardCategory === selectedCategory;


                            if (shouldShow) {

                                card.style.display =
                                    "";


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


                                window.setTimeout(
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

                        }
                    );

                }
            );

        }
    );


    /* =================================================
       VIDEO MODAL
    ================================================= */

    let lastFocusedElement = null;


    function isValidYouTubeId(videoId) {

        if (!videoId) {
            return false;
        }

        if (
            videoId.includes("YOUR_VIDEO_ID")
        ) {
            return false;
        }

        /*
           Standard YouTube IDs are normally
           11 characters containing letters,
           numbers, - and _.
        */

        return /^[a-zA-Z0-9_-]{11}$/.test(
            videoId
        );

    }


    function openVideo(videoId, title) {

        if (
            !videoModal ||
            !videoPlayer
        ) {
            return;
        }


        if (
            !isValidYouTubeId(videoId)
        ) {

            alert(
                "Please add a valid 11-character YouTube video ID in the HTML."
            );

            return;

        }


        lastFocusedElement =
            document.activeElement;


        if (videoTitle) {

            videoTitle.textContent =
                title ||
                "Cybersecurity Training";

        }


        /*
           YouTube embed URL.
        */

        const embedUrl =
            "https://www.youtube.com/embed/" +
            encodeURIComponent(videoId) +
            "?autoplay=1&rel=0";


        videoPlayer.src =
            embedUrl;


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


        document.body.style.overflow =
            "hidden";


        if (closeVideo) {

            window.setTimeout(
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


        /*
           Removing the iframe source stops
           YouTube playback and audio.
        */

        if (videoPlayer) {

            videoPlayer.src = "";

        }


        document.body.classList.remove(
            "video-open"
        );


        document.body.style.overflow =
            "";


        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus ===
            "function"
        ) {

            lastFocusedElement.focus();

        }

    }


    /* Play buttons */

    playButtons.forEach(
        button => {

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

        }
    );


    /* Close button */

    if (closeVideo) {

        closeVideo.addEventListener(
            "click",
            closeVideoModal
        );

    }


    /* Background click */

    if (videoModal) {

        videoModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    videoModal
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
                videoModal.classList.contains(
                    "active"
                )
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
        {
            passive: true
        }
    );


    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo(
                    {
                        top: 0,
                        behavior: "smooth"
                    }
                );

            }
        );

    }


    /* =================================================
       CONTACT FORM - FORMINIT
    ================================================= */

    /*
       IMPORTANT:
       Replace YOUR_REAL_FORM_ID with your
       actual Forminit Form ID.
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


                /* Validate form */

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


                /* Browser validation */

                if (
                    !contactForm.checkValidity()
                ) {

                    contactForm.reportValidity();

                    return;

                }


                /* Loading state */

                if (submitButton) {

                    submitButton.disabled =
                        true;


                    submitButton.innerHTML = `
                        <span>Sending...</span>
                        <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
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
                    } = result || {};


                    if (error) {

                        throw new Error(
                            error.message ||
                            "Unable to send message."
                        );

                    }


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
                            error?.message ||
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
                            <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                        `;

                    }

                }

            }
        );

    } else if (contactForm) {

        console.error(
            "Forminit SDK was not loaded."
        );


        if (formStatus) {

            formStatus.textContent =
                "Contact form service could not be loaded. Please try again later.";

            formStatus.className =
                "form-status status-error";

        }

    }


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            anchor => {

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


                        let target = null;


                        try {

                            target =
                                document.querySelector(
                                    targetId
                                );

                        } catch (error) {

                            return;

                        }


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetPosition =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight -
                            8;


                        window.scrollTo(
                            {
                                top:
                                    Math.max(
                                        0,
                                        targetPosition
                                    ),

                                behavior:
                                    "smooth"
                            }
                        );

                    }
                );

            }
        );


    /* =================================================
       VIDEO FILTER ACCESSIBILITY
    ================================================= */

    filters.forEach(
        filter => {

            filter.setAttribute(
                "aria-pressed",
                filter.classList.contains(
                    "active"
                )
                    ? "true"
                    : "false"
            );

        }
    );


    /* =================================================
       RESIZE HANDLING
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
       INITIAL CONSOLE MESSAGE
    ================================================= */

    console.log(
        "%cPedro Weng Cybersecurity Website",
        "color:#00e5ff;font-size:16px;font-weight:bold;"
    );


    console.log(
        "Website JavaScript initialized successfully."
    );

});