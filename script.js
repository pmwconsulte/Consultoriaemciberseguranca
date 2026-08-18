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

    const videoModal =
        document.getElementById("video-modal");

    const videoPlayer =
        document.getElementById("video-player");

    const videoModalTitle =
        document.getElementById("video-modal-title");

    const videoModalClose =
        document.getElementById("video-modal-close");

    const languageButtons =
        document.querySelectorAll(".language-btn");

    const form =
        document.getElementById("contact-form");

    const formStatus =
        document.getElementById("form-status");

    const submitButton =
        document.getElementById("submit-button");


    /* =================================================
       LANGUAGE
    ================================================= */

    let currentLanguage =
        localStorage.getItem("website-language") || "en";


    function translatePage(language) {

        currentLanguage = language;

        document.documentElement.lang = language;

        localStorage.setItem(
            "website-language",
            language
        );


        /* ---------------------------------------------
           NORMAL TEXT
        --------------------------------------------- */

        document.querySelectorAll(
            "[data-en][data-pt]"
        ).forEach(element => {

            const translation =
                language === "pt"
                    ? element.getAttribute("data-pt")
                    : element.getAttribute("data-en");

            if (translation !== null) {
                element.textContent = translation;
            }

        });


        /* ---------------------------------------------
           INPUT PLACEHOLDERS
        --------------------------------------------- */

        document.querySelectorAll(
            "[data-placeholder-en][data-placeholder-pt]"
        ).forEach(element => {

            element.placeholder =
                language === "pt"
                    ? element.getAttribute("data-placeholder-pt")
                    : element.getAttribute("data-placeholder-en");

        });


        /* ---------------------------------------------
           SELECT OPTIONS
        --------------------------------------------- */

        document.querySelectorAll(
            "select option[data-en][data-pt]"
        ).forEach(option => {

            option.textContent =
                language === "pt"
                    ? option.getAttribute("data-pt")
                    : option.getAttribute("data-en");

        });


        /* ---------------------------------------------
           LANGUAGE BUTTONS
        --------------------------------------------- */

        languageButtons.forEach(button => {

            const isActive =
                button.dataset.language === language;

            button.classList.toggle(
                "active",
                isActive
            );

        });


        /* ---------------------------------------------
           PAGE TITLE
        --------------------------------------------- */

        const pageTitle =
            document.getElementById("page-title");

        const pageDescription =
            document.getElementById("page-description");


        if (pageTitle) {

            pageTitle.textContent =
                language === "pt"
                    ? "Pedro Weng | Engenheiro Sénior de Cibersegurança"
                    : "Pedro Weng | Senior Cybersecurity Engineer";

        }


        if (pageDescription) {

            pageDescription.setAttribute(
                "content",

                language === "pt"

                    ? "Pedro Weng - Engenheiro Sénior de Cibersegurança e Consultor de Segurança da Informação especializado em SOC, SIEM, Resposta a Incidentes, Segurança na Nuvem e Gestão de Risco Cibernético."

                    : "Pedro Weng - Senior Cybersecurity Engineer and Information Security Consultant specializing in SOC, SIEM, Incident Response, Cloud Security and Cyber Risk Management."
            );

        }


        /* ---------------------------------------------
           ARIA LABELS
        --------------------------------------------- */

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-label",

                language === "pt"
                    ? "Abrir menu de navegação"
                    : "Open navigation menu"
            );

        }


        if (videoModalClose) {

            videoModalClose.setAttribute(
                "aria-label",

                language === "pt"
                    ? "Fechar vídeo"
                    : "Close video"
            );

        }


        if (backToTop) {

            backToTop.setAttribute(
                "aria-label",

                language === "pt"
                    ? "Voltar ao topo"
                    : "Back to top"
            );

        }

    }


    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                translatePage(
                    button.dataset.language
                );

            }
        );

    });


    /* Initialize language */

    translatePage(currentLanguage);


    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    nav.classList.toggle("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );

                menuToggle.innerHTML =
                    isOpen
                        ? '<i class="fa-solid fa-xmark"></i>'
                        : '<i class="fa-solid fa-bars"></i>';

            }
        );


        /* Close menu after navigation */

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.innerHTML =
                        '<i class="fa-solid fa-bars"></i>';

                }
            );

        });

    }


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    function handleHeader() {

        if (!header) {
            return;
        }

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }

    window.addEventListener(
        "scroll",
        handleHeader,
        { passive: true }
    );

    handleHeader();


    /* =================================================
       REVEAL ANIMATIONS
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
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

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =================================================
       BACK TO TOP
    ================================================= */

    function handleBackToTop() {

        if (!backToTop) {
            return;
        }

        backToTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

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
       VIDEO FILTER
    ================================================= */

    const videoFilters =
        document.querySelectorAll(".video-filter");

    const videoCards =
        document.querySelectorAll(".video-card");


    videoFilters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                const category =
                    filter.dataset.filter;


                /* Update buttons */

                videoFilters.forEach(button => {

                    const active =
                        button === filter;

                    button.classList.toggle(
                        "active",
                        active
                    );

                    button.setAttribute(
                        "aria-pressed",
                        active
                    );

                });


                /* Filter cards */

                videoCards.forEach(card => {

                    const cardCategory =
                        card.dataset.category;


                    if (
                        category === "all" ||
                        cardCategory === category
                    ) {

                        card.classList.remove(
                            "hidden"
                        );

                    } else {

                        card.classList.add(
                            "hidden"
                        );

                    }

                });

            }
        );

    });


    /* =================================================
       YOUTUBE VIDEO MODAL
    ================================================= */

    const playButtons =
        document.querySelectorAll(".play-button");


    function openVideo(button) {

        if (!videoModal || !videoPlayer) {
            return;
        }


        const videoId =
            button.dataset.video;


        if (
            !videoId ||
            videoId.startsWith("YOUR_VIDEO_ID")
        ) {

            alert(
                currentLanguage === "pt"
                    ? "Adicione primeiro o ID do vídeo do YouTube."
                    : "Please add the YouTube video ID first."
            );

            return;

        }


        const title =
            currentLanguage === "pt"
                ? button.dataset.titlePt
                : button.dataset.titleEn;


        videoModalTitle.textContent =
            title || "Cybersecurity Training";


        videoPlayer.src =
            `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;


        videoModal.classList.add("active");

        videoModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeVideo() {

        if (!videoModal || !videoPlayer) {
            return;
        }


        videoPlayer.src = "";

        videoModal.classList.remove(
            "active"
        );

        videoModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    playButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => openVideo(button)
        );

    });


    if (videoModalClose) {

        videoModalClose.addEventListener(
            "click",
            closeVideo
        );

    }


    if (videoModal) {

        videoModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === videoModal
                ) {

                    closeVideo();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                videoModal &&
                videoModal.classList.contains("active")
            ) {

                closeVideo();

            }

        }
    );


    /* =================================================
       FORMINIT CONTACT FORM
    ================================================= */

    if (form) {

        const forminit =
            new Forminit();

        const FORM_ID =
            "64ep4stw8gq";


        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (formStatus) {

                    formStatus.textContent =
                        currentLanguage === "pt"
                            ? "A enviar..."
                            : "Sending...";

                    formStatus.className =
                        "form-status";

                }


                if (submitButton) {

                    submitButton.disabled =
                        true;

                }


                try {

                    const formData =
                        new FormData(form);


                    const {
                        data,
                        error
                    } =
                        await forminit.submit(
                            FORM_ID,
                            formData
                        );


                    if (error) {

                        console.error(
                            "Forminit error:",
                            error
                        );


                        if (formStatus) {

                            formStatus.textContent =
                                error.message ||
                                (
                                    currentLanguage === "pt"
                                        ? "Não foi possível enviar a sua mensagem. Tente novamente."
                                        : "Unable to send your message. Please try again."
                                );

                            formStatus.className =
                                "form-status status-error";

                        }

                        return;

                    }


                    console.log(
                        "Form submitted:",
                        data
                    );


                    if (formStatus) {

                        formStatus.textContent =
                            currentLanguage === "pt"
                                ? "Mensagem enviada com sucesso! Obrigado por entrar em contacto."
                                : "Message sent successfully! Thank you for contacting me.";

                        formStatus.className =
                            "form-status status-success";

                    }


                    form.reset();


                    /* Restore translated placeholders */

                    translatePage(
                        currentLanguage
                    );


                } catch (error) {

                    console.error(
                        "Submission error:",
                        error
                    );


                    if (formStatus) {

                        formStatus.textContent =
                            currentLanguage === "pt"
                                ? "Ocorreu um erro. Tente novamente."
                                : "Something went wrong. Please try again.";

                        formStatus.className =
                            "form-status status-error";

                    }

                } finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                    }

                }

            }
        );

    }


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


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
                    target.getBoundingClientRect().top +
                    window.scrollY -
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


    /* =================================================
       CONSOLE MESSAGE
    ================================================= */

    console.log(
        "%cPedro Weng Cybersecurity Website",
        "color:#22c55e;font-size:18px;font-weight:bold;"
    );

    console.log(
        "Website initialized successfully."
    );

});
