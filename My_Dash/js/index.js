let heading = document.querySelector(".heading");
let styles = window.getComputedStyle(heading,'::after');
let page = document.querySelector(".page");


// loading 
let loader = document.querySelector(".loader");
window.onload = function() {
    loader.style.display = "none";
    profilspan.style.width = profilspan.dataset.width;
}

let dark = document.querySelector(".icons #ico");
if(localStorage.length > 0) {
    document.body.classList =  localStorage.getItem("change-body");
    document.body.classList.remove("{}");
    dark.classList = localStorage.getItem("change-color");
}
if (!dark.classList.contains("fas") && !dark.classList.contains("fa-adjust")) {
    dark.classList.add("fas");
    dark.classList.add("fa-adjust");
}
dark.addEventListener("click", function() {
    changeAll(document.body,dark)
});
function changeAll(a,b) {
    a.classList.toggle("change-all");
    localStorage.setItem("change-body",a.classList);
    b.classList.toggle("lchange");
    localStorage.setItem("change-color",b.classList);
}

/// filter tasks
let tasks = document.querySelectorAll(".tasks .task-row");
let litters = document.querySelectorAll(".tasks .task-row i");
let restores = document.querySelectorAll(".tasks .rstr");
litters.forEach((litter) => {
    litter.addEventListener("click", filterTasks);
})
restores.forEach((restore) => {
    restore.addEventListener("click", filterTasks)
})
let data = [];
const savedData = localStorage.getItem("icon");
if (savedData) {
    data = JSON.parse(savedData);
}
function filterTasks() {
    tasks.forEach((task) => {
        if (task.className.includes(this.dataset.ltter)) {
            task.classList.add("done");
            if(data.includes(task.dataset.id)) {
                return 1;
            }else{
                data.push(task.dataset.id);
            }
        } else if (task.className.includes(this.dataset.rest)) {
            task.classList.remove("done");
            data = data.filter((id) => id !== task.dataset.id);
        }
    });
    localStorage.setItem("icon", JSON.stringify(data));
}

function applySavedState() {
    tasks.forEach((task) => {
        const taskId = task.dataset.id;
        if (data.includes(taskId)) {
            task.classList.add("done");
        } else {
            task.classList.remove("done");
        }
    });
}
// Call applySavedState() when the page loads
window.addEventListener("load", applySavedState);

// project progress

let profilspan = document.querySelector(".profile-page .spant");
let project = document.querySelectorAll(".projects-page .project");
let projectspans = document.querySelectorAll(".project .prospan");
project.forEach((proj) => {
    proj.onmouseover = () => {
        projectspans.forEach((prospan) => {
            if(proj.className.includes(prospan.dataset.contact)) {
                prospan.style.width = prospan.dataset.width;
            }
        })
    }
})

// counter progress
let ticket = document.querySelector(".tickets");
let tickets = document.querySelectorAll(".tickets span");
let target = document.querySelector(".targets");
let targets = document.querySelectorAll(".targets .spant");
let started = false;
window.onscroll = function() {
    if(window.scrollY >= ticket.offsetTop - 100) {
        if(!started){
            tickets.forEach((ticket) => {
                let goal = +ticket.dataset.target;
                let counter = setInterval(() => {
                   ticket.textContent++;
                   if(ticket.textContent == goal){
                    clearInterval(counter);
                   }
                }, 1000 / goal);
            })
        }
        started = true; 
    }
    if(window.scrollY >= target.offsetTop - 100) {
        targets.forEach((target) => {
            target.style.width = target.dataset.width;
        })
    }
}