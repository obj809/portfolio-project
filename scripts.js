// let typed = new Typed(".auto-type", {
//     strings: ["Travelling", "Making movies", "Playing sports", "Reading", "Building projects", "Creative design"],
//     typeSpeed: 150, 
//     backSpeed: 150,
//     loop: true
// })

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