/* =========================================================
   PEDRO WENG - CYBERSECURITY WEBSITE
   MAIN JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       INITIALIZE ALL FEATURES
    ----------------------------------------------------- */

    initLanguageSwitcher();
    initMobileMenu();
    initHeaderScroll();
    initSmoothScrolling();
    initRevealAnimations();
    initActiveNavigation();
    initVideoFilters();
    initVideoModal();
    initBackToTop();
    initContactForm();
    initKeyboardAccessibility();

    /* -----------------------------------------------------
       RESTORE SAVED LANGUAGE
    ----------------------------------------------------- */

    const savedLanguage =
        localStorage.getItem("preferredLanguage") || "en";

    setLanguage(savedLanguage);

});


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentLanguage = "en";

const SUPPORTED_LANGUAGES = ["en", "pt"];


/* =========================================================
   LANGUAGE SWITCHER
========================================================= */

function initLanguageSwitcher() {

    const languageButtons =
        document.querySelectorAll(".language-btn");

    if (!languageButtons.length) {
        return;
    }

    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const language =
                button.dataset.language;

            if (!SUPPORTED_LANGUAGES.includes(language)) {
                return;
            }

            setLanguage(language);

        });

    });

}


/* =========================================================
   SET LANGUAGE
========================================================= */

function setLanguage(language) {

    if (!SUPPORTED_LANGUAGES.includes(language)) {
        language = "en";
    }

    currentLanguage = language;

    /* -----------------------------------------------------
       UPDATE TEXT ELEMENTS
    ----------------------------------------------------- */

    const translatableElements =
        document.querySelectorAll("[data-en][data-pt]");

    translatableElements.forEach(element => {

        const translatedText =
            element.dataset[language];

        if (translatedText === undefined) {
            return;
        }

        /*
         * For normal elements we use textContent.
         * This preserves icons and child elements when needed.
         */

        if (element.children.length === 0) {

            element.textContent = translatedText;

        } else {

            /*
             * Some elements contain icons.
             * Only replace text when the element itself
             * is intended to be a simple text container.
             */

            const tagName =
                element.tagName.toLowerCase();

            if (
                tagName === "h1" ||
                tagName === "h2" ||
                tagName === "h3" ||
                tagName === "h4" ||
                tagName === "h5" ||
                tagName === "h6" ||
                tagName === "p" ||
                tagName === "span" ||
                tagName === "a" ||
                tagName === "strong" ||
                tagName === "small"
            ) {

                /*
                 * If the element contains an icon,
                 * update only its text nodes.
                 */

                const hasIcon =
                    element.querySelector("i");

                if (!hasIcon) {

                    element.textContent =
                        translatedText;

                }

            }

        }

    });


    /* -----------------------------------------------------
       UPDATE SELECT OPTIONS
    ----------------------------------------------------- */

    updateSelectOptions(language);


    /* -----------------------------------------------------
       UPDATE FORM PLACEHOLDERS
    ----------------------------------------------------- */

    updateFormPlaceholders(language);


    /* -----------------------------------------------------
       UPDATE VIDEO MODAL TITLE
    ----------------------------------------------------- */

    updateVideoModalLanguage();


    /* -----------------------------------------------------
       UPDATE HTML LANGUAGE
    ----------------------------------------------------- */

    document.documentElement.lang =
        language === "pt" ? "pt" : "en";


    /* -----------------------------------------------------
       UPDATE PAGE TITLE
    ----------------------------------------------------- */

    updatePageTitle(language);


    /* -----------------------------------------------------
       UPDATE META DESCRIPTION
    ----------------------------------------------------- */

    updateMetaDescription(language);


    /* -----------------------------------------------------
       UPDATE LANGUAGE BUTTONS
    ----------------------------------------------------- */

    updateLanguageButtons(language);


    /* -----------------------------------------------------
       SAVE LANGUAGE
    ----------------------------------------------------- */

    localStorage.setItem(
        "preferredLanguage",
        language
    );


    /* -----------------------------------------------------
       DISPATCH CUSTOM EVENT
    ----------------------------------------------------- */

    document.dispatchEvent(
        new CustomEvent("languageChanged", {
            detail: {
                language: language
            }
        })
    );

}


/* =========================================================
   UPDATE LANGUAGE BUTTONS
========================================================= */

function updateLanguageButtons(language) {

    const buttons =
        document.querySelectorAll(".language-btn");

    buttons.forEach(button => {

        const buttonLanguage =
            button.dataset.language;

        const isActive =
            buttonLanguage === language;

        button.classList.toggle(
            "active",
            isActive
        );

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );

    });

}


/* =========================================================
   UPDATE SELECT OPTIONS
========================================================= */

function updateSelectOptions(language) {

    const options =
        document.querySelectorAll(
            "#subject option[data-en][data-pt]"
        );

    options.forEach(option => {

        const text =
            option.dataset[language];

        if (text) {

            option.textContent = text;

        }

    });

}


/* =========================================================
   UPDATE FORM PLACEHOLDERS
========================================================= */

function updateFormPlaceholders(language) {

    const inputs =
        document.querySelectorAll(
            "[data-placeholder-en][data-placeholder-pt]"
        );

    inputs.forEach(input => {

        const placeholder =
            input.dataset[
                `placeholder-${language}`
            ];

        if (placeholder) {

            input.placeholder =
                placeholder;

        }

    });

}


/* =========================================================
   PAGE TITLE
========================================================= */

function updatePageTitle(language) {

    const title =
        document.getElementById("page-title");

    if (!title) {
        return;
    }

    if (language === "pt") {

        title.textContent =
            "Pedro Weng | Engenheiro Sénior de Cibersegurança";

    } else {

        title.textContent =
            "Pedro Weng | Senior Cybersecurity Engineer";

    }

}


/* =========================================================
   META DESCRIPTION
========================================================= */

function updateMetaDescription(language) {

    const description =
        document.getElementById("page-description");

    if (!description) {
        return;
    }

    if (language === "pt") {

        description.setAttribute(
            "content",
            "Pedro Weng - Engenheiro Sénior de Cibersegurança e Consultor de Segurança da Informação especializado em SOC, SIEM, Resposta a Incidentes, Segurança na Nuvem e Gestão de Risco Cibernético."
        );

    } else {

        description.setAttribute(
            "content",
            "Pedro Weng - Senior Cybersecurity Engineer and Information Security Consultant specializing in SOC, SIEM, Incident Response, Cloud Security and Cyber Risk Management."
        );

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.getElementById("nav");

    if (!menuToggle || !nav) {
        return;
    }

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                nav.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            updateMenuIcon(
                menuToggle,
                isOpen
            );

        }
    );


    /* -----------------------------------------------------
       CLOSE MENU WHEN CLICKING NAV LINK
    ----------------------------------------------------- */

    const navLinks =
        nav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


    /* -----------------------------------------------------
       CLOSE WHEN CLICKING OUTSIDE
    ----------------------------------------------------- */

    document.addEventListener(
        "click",
        event => {

            if (
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu() {

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.getElementById("nav");

    if (!menuToggle || !nav) {
        return;
    }

    nav.classList.remove("active");

    menuToggle.classList.remove(
        "active"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    updateMenuIcon(
        menuToggle,
        false
    );

}


/* =========================================================
   MENU ICON
========================================================= */

function updateMenuIcon(
    menuToggle,
    isOpen
) {

    const icon =
        menuToggle.querySelector("i");

    if (!icon) {
        return;
    }

    if (isOpen) {

        icon.classList.remove(
            "fa-bars"
        );

        icon.classList.add(
            "fa-xmark"
        );

    } else {

        icon.classList.remove(
            "fa-xmark"
        );

        icon.classList.add(
            "fa-bars"
        );

    }

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function initHeaderScroll() {

    const header =
        document.getElementById("header");

    if (!header) {
        return;
    }

    const handleScroll =
        () => {

            if (window.scrollY > 40) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    handleScroll();

}


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header =
                    document.getElementById(
                        "header"
                    );

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
                    top: targetPosition,
                    behavior: "smooth"
                });

                /*
                 * Update URL without jumping.
                 */

                try {

                    history.pushState(
                        null,
                        "",
                        href
                    );

                } catch (error) {

                    console.warn(
                        "Unable to update URL:",
                        error
                    );

                }

            }
        );

    });

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!revealElements.length) {
        return;
    }


    /* -----------------------------------------------------
       REDUCED MOTION
    ----------------------------------------------------- */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        revealElements.forEach(
            element => {
                element.classList.add(
                    "visible"
                );
            }
        );

        return;
    }


    /* -----------------------------------------------------
       INTERSECTION OBSERVER
    ----------------------------------------------------- */

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

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
                observer.observe(
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

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav a[href^='#']"
        );

    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    const setActiveLink =
        sectionId => {

            navLinks.forEach(link => {

                const href =
                    link.getAttribute(
                        "href"
                    );

                const isActive =
                    href ===
                    `#${sectionId}`;

                link.classList.toggle(
                    "active",
                    isActive
                );

            });

        };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            setActiveLink(
                                entry.target.id
                            );

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",
                threshold: 0
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   VIDEO FILTERS
========================================================= */

function initVideoFilters() {

    const filters =
        document.querySelectorAll(
            ".video-filter"
        );

    const cards =
        document.querySelectorAll(
            ".video-card"
        );

    if (
        !filters.length ||
        !cards.length
    ) {
        return;
    }


    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                const category =
                    filter.dataset.filter;

                /* -------------------------------------------------
                   UPDATE BUTTON STATE
                ------------------------------------------------- */

                filters.forEach(button => {

                    const active =
                        button === filter;

                    button.classList.toggle(
                        "active",
                        active
                    );

                    button.setAttribute(
                        "aria-pressed",
                        String(active)
                    );

                });


                /* -------------------------------------------------
                   FILTER CARDS
                ------------------------------------------------- */

                cards.forEach(card => {

                    const cardCategory =
                        card.dataset.category;

                    const shouldShow =
                        category === "all" ||
                        cardCategory === category;

                    if (shouldShow) {

                        card.classList.remove(
                            "video-hidden"
                        );

                        card.style.display =
                            "";

                        requestAnimationFrame(
                            () => {

                                card.classList.add(
                                    "video-filter-visible"
                                );

                            }
                        );

                    } else {

                        card.classList.remove(
                            "video-filter-visible"
                        );

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

}


/* =========================================================
   VIDEO MODAL
========================================================= */

function initVideoModal() {

    const modal =
        document.getElementById(
            "video-modal"
        );

    const closeButton =
        document.getElementById(
            "video-modal-close"
        );

    const iframe =
        document.getElementById(
            "video-player"
        );

    const title =
        document.getElementById(
            "video-modal-title"
        );

    const playButtons =
        document.querySelectorAll(
            ".play-button"
        );

    if (
        !modal ||
        !closeButton ||
        !iframe ||
        !title
    ) {
        return;
    }


    /* -----------------------------------------------------
       PLAY BUTTONS
    ----------------------------------------------------- */

    playButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const videoId =
                    button.dataset.video;

                const titleEn =
                    button.dataset.titleEn ||
                    "Cybersecurity Training";

                const titlePt =
                    button.dataset.titlePt ||
                    "Formação em Cibersegurança";


                /* -------------------------------------------------
                   VALIDATE VIDEO ID
                ------------------------------------------------- */

                if (
                    !videoId ||
                    videoId.startsWith(
                        "YOUR_VIDEO_ID"
                    )
                ) {

                    showVideoUnavailableMessage();

                    return;

                }


                /* -------------------------------------------------
                   SET MODAL TITLE
                ------------------------------------------------- */

                title.dataset.titleEn =
                    titleEn;

                title.dataset.titlePt =
                    titlePt;

                title.textContent =
                    currentLanguage === "pt"
                        ? titlePt
                        : titleEn;


                /* -------------------------------------------------
                   YOUTUBE URL
                ------------------------------------------------- */

                iframe.src =
                    `https://www.youtube.com/embed/${encodeURIComponent(
                        videoId
                    )}?autoplay=1&rel=0`;


                /* -------------------------------------------------
                   OPEN MODAL
                ------------------------------------------------- */

                modal.classList.add(
                    "active"
                );

                modal.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.classList.add(
                    "modal-open"
                );


                /* -------------------------------------------------
                   FOCUS CLOSE BUTTON
                ------------------------------------------------- */

                setTimeout(
                    () => {
                        closeButton.focus();
                    },
                    100
                );

            }
        );

    });


    /* -----------------------------------------------------
       CLOSE BUTTON
    ----------------------------------------------------- */

    closeButton.addEventListener(
        "click",
        closeVideoModal
    );


    /* -----------------------------------------------------
       CLICK OUTSIDE MODAL
    ----------------------------------------------------- */

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeVideoModal();

            }

        }
    );

}


/* =========================================================
   CLOSE VIDEO MODAL
========================================================= */

function closeVideoModal() {

    const modal =
        document.getElementById(
            "video-modal"
        );

    const iframe =
        document.getElementById(
            "video-player"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    /* -----------------------------------------------------
       STOP YOUTUBE VIDEO
    ----------------------------------------------------- */

    if (iframe) {

        iframe.src = "";

    }


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   VIDEO UNAVAILABLE MESSAGE
========================================================= */

function showVideoUnavailableMessage() {

    const messageEn =
        "This video is not available yet.";

    const messagePt =
        "Este vídeo ainda não está disponível.";

    const message =
        currentLanguage === "pt"
            ? messagePt
            : messageEn;

    /*
     * Use the browser alert only as a fallback.
     * Replace with your own notification component
     * if you already have one in CSS.
     */

    alert(message);

}


/* =========================================================
   UPDATE VIDEO MODAL LANGUAGE
========================================================= */

function updateVideoModalLanguage() {

    const title =
        document.getElementById(
            "video-modal-title"
        );

    if (!title) {
        return;
    }

    if (
        title.dataset.titleEn &&
        title.dataset.titlePt
    ) {

        title.textContent =
            currentLanguage === "pt"
                ? title.dataset.titlePt
                : title.dataset.titleEn;

    }

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "back-to-top"
        );

    if (!button) {
        return;
    }


    /* -----------------------------------------------------
       SHOW / HIDE BUTTON
    ----------------------------------------------------- */

    const toggleButton =
        () => {

            if (
                window.scrollY >
                500
            ) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        };


    window.addEventListener(
        "scroll",
        toggleButton,
        {
            passive: true
        }
    );


    toggleButton();


    /* -----------------------------------------------------
       SCROLL TO TOP
    ----------------------------------------------------- */

    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contact-form"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        handleContactFormSubmit
    );

}


/* =========================================================
   CONTACT FORM SUBMISSION
========================================================= */

async function handleContactFormSubmit(
    event
) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const submitButton =
        document.getElementById(
            "submit-button"
        );

    const status =
        document.getElementById(
            "form-status"
        );


    if (!form) {
        return;
    }


    /* -----------------------------------------------------
       VALIDATE FORM
    ----------------------------------------------------- */

    if (
        !validateContactForm(form)
    ) {

        setFormStatus(
            getTranslation(
                "Please complete all required fields correctly.",
                "Preencha corretamente todos os campos obrigatórios."
            ),
            "error"
        );

        return;

    }


    /* -----------------------------------------------------
       PREVENT DOUBLE SUBMISSION
    ----------------------------------------------------- */

    if (
        submitButton &&
        submitButton.disabled
    ) {

        return;

    }


    setSubmitButtonLoading(
        true
    );


    setFormStatus(
        getTranslation(
            "Sending your message...",
            "A enviar a sua mensagem..."
        ),
        "loading"
    );


    try {

        /*
         * Forminit SDK
         *
         * The HTML already loads:
         *
         * https://forminit.com/sdk/v1/forminit.js
         *
         * We first attempt to use the Forminit SDK.
         */

        const result =
            await submitToForminit(form);


        if (
            result &&
            result.success
        ) {

            setFormStatus(
                getTranslation(
                    "Thank you! Your message has been sent successfully.",
                    "Obrigado! A sua mensagem foi enviada com sucesso."
                ),
                "success"
            );


            form.reset();


            /*
             * Restore current language placeholders
             * after form.reset().
             */

            updateFormPlaceholders(
                currentLanguage
            );


        } else {

            throw new Error(
                "Form submission failed."
            );

        }

    } catch (error) {

        console.error(
            "Contact form error:",
            error
        );


        setFormStatus(
            getTranslation(
                "Unable to send your message right now. Please try again or contact me directly by email.",
                "Não foi possível enviar a sua mensagem neste momento. Tente novamente ou contacte-me diretamente por email."
            ),
            "error"
        );

    } finally {

        setSubmitButtonLoading(
            false
        );

    }

}


/* =========================================================
   FORM VALIDATION
========================================================= */

function validateContactForm(form) {

    const fullName =
        document.getElementById(
            "fullName"
        );

    const email =
        document.getElementById(
            "email"
        );

    const message =
        document.getElementById(
            "message"
        );


    if (
        !fullName ||
        !email ||
        !message
    ) {

        return false;

    }


    const nameValue =
        fullName.value.trim();

    const emailValue =
        email.value.trim();

    const messageValue =
        message.value.trim();


    /* -----------------------------------------------------
       NAME
    ----------------------------------------------------- */

    if (
        nameValue.length < 2
    ) {

        fullName.focus();

        return false;

    }


    /* -----------------------------------------------------
       EMAIL
    ----------------------------------------------------- */

    if (
        !isValidEmail(emailValue)
    ) {

        email.focus();

        return false;

    }


    /* -----------------------------------------------------
       MESSAGE
    ----------------------------------------------------- */

    if (
        messageValue.length < 10
    ) {

        message.focus();

        return false;

    }


    return true;

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(
        email
    );

}


/* =========================================================
   FORM INIT / FORMINIT SUBMISSION
========================================================= */

async function submitToForminit(form) {

    /*
     * IMPORTANT:
     *
     * The exact Forminit SDK method can vary depending
     * on the Forminit form configuration.
     *
     * This function checks for the common SDK interfaces
     * instead of crashing if the SDK is unavailable.
     */


    /* -----------------------------------------------------
       OPTION 1 - GLOBAL FORMINIT OBJECT
    ----------------------------------------------------- */

    if (
        window.Forminit &&
        typeof window.Forminit.submit ===
            "function"
    ) {

        const response =
            await window.Forminit.submit(
                form
            );

        return normalizeForminitResponse(
            response
        );

    }


    /* -----------------------------------------------------
       OPTION 2 - FORMINIT SDK FUNCTION
    ----------------------------------------------------- */

    if (
        window.forminit &&
        typeof window.forminit.submit ===
            "function"
    ) {

        const response =
            await window.forminit.submit(
                form
            );

        return normalizeForminitResponse(
            response
        );

    }


    /*
     * If Forminit is not initialized correctly,
     * throw an error rather than pretending the
     * message was sent.
     */

    throw new Error(
        "Forminit SDK is not available or is not configured."
    );

}


/* =========================================================
   NORMALIZE FORMINIT RESPONSE
========================================================= */

function normalizeForminitResponse(
    response
) {

    /*
     * Some SDKs return:
     *
     * { success: true }
     *
     * or:
     *
     * { ok: true }
     *
     * or:
     *
     * Response-like objects.
     */


    if (
        response &&
        response.success === true
    ) {

        return {
            success: true,
            data: response
        };

    }


    if (
        response &&
        response.ok === true
    ) {

        return {
            success: true,
            data: response
        };

    }


    if (
        response &&
        response.status >= 200 &&
        response.status < 300
    ) {

        return {
            success: true,
            data: response
        };

    }


    return {
        success: false,
        data: response
    };

}


/* =========================================================
   SUBMIT BUTTON LOADING STATE
========================================================= */

function setSubmitButtonLoading(
    loading
) {

    const button =
        document.getElementById(
            "submit-button"
        );

    if (!button) {
        return;
    }


    const text =
        button.querySelector(
            "span"
        );

    const icon =
        button.querySelector(
            "i"
        );


    if (loading) {

        button.disabled = true;

        button.classList.add(
            "loading"
        );

        button.setAttribute(
            "aria-busy",
            "true"
        );


        if (text) {

            text.dataset.originalText =
                text.textContent;

            text.textContent =
                getTranslation(
                    "Sending...",
                    "A enviar..."
                );

        }


        if (icon) {

            icon.classList.remove(
                "fa-paper-plane"
            );

            icon.classList.add(
                "fa-spinner",
                "fa-spin"
            );

        }

    } else {

        button.disabled = false;

        button.classList.remove(
            "loading"
        );

        button.setAttribute(
            "aria-busy",
            "false"
        );


        if (text) {

            text.textContent =
                getTranslation(
                    "Send Message",
                    "Enviar Mensagem"
                );

        }


        if (icon) {

            icon.classList.remove(
                "fa-spinner",
                "fa-spin"
            );

            icon.classList.add(
                "fa-paper-plane"
            );

        }

    }

}


/* =========================================================
   FORM STATUS
========================================================= */

function setFormStatus(
    message,
    type
) {

    const status =
        document.getElementById(
            "form-status"
        );

    if (!status) {
        return;
    }


    status.textContent =
        message;

    status.className =
        "form-status";


    if (type) {

        status.classList.add(
            `form-status-${type}`
        );

    }


    status.setAttribute(
        "data-state",
        type || ""
    );

}


/* =========================================================
   TRANSLATION HELPER
========================================================= */

function getTranslation(
    english,
    portuguese
) {

    return currentLanguage === "pt"
        ? portuguese
        : english;

}


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

function initKeyboardAccessibility() {

    document.addEventListener(
        "keydown",
        event => {

            /* -------------------------------------------------
               ESCAPE
            ------------------------------------------------- */

            if (
                event.key === "Escape"
            ) {

                const modal =
                    document.getElementById(
                        "video-modal"
                    );

                if (
                    modal &&
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    closeVideoModal();

                    return;

                }


                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   RESIZE HANDLER
========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
         * If the screen becomes desktop-sized,
         * automatically close the mobile menu.
         */

        if (
            window.innerWidth > 992
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   HANDLE BROWSER BACK/FORWARD
========================================================= */

window.addEventListener(
    "popstate",
    () => {

        const hash =
            window.location.hash;

        if (!hash) {
            return;
        }

        const target =
            document.querySelector(
                hash
            );

        if (!target) {
            return;
        }

        const header =
            document.getElementById(
                "header"
            );

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;

        const position =
            target.getBoundingClientRect()
                .top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: position,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
         * If the page becomes visible again,
         * refresh scroll-related UI.
         */

        if (
            document.visibilityState ===
            "visible"
        ) {

            const header =
                document.getElementById(
                    "header"
                );

            if (
                header &&
                window.scrollY > 40
            ) {

                header.classList.add(
                    "scrolled"
                );

            }

        }

    }
);


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
    "error",
    event => {

        const element =
            event.target;

        if (
            element &&
            element.tagName === "IMG"
        ) {

            element.classList.add(
                "image-load-error"
            );

            console.warn(
                "Image could not be loaded:",
                element.src
            );

        }

    },
    true
);


/* =========================================================
   EXTERNAL LINKS
========================================================= */

function protectExternalLinks() {

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach(link => {

        const rel =
            link.getAttribute("rel") || "";

        if (
            !rel.includes("noopener")
        ) {

            link.setAttribute(
                "rel",
                `${rel} noopener`
                    .trim()
            );

        }

        if (
            !rel.includes("noreferrer")
        ) {

            link.setAttribute(
                "rel",
                `${link.getAttribute("rel")} noreferrer`
                    .trim()
            );

        }

    });

}

protectExternalLinks();


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    "%cPedro Weng | Cybersecurity Engineer",
    "font-size: 18px; font-weight: bold;"
);

console.log(
    "%cSOC • SIEM • Cloud Security • Incident Response",
    "font-size: 12px;"
);


/* =========================================================
   GLOBAL ERROR HANDLING
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.error(
            "Website error:",
            event.error || event.message
        );

    }
);


/* =========================================================
   UNHANDLED PROMISE ERRORS
========================================================= */

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "Unhandled promise rejection:",
            event.reason
        );

    }
);


/* =========================================================
   END OF SCRIPT
========================================================= */
