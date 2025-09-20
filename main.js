let lists = document.querySelectorAll("header .container ul li");
let links = document.querySelectorAll("header .container ul li a");
let home = document.querySelector(".home");
let about = document.querySelector(".about");
let portfolio = document.querySelector(".portfolio");
let contact = document.querySelector(".contact");

let skills = Array.from(document.querySelectorAll(".progress"));
let countPorgressSkills = Array.from(document.querySelectorAll(".progress h3"));
let animated = false; // flag
// loading
let loader = document.querySelector(".loader");
document.addEventListener("DOMContentLoaded", function () {
	loader.style.display = "none";
});
// intersection observer
const intersectors = document.querySelectorAll(".intersect");

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		entry.target.classList.toggle("showed", entry.isIntersecting);
		if (entry.isIntersecting) observer.unobserve(entry.target);
	});
});
intersectors.forEach(intersector => {
	observer.observe(intersector);
});

function removeActive() {
	lists.forEach(list => {
		list.classList.remove("active");
	});
	links.forEach(link => {
		link.classList.remove("active");
	});
}
window.onscroll = function () {
	if (Math.ceil(window.scrollY) >= home.offsetTop && Math.ceil(window.scrollY) < about.offsetTop) {
		removeActive();
		lists[0].classList.add("active");
		links[0].classList.add("active");
	} else if (
		Math.ceil(window.scrollY) >= about.offsetTop &&
		Math.ceil(window.scrollY) < portfolio.offsetTop
	) {
		removeActive();
		lists[1].classList.add("active");
		links[1].classList.add("active");
		if (!animated) {
			// loop on each skill
			animateSkills();
			countProgress();
			animated = true;
		}
	} else if (
		Math.ceil(window.scrollY) >= portfolio.offsetTop &&
		Math.ceil(window.scrollY) < contact.offsetTop
	) {
		removeActive();
		lists[2].classList.add("active");
		links[2].classList.add("active");
	} else {
		removeActive();
		lists[3].classList.add("active");
		links[3].classList.add("active");
	}

	// scroll to top (._.)
	let circleProgress = document.querySelector(".contact .container .circle-progress");
	if (window.scrollY >= 600) {
		circleProgress.classList.add("moveit");
	} else {
		circleProgress.classList.remove("moveit");
	}
	circleProgress.onclick = function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let scrollTop = document.documentElement.scrollTop;
	circleProgress.style.background = `conic-gradient(var(--neon-yellow) ${
		3.6 * ((scrollTop / height) * 100)
	}deg, #fff 0deg)`;
};
/// toggle

let theList = document.querySelector("header .container ul");
let toggle = document.querySelector("header .container .toggle");
let spans = document.querySelectorAll("header .container .toggle span");
toggle.onclick = function () {
	theList.classList.toggle("tog");
	spans[1].classList.toggle("hid");
	spans[0].classList.toggle("mov1");
	spans[2].classList.toggle("mov2");
};

// skills
function animateSkills() {
	skills.forEach(skill => {
		let value = 0;
		let target = parseInt(getComputedStyle(skill).getPropertyValue("--i"));
		let step = Math.ceil(target / 50); // نقسم التارجت على 50 خطوة بس علشان يبقى سريع وسلس
		let counter = setInterval(() => {
			value += step;
			if (value >= target) {
				value = target; // متعديش الهدف
				clearInterval(counter);
			}
			skill.style.background = `conic-gradient(var(--clr) ${3.6 * value}deg, #eee 0deg)`;
		}, 50); // interval صغير
	});
}

function countProgress() {
	countPorgressSkills.forEach(skill => {
		let value = 0;
		let target = parseInt(getComputedStyle(skill).getPropertyValue("--i"));
		let step = Math.ceil(target / 50); // 50 خطوة تقريباً
		let counter = setInterval(() => {
			value += step;
			if (value >= target) {
				value = target;
				clearInterval(counter);
			}
			skill.innerHTML = `${value}<span>%</span>`;
		}, 50);
	});
}

// slider portfolio
let closeBtn = document.querySelector(".overlay .box p");
let projects = Array.from(document.querySelectorAll(".projects .all"));
let overlay = document.querySelector(".overlay");
let imagesProjects = Array.from(document.querySelectorAll(".projects .all .image img"));
let imageSlider = document.querySelector(".overlay .image img");
let viewBtn = document.querySelector(".overlay a");
let viewBtns = Array.from(document.querySelectorAll(".projects a"));
let current = 0;
projects.forEach((project, index) => {
	project.addEventListener("click", function () {
		current = index;
		imageSlider.src = imagesProjects[current].src;
		viewBtn.href = viewBtns[current].href;
		overlay.classList.remove("disabled");
	});
});
overlay.addEventListener("click", function (e) {
	if (e.target.className == "overlay") {
		overlay.classList.add("disabled");
	}
});
closeBtn.addEventListener("click", function () {
	overlay.classList.add("disabled");
});
// moving slider
let rightBtn = document.querySelector(".overlay #right");
let leftBtn = document.querySelector(".overlay #left");
rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);
function moveRight() {
	if (current >= projects.length - 1) {
		current = 0;
	} else {
		current++;
	}
	imageSlider.src = imagesProjects[current].src;
	viewBtn.href = viewBtns[current].href;
}
function moveLeft() {
	if (current <= 0) {
		current = projects.length - 1;
	} else {
		current--;
	}
	imageSlider.src = imagesProjects[current].src;
	viewBtn.href = viewBtns[current].href;
}

// check message
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

form.addEventListener("submit", async function (e) {
	e.preventDefault();

	const name = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();

	// Regex rules
	const nameRegex = /^[A-Za-z\s]{2,30}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Validate name
	if (!nameRegex.test(name)) {
		statusMsg.textContent = "⚠️ Please enter a valid name (letters and spaces only).";
		statusMsg.style.color = "red";
		return;
	}

	// Validate email
	if (!emailRegex.test(email)) {
		statusMsg.textContent = "⚠️ Please enter a valid email address.";
		statusMsg.style.color = "red";
		return;
	}

	statusMsg.textContent = "Sending... ⏳";
	statusMsg.style.color = "blue";

	try {
		let response = await fetch(form.action, {
			method: form.method,
			body: new FormData(form),
			headers: { Accept: "application/json" },
		});

		if (response.ok) {
			statusMsg.textContent = "✅ Your message has been sent successfully!";
			statusMsg.style.color = "green";
			form.reset();
		} else {
			statusMsg.textContent = "❌ Oops! Something went wrong. Please try again.";
			statusMsg.style.color = "red";
		}
	} catch (error) {
		statusMsg.textContent = "⚠️ Network error. Please check your connection.";
		statusMsg.style.color = "red";
	}
});
