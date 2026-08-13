/* =====================================================
   PEDRO WENG CYBERSECURITY WEBSITE
   JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });


        /* Close menu after clicking link */

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });

    }


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const header =
        document.getElementById("header");

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeader
    );

    handleHeader();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

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
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =================================================
       VIDEO FILTERING
    ================================================= */

    const filters =
        document.querySelectorAll(
            ".video-filter"
        );

    const videoCards =
        document.querySelectorAll(
            ".video-card"
        );


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            const selectedCategory =
                filter.dataset.filter;


            /* Active button */

            filters.forEach(button => {

                button.classList.remove("active");

            });

            filter.classList.add("active");


            /* Filter cards */

            videoCards.forEach(card => {

                const cardCategory =
                    card.dataset.category;


                if (
                    selectedCategory === "all" ||
                    cardCategory === selectedCategory
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    /* =================================================
       VIDEO MODAL
    ================================================= */

    const videoModal =
        document.getElementById("video-modal");

    const videoPlayer =
        document.getElementById("video-player");

    const videoTitle =
        document.getElementById(
            "video-modal-title"
        );

    const closeVideo =
        document.getElementById(
            "video-modal-close"
        );

    const playButtons =
        document.querySelectorAll(
            ".play-button"
        );


    function openVideo(videoId, title) {

        if (!videoModal || !videoPlayer) {
            return;
        }


        /* Don't open empty placeholder */

        if (
            !videoId ||
            videoId.includes("YOUR_VIDEO_ID")
        ) {

            alert(
                "Please add your YouTube video ID in the HTML first."
            );

            return;

        }


        videoTitle.textContent = title;

        videoPlayer.src =
            `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

        videoModal.classList.add("active");

        videoModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    function closeVideoModal() {

        if (!videoModal) return;

        videoModal.classList.remove("active");

        videoModal.setAttribute(
            "aria-hidden",
            "true"
        );

        videoPlayer.src = "";

        document.body.style.overflow = "";

    }


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


    /* Escape key closes video */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeVideoModal();

            }

        }
    );


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backToTop =
        document.getElementById(
            "back-to-top"
        );


    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop
    );


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

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    const formStatus =
        document.getElementById(
            "form-status"
        );

    const submitButton =
        document.getElementById(
            "submit-button"
        );


    /*
       IMPORTANT:
       Replace this with your real Forminit Form ID.
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


                /* Check Form ID */

                if (
                    FORMINIT_FORM_ID ===
                    "64ep4stw8gq"
                ) {

                    formStatus.textContent =
                        "Please configure your Forminit Form ID in script.js.";

                    formStatus.className =
                        "form-status status-error";

                    return;

                }


                /* Loading state */

                submitButton.disabled = true;

                submitButton.innerHTML = `
                    <span>Sending...</span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;

                formStatus.textContent =
                    "Sending your message...";

                formStatus.className =
                    "form-status status-loading";


                try {

                    const formData =
                        new FormData(
                            contactForm
                        );


                    const result =
                        await forminit.submit(
                            64ep4stw8gq,
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


                    /* Success */

                    formStatus.textContent =
                        "Message sent successfully! Thank you for contacting me.";

                    formStatus.className =
                        "form-status status-success";


                    contactForm.reset();


                } catch (error) {

                    console.error(
                        "Form submission error:",
                        error
                    );


                    formStatus.textContent =
                        error.message ||
                        "Something went wrong. Please try again.";

                    formStatus.className =
                        "form-status status-error";


                } finally {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML = `
                        <span>Send Message</span>
                        <i class="fa-solid fa-paper-plane"></i>
                    `;

                }

            }
        );

    }


    /* =================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
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
                        target.offsetTop -
                        headerHeight;

                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });

});