/* =====================================================
   PEDRO WENG
   Cybersecurity Portfolio
   script.js
===================================================== */


document.addEventListener("DOMContentLoaded", function(){


/* ==========================
   STICKY HEADER EFFECT
========================== */

const header = document.querySelector("header");


window.addEventListener("scroll", function(){

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});



/* ==========================
   SMOOTH SCROLL
========================== */

const links = document.querySelectorAll(
    'a[href^="#"]'
);


links.forEach(link => {

    link.addEventListener(
        "click",
        function(e){

            const target =
            document.querySelector(
                this.getAttribute("href")
            );


            if(target){

                e.preventDefault();


                target.scrollIntoView({

                    behavior:"smooth",
                    block:"start"

                });

            }

        }
    );

});



/* ==========================
   ACTIVE NAVIGATION
========================== */

const sections =
document.querySelectorAll("section");


const navLinks =
document.querySelectorAll("nav a");



window.addEventListener(
"scroll",
()=>{


let current="";


sections.forEach(section=>{


const sectionTop =
section.offsetTop - 150;


const sectionHeight =
section.offsetHeight;



if(
window.scrollY >= sectionTop &&
window.scrollY <
sectionTop + sectionHeight
){

current = section.getAttribute("id");

}


});



navLinks.forEach(link=>{


link.classList.remove("active");


if(
link.getAttribute("href")
===
"#"+current
){

link.classList.add("active");

}


});


});



/* ==========================
   SCROLL REVEAL ANIMATION
========================== */


const revealElements =
document.querySelectorAll(
".card, .feature, .skill-card, .timeline-item"
);



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";

entry.target.style.transform=
"translateY(0)";


observer.unobserve(
entry.target
);


}


});


},
{

threshold:0.15

});



revealElements.forEach(element=>{


element.style.opacity="0";

element.style.transform=
"translateY(40px)";


element.style.transition=
"all .7s ease";


observer.observe(element);


});



/* ==========================
   CONTACT FORM - FORMINIT
========================== */

const FORM_ID = "64ep4stw8gq";

const forminit = new Forminit();

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "") {
            status.textContent = "Please enter your full name.";
            status.style.color = "#ef4444";
            return;
        }

        if (email === "") {
            status.textContent = "Please enter your email address.";
            status.style.color = "#ef4444";
            return;
        }

        if (message === "") {
            status.textContent = "Please enter your message.";
            status.style.color = "#ef4444";
            return;
        }

        status.textContent = "Sending...";
        status.style.color = "#2563eb";

        try {

            const { error } = await forminit.submit(
                FORM_ID,
                new FormData(form)
            );

            if (error) {
                status.textContent = error.message;
                status.style.color = "#ef4444";
                return;
            }

            status.textContent = "✅ Thank you! Your message has been sent successfully.";
            status.style.color = "#22c55e";

            form.reset();

            setTimeout(() => {
                status.textContent = "";
            }, 5000);

        } catch (err) {

            status.textContent = "An unexpected error occurred. Please try again.";
            status.style.color = "#ef4444";

        }

    });

}


/* ==========================
   CURRENT YEAR FOOTER
========================== */


const year =
document.querySelector(
".current-year"
);



if(year){

year.textContent =
new Date().getFullYear();

}



});
