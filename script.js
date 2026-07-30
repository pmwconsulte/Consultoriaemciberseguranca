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
   CONTACT FORM VALIDATION
========================== */


const form =
document.getElementById(
"contact-form"
);


const status =
document.getElementById(
"form-status"
);



if(form){


form.addEventListener(
"submit",
function(e){


e.preventDefault();



const name =
document.getElementById(
"fullName"
).value;



if(name.trim()===""){


status.innerHTML =
"Please enter your name.";

status.style.color =
"#ef4444";


return;


}



status.innerHTML =
"Thank you. Your message has been received.";

status.style.color =
"#22c55e";



form.reset();



setTimeout(()=>{


status.innerHTML="";


},5000);



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