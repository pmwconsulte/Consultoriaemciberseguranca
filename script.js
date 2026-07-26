/* ============================
   Pedro Weng Cybersecurity
   script.js
============================ */


/* Smooth scrolling navigation */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});


/* Header shadow when scrolling */

window.addEventListener("scroll", function(){

    const header = document.querySelector("header");

    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.3)";

    }else{

        header.style.boxShadow =
        "0 2px 8px rgba(0,0,0,0.2)";

    }

});


/* Scroll reveal animation */

const sections = document.querySelectorAll("section");


const observer = new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

    if(entry.isIntersecting){

        entry.target.classList.add("show");

    }

});

},
{
    threshold:0.15
});


sections.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});



/* Mobile navigation menu */

const nav = document.querySelector("nav ul");


const menuButton = document.createElement("button");

menuButton.innerHTML = "☰";

menuButton.className = "menu-btn";


document.querySelector("header .container")
.insertBefore(
    menuButton,
    nav
);



menuButton.addEventListener(
"click",
()=>{

    nav.classList.toggle("active");

});



/* Contact form message */

const form = document.querySelector("form");


if(form){

form.addEventListener(
"submit",
function(e){

    e.preventDefault();


    alert(
    "Obrigado pelo contacto. A sua mensagem foi recebida. Entraremos em contacto brevemente."
    );


    form.reset();

});

}



/* Back to top button */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "top-btn";


document.body.appendChild(topButton);



window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 500){

    topButton.style.display="block";

}else{

    topButton.style.display="none";

}

});



topButton.addEventListener(
"click",
()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});



/* Current year automatically */

const year =
document.querySelector("footer p");


if(year){

year.innerHTML =
"© " +
new Date().getFullYear() +
" Pedro Weng | Cybersecurity Consultant";

}