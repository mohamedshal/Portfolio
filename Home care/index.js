let toggle = document.querySelector(".toggle-menu");
let list = document.querySelector("ul");
let lists = document.querySelectorAll(".header ul li");
let links = document.querySelectorAll(".header ul li a");
let span = document.querySelector(".span img");
const activePage = window.location.pathname; 

toggle.addEventListener("click",function(){
    list.classList.toggle("toggle");
    lists.forEach(list => {
        list.classList.toggle("toggle-link");
    })
});

for(let i =0;i < links.length;i++){
    if(links[i].href.includes(`${activePage}`)){
        links[i].classList.add("active");
    }
}

// scroll

let scroll = false;
window.onscroll = function() {
    if(!scroll){
        scroll = true;
        if (this.scrollY >= 1000) {
            span.classList.add("show");
        } else {
        span.classList.remove("show");
        }
        scroll = false;
    }
}

span.onclick = function() {
    window.scrollTo({
        top:0,
        behavior:"smooth",
    });
}

// loading 
let loader = document.querySelector(".loader");
window.onload = function() {
    loader.style.display = "none";
}
