// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    let typedInstance; // Declare a variable to hold the Typed.js instance

    // Function to check if the "About Me" section is in the viewport
    function isAboutMeVisible() {
        const aboutMeSection = document.getElementById('about');
        if (!aboutMeSection) {
            console.error('The "About Me" section could not be found in the DOM.');
            return false;
        }
        const rect = aboutMeSection.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Function to initialize Typed.js when the "About Me" section is visible
    function initTyped() {
        if (!document.querySelector("#typed-text")) {
            console.error('The "typed-text" element could not be found in the DOM.');
            return;
        }
        typedInstance = new Typed("#typed-text", {
            strings: ['<span class="text-color-off-white">Nice to meet you, I\'m </span><span class="text-color-five">Oliver. </span>'],
            typeSpeed: 100,
            backSpeed: 50,
            loop: false,
            contentType: 'html',
            cursorChar: '_',  // Use underscore as the cursor
            showCursor: true,
            onComplete: function(self) {
                let cursorElement = document.querySelector('.typed-cursor');
                if (cursorElement) {
                    cursorElement.classList.add('slow');
                }
            }
        });
    }
    

    // Function to destroy Typed.js instance when the "About Me" section is not visible
    function destroyTyped() {
        if (typedInstance) {
            typedInstance.destroy();
            typedInstance = undefined; // Reset the variable
        }
    }

    // Check if the "About Me" section is initially visible
    if (isAboutMeVisible()) {
        initTyped();
    }

    // Event listener for scrolling
    document.addEventListener('scroll', function() {
        const currentlyVisible = isAboutMeVisible();
        if (currentlyVisible && !typedInstance) {
            initTyped();
        } else if (!currentlyVisible && typedInstance) {
            destroyTyped();
        }
    });
});

document.addEventListener("scroll", function() {
    var projectDivs = document.querySelectorAll('.project-div');
    var imageContainers = document.querySelectorAll('.image-container');

    var triggerHeight = window.innerHeight / 2;

    projectDivs.forEach(function(div) {
        if (div && window.scrollY + triggerHeight > div.offsetTop) {
            div.classList.add('active');
        } else {
            div.classList.remove('active');
        }
    });

    imageContainers.forEach(function(container) {
        if (container && window.scrollY + triggerHeight > container.offsetTop) {
            container.classList.add('active');
        } else {
            container.classList.remove('active');
        }
    });
});

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

document.addEventListener("scroll", function() {
    var skillsTitle = document.querySelector('#skillsTitle');
    if (!skillsTitle) {
        console.error('The "skillsTitle" element could not be found in the DOM.');
        return;
    }
    var triggerHeight = window.innerHeight / 2;

    if (window.scrollY + triggerHeight > skillsTitle.offsetTop) {
        skillsTitle.classList.add('active');
    } else {
        skillsTitle.classList.remove('active');
    }
});
