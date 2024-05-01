// scripts.js

let typed = new Typed(".auto-type", {
    strings: ["_"],
    typeSpeed: 200,
    backSpeed: 1000,
    loop: true
});

document.addEventListener("scroll", function() {
    var projectDivs = document.querySelectorAll('.project-div');
    var imageContainers = document.querySelectorAll('.image-container');

    var triggerHeight = window.innerHeight / 2;

    projectDivs.forEach(function(div) {
        if (window.scrollY + triggerHeight > div.offsetTop) {
            div.classList.add('active');
        } else {
            div.classList.remove('active');
        }
    });

    imageContainers.forEach(function(container) {
        if (window.scrollY + triggerHeight > container.offsetTop) {
            container.classList.add('active');
        } else {
            container.classList.remove('active');
        }
    });
});

// strings: ["Travelling", "Filming", "Playing sport", "Assorted reading", "Building projects", "Creative design"]


// NavBar Hover

document.querySelectorAll('.navbar-nav .nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Immediate previous sibling
        if (item.previousElementSibling) {
            item.previousElementSibling.classList.add('scale-small');
            // Neighbor once removed on the left
            if (item.previousElementSibling.previousElementSibling) {
                item.previousElementSibling.previousElementSibling.classList.add('scale-smallest');
            }
        }
        // Immediate next sibling
        if (item.nextElementSibling) {
            item.nextElementSibling.classList.add('scale-small');
            // Neighbor once removed on the right
            if (item.nextElementSibling.nextElementSibling) {
                item.nextElementSibling.nextElementSibling.classList.add('scale-smallest');
            }
        }
    });

    item.addEventListener('mouseleave', () => {
        // Remove 'scale-small' and 'scale-smallest' from all nav items on mouse leave
        document.querySelectorAll('.navbar-nav .nav-item').forEach(navItem => {
            navItem.classList.remove('scale-small');
            navItem.classList.remove('scale-smallest');
        });
    });
});


// Skills Title 

document.addEventListener("scroll", function() {
    var skillsTitle = document.querySelector('#skillsTitle');
    var triggerHeight = window.innerHeight / 2;

    if (window.scrollY + triggerHeight > skillsTitle.offsetTop) {
        skillsTitle.classList.add('active');
    } else {
        skillsTitle.classList.remove('active');
    }
});