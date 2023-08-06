let lists = document.querySelectorAll("header .container ul li");
let links = document.querySelectorAll("header .container ul li a");
let home = document.querySelector(".home");
let about = document.querySelector(".about");
let portfolio = document.querySelector(".portfolio");
let contact = document.querySelector(".contact");

function removeActive() {
    lists.forEach((list) => {
        list.classList.remove("active");
    });
    links.forEach((link) => {
        link.classList.remove("active");
    });
}
window.onscroll = function() {
    if(Math.ceil(window.scrollY) >= home.offsetTop && Math.ceil(window.scrollY) < about.offsetTop) {
        removeActive();
        lists[0].classList.add("active");
        links[0].classList.add("active");
    }else if(Math.ceil(window.scrollY) >= about.offsetTop && Math.ceil(window.scrollY) < portfolio.offsetTop) {
        removeActive();
        lists[1].classList.add("active");
        links[1].classList.add("active");
    } else if(Math.ceil(window.scrollY) >= portfolio.offsetTop && Math.ceil(window.scrollY) < contact.offsetTop) {
        removeActive();
        lists[2].classList.add("active");
        links[2].classList.add("active");
    }else{
        removeActive();
        lists[3].classList.add("active");
        links[3].classList.add("active");
    }

    // scroll to top (._.)
    let circleProgress = document.querySelector(".contact .container .circle-progress");
    if(window.scrollY >= 600) {
        circleProgress.classList.add("moveit");
    }else{
        circleProgress.classList.remove("moveit");
    }
    circleProgress.onclick = function() {
        window.scrollTo ({
            top: 0,
            behavior: "smooth",
        });
    }
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollTop = document.documentElement.scrollTop;
    circleProgress.style.background = `conic-gradient(var(--neon-yellow) ${3.6 * ((scrollTop / height) * 100)}deg, #fff 0deg)`;
}
/// toggle

let theList = document.querySelector("header .container ul");
let toggle = document.querySelector("header .container .toggle");
let spans = document.querySelectorAll("header .container .toggle span");
toggle.onclick = function() {
    theList.classList.toggle("tog");
    spans[1].classList.toggle("hid");
    spans[0].classList.toggle("mov1");
    spans[2].classList.toggle("mov2");
}

// image slider

let slider = document.querySelector(".contact .container .slider");
let prevButton = document.querySelector("#left");
let nextButton = document.querySelector("#right");
let images = document.querySelectorAll(".contact .container .slider .image");
let bullets = document.querySelectorAll(".contact .container .slider .bullets span");
let count = 0;


function showBullets() {
    bullets.forEach((bullet) => {
        bullet.classList.remove("act");
    });
    bullets[count].classList.add("act");
}

function showSlides() {
    setTimeout(() => {
        for(let i =0 ;i< images.length;i++){
            images[i].classList.add("disabled");
        }
        images[count].classList.remove("disabled");
    },500);
    images.forEach((image) => {
        image.style.opacity = "0";
    });
    images[count].style.opacity = "1";
}
nextButton.onclick = function() {
    count++;
    if(count >= images.length) {
        count = 0;
    }
    showSlides();
    showBullets();
}
prevButton.onclick = function() {
    count--;
    if(count < 0) {
        count = images.length - 1;
    }
    showSlides();
    showBullets();
}
for(let i = 0;i<bullets.length;i++) {
    bullets[i].addEventListener("click", () => {
        count = i;
        showSlides();
        showBullets();
    })
}

// loading 
let loader = document.querySelector(".loader");
window.onload = function() {
    loader.style.display = "none";
}

// filter images

let theLinks = document.querySelectorAll(".portfolio .container .projects a");
let theUl = document.querySelectorAll(".portfolio .container .ports ul li");
theUl.forEach((list) => {
    list.addEventListener("click", rem);
    list.addEventListener("click", removeLinks);
})
function rem() {
    theUl.forEach((link) => {
        link.classList.remove("ac");
        this.classList.add("ac");
    })
}

function removeLinks() {
    setTimeout(() => {
        theLinks.forEach((link) => {
            link.style.display = "none";
        })
    },600)
    theLinks.forEach((link) => {
        link.classList.add("trans");
    })
    // the related 
    setTimeout(() => {
        document.querySelectorAll(this.dataset.cont).forEach((el) => {
            el.style.display = "block";
        })
    },600)
    document.querySelectorAll(this.dataset.cont).forEach((el) => {
        el.classList.remove("trans");
    })
}