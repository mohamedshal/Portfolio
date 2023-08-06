let section = document.querySelector(".skills");
let spans = document.querySelectorAll(".prog span");
let nums = document.querySelectorAll(".box .number");
let sec = document.querySelector(".stats");
let head = document.querySelector(".head");
let heads = document.querySelectorAll(".head span");
let headNav = document.querySelector("header .container");
let listButtons = document.querySelectorAll("header .container nav ul li a");
let basicDivs = document.querySelectorAll("body .basic");
let scroll = document.querySelector(".scroll");
let button = document.querySelector("header nav ul li button");
let started = false;
let begun = false;
let mode = 0;
button.innerHTML = `Mode ${mode}`;
button.onclick = function() {
    if(mode == 0){
        mode = 1;
    }else{
        mode = 0;
    }
    button.innerHTML = `Mode ${mode}`;
}
// active buttons click
listButtons.forEach((button) => {
    button.addEventListener("click",removeActiveButtons);
});
function removeActiveButtons() {
    if(mode == 0){
        listButtons.forEach((button) => {
            button.classList.remove("active");
            this.classList.add("active");
        })
    }
}
// toggle menue
let toggle = document.querySelector("nav i");
let toggleList  = document.querySelector("nav ul");

toggle.onclick = function() {
    toggleList.classList.toggle("toggle");
}


window.onscroll = function () {
    if (window.scrollY >= section.offsetTop) {
        spans.forEach((span) => {
            span.style.width = span.dataset.width;
        });
    };


    // scroll activel
    if(window.scrollY >= 100) {
        headNav.classList.add("fixed");
    } else {
        headNav.classList.remove("fixed");
    }
    if(mode == 1){
        if(Math.floor(window.scrollY) >=  basicDivs[5].offsetTop && Math.floor(window.scrollY) <  document.documentElement.scrollHeight){
            for(let i = 0;i<listButtons.length;i++){
                listButtons[i].classList.remove("active");
                if(listButtons[i].getAttribute("href") == `#${basicDivs[5].id}`) {
                    listButtons[i].classList.add("active");
                }
            }
        }else {
            for(let j =0;j<basicDivs.length-1;j++){
                if(Math.floor(window.scrollY) >=  basicDivs[j].offsetTop-10 && Math.floor(window.scrollY) <  basicDivs[j+1].offsetTop-10){
                    for(let i = 0;i<listButtons.length;i++){
                        listButtons[i].classList.remove("active");
                        if(listButtons[i].getAttribute("href") == `#${basicDivs[j].id}`) {
                            listButtons[i].classList.add("active");
                        }
                    }
                }
            }
        }
    }

    // count testimonials scroll
    if(window.scrollY >= head.offsetTop - 100){
        if(!started){
            heads.forEach((span) => {
                let count = setInterval(()=> {
                    span.textContent++;
                    if(span.textContent == span.dataset.head){
                        clearInterval(count);
                    }
                },1000 / span.dataset.head)
            });
        }
        started = true;
    }
    // scroll to top
    if(window.scrollY >= 1000) {
        scroll.classList.add("show");
    } else {
        scroll.classList.remove("show")
    }

    // scroll count pricing
    if (window.scrollY >= sec.offsetTop - 100) {
                if (!begun) {
                    nums.forEach((number) => startCount(number));
                }
                begun = true;
            }
}

scroll.onclick = function() {
    window.scrollTo ({
        top:0,
        behavior:"smooth",
    });
}

function startCount(el) {
    let goal = el.dataset.goal;
    let count = setInterval(()=> {
        el.textContent++;
        if(el.textContent == goal) {
            clearInterval(count);
        }
    },1000 / goal);
}


// shuffle 
let lists = document.querySelectorAll(".shuffle li");
let imgsContainers = document.querySelectorAll(".imgs-container div");
lists.forEach((list) => {
    list.addEventListener("click",removeActive);
    list.addEventListener("click",mangeElements);
    list.addEventListener("click",makeSmooth);
});
function removeActive(){
    lists.forEach((list) => {
        list.classList.remove("active");
        this.classList.add("active");
    });
}
function mangeElements() {
    imgsContainers.forEach((element) => {
        element.style.cssText = "opacity: 0;";
    });
    document.querySelectorAll(this.dataset.cont).forEach((cont) => {
        console.log(cont);
        cont.style.cssText = "opacity: 100%;";
    });
}
function makeSmooth() {
    setTimeout(() => {
        imgsContainers.forEach((element) => {
            element.style.cssText = "display:none;";
        });
        document.querySelectorAll(this.dataset.cont).forEach((cont) => {
            cont.style.cssText = "dislay:block;";
        });
    },400);
}

// image click
    let images = document.querySelectorAll(".imgs-container img");
    images.forEach((image) => {
    image.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".imgs-container img")) {
        let parent = document.createElement("div");
        parent.className = "parent";
        let inside = "";
        inside += `
            <div class="hoor"></div>
            <div class="parent-box">
            <i class="far fa-times-circle pop"></i>
            <img src="${target.src}">
            <i class="fas fa-angle-left change-background fa-2x llf"></i>
            <i class="fas fa-angle-right change-background fa-2x rrt"></i>

            </div>
        `;
        parent.innerHTML = inside;
        document.body.appendChild(parent);
        const icon = parent.querySelector(".far.fa-times-circle.pop");
        const hoor = parent.querySelector(".hoor");
        icon.addEventListener("click", () => {
            parent.style.display = "none";
        });
        hoor.addEventListener("click", () => {
            parent.style.display = "none";
        });
        // get all images and current index
        const allImages = document.querySelectorAll(".imgs-container img");
        let currentIndex = Array.from(allImages).indexOf(target);

        // add click event listeners to left and right icons
        const leftIcon = parent.querySelector(".fa-angle-left");
        const rightIcon = parent.querySelector(".fa-angle-right");
        leftIcon.addEventListener("click", () => {
            if (currentIndex === 0) {
            currentIndex = allImages.length - 1;
            } else {
            currentIndex--;
            }
            parent.querySelector("img").src = allImages[currentIndex].src;
        });
        rightIcon.addEventListener("click", () => {
            if (currentIndex === allImages.length - 1) {
            currentIndex = 0;
            } else {
            currentIndex++;
            }
            parent.querySelector("img").src = allImages[currentIndex].src;
        });
        }
    });
    });



/// image sliders
let sliders = document.querySelectorAll(".sliders .text");
let bullets = document.querySelectorAll(".landing .bullets li");
let leftArrow = document.querySelector(".landing .fa-angle-left");
let rightArrow = document.querySelector(".landing .fa-angle-right");

let currentIndex = 0;
let timer;

sliders[0].style.display = "block";
bullets[0].classList.add("active");
for(let i = 1;i<sliders.length;i++){
    sliders[i].style.display = "none";
}
    // bullets click
    for(let i =0;i<sliders.length;i++) {
        if(i === 0) {
            bullets[i].classList.add("active");
        }
        bullets[i].addEventListener("click",function() {
            setActiveImage(i);
        });
    }
    function setActiveImage(index) {
        for (let i = 0; i < sliders.length; i++) {
            if (i === index) {
                setTimeout(() => {
                    sliders[i].style.display = "block";
                }, 100);
                sliders[i].style.cssText = "transition:transform 1s;transform: translateX(0);";
                bullets[i].classList.add('active');
                currentIndex = i;
            } else {
                setTimeout(() => {
                sliders[i].style.cssText ="display:none;";
                }, 300);
                sliders[i].style.cssText = "transition:transform 1s;transform:translateX(125%);";
                bullets[i].classList.remove('active');
            }
        }
    }

// show slides 
function showSlides() {
    // clear all slides and bullets
    bullets.forEach((bullet) => {
        bullet.classList.remove("active");
    })
    setTimeout(() => {
        sliders.forEach((slider) => {
            slider.style.display = "none";
        });
        sliders[currentIndex].style.display = "block";
    },400);
    // show the current slide 
    bullets[currentIndex].classList.add("active");
}
function smoothNext() {
    sliders.forEach((slide) => {
        slide.style.cssText = "transition:transform 1s;transform: translateX(125%);";
    });
    sliders[currentIndex].style.cssText = "transition:transform 1s;transform: translateX(0);";
}
function smoothpPrev() {
    sliders.forEach((slide) => {
        slide.style.cssText = "transition:transform 1s;transform: translateX(-125%);";
    });
    sliders[currentIndex].style.cssText = "transition:transform 1s;transform: translateX(0);";
}
// move to the next 
function nextSliders(){
    currentIndex++;
    if(currentIndex >= sliders.length){
        currentIndex = 0;
    }
    showSlides();
}
function previousSlider() {
    currentIndex--;
    if(currentIndex < 0) {
        currentIndex = sliders.length -1;
    }
    showSlides();
}

// Handle arrow clicks
leftArrow.addEventListener('click', previousSlider);
leftArrow.addEventListener("click",smoothpPrev);
rightArrow.addEventListener('click', nextSliders);
rightArrow.addEventListener('click', smoothNext);

// timer for slides
let stimer = setInterval(() => {
    nextSliders();
    smoothNext();
    leftArrow.onclick = function() {
        clearInterval(stimer);
    }
    rightArrow.onclick = function() {
        clearInterval(stimer);
    }
    bullets.forEach((bullet) => {
        bullet.addEventListener("click",() => {
            clearInterval(stimer);
        })
    })
},3000);


// inputs
let nameInput = document.querySelector(".content form .name");
let emailInput = document.querySelectorAll(".email");


nameInput.addEventListener("blur",() => {
    const name = nameInput.value.trim();
    if(name === "") {
        nameInput.classList.add("invalid");
        nameInput.setCustomValidity("Please enter your name.");
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
        nameInput.classList.add("invalid");
        nameInput.setCustomValidity("Please enter a valid name.");
    } else {
        nameInput.classList.remove("invalid");
        nameInput.setCustomValidity("");
    }
});

emailInput.forEach((emailInput) => {
    emailInput.addEventListener("blur", () => {
        const email = emailInput.value.trim();
        if (email === "") {
            emailInput.classList.add("invalid");
            emailInput.setCustomValidity("Please enter your email address.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailInput.classList.add("invalid");
            emailInput.setCustomValidity("Please enter a valid email address.");
        } else {
            emailInput.classList.remove("invalid");
            emailInput.setCustomValidity("");
        }
    });
})

// loading 
let loader = document.querySelector(".loader");
window.onload = function() {
    loader.style.display = "none";
}

