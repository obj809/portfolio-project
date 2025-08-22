// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    let typedInitialized = false;


    function isAboutMeVisible() {
        const aboutMeSection = document.getElementById('about');
        if (!aboutMeSection) {
            console.error('The "About Me" section could not be found in the DOM.');
            return false;
        }
        const rect = aboutMeSection.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (
            rect.top >= 0 && rect.top < windowHeight
        );
    }

    function initTyped() {
        if (!document.querySelector("#typed-text")) {
            console.error('The "typed-text" element could not be found in the DOM.');
            return;
        }
        new Typed("#typed-text", {
            strings: ['<span class="text-color-off-white">Nice to meet you, I\'m </span><span class="text-color-five">Oliver. </span>'],
            typeSpeed: 75,
            backSpeed: 50,
            loop: false,
            contentType: 'html',
            cursorChar: '_', 
            showCursor: true,
            onComplete: function(self) {
                let cursorElement = document.querySelector('.typed-cursor');
                if (cursorElement) {
                    cursorElement.classList.add('slow');
                }
            }
        });
        typedInitialized = true;
    }
    

    document.addEventListener('scroll', function() {
        if (isAboutMeVisible() && !typedInitialized) {
            initTyped();
        }
    });

    if (isAboutMeVisible()) {
        initTyped();
    }
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
        if (item.previousElementSibling) {
            item.previousElementSibling.classList.add('scale-small');
            if (item.previousElementSibling.previousElementSibling) {
                item.previousElementSibling.previousElementSibling.classList.add('scale-smallest');
            }
        }
        if (item.nextElementSibling) {
            item.nextElementSibling.classList.add('scale-small');
            if (item.nextElementSibling.nextElementSibling) {
                item.nextElementSibling.nextElementSibling.classList.add('scale-smallest');
            }
        }
    });

    item.addEventListener('mouseleave', () => {
        document.querySelectorAll('.navbar-nav .nav-item').forEach(navItem => {
            navItem.classList.remove('scale-small');
            navItem.classList.remove('scale-smallest');
        });
    });
});

document.addEventListener("scroll", function() {
    var skillsTitle = document.querySelector('#typed-skills-title');
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

document.addEventListener("scroll", function() {
    var projectTitle = document.querySelector('#typed-project-title');
    var skillsTitle = document.querySelector('#typed-skills-title');
    var triggerHeight = window.innerHeight / 2;

    if (projectTitle) {
        if (window.scrollY + triggerHeight > projectTitle.offsetTop) {
            projectTitle.classList.add('active');
        } else {
            projectTitle.classList.remove('active');
        }
    }

    if (skillsTitle) {
        if (window.scrollY + triggerHeight > skillsTitle.offsetTop) {
            skillsTitle.classList.add('active');
        } else {
            skillsTitle.classList.remove('active');
        }
    }
});


function updateOverlayOpacity() {
    const firstPage = document.querySelector('.first_page');
    const overlay = document.querySelector('.black-overlay');

    const firstPageHeight = firstPage.offsetHeight;

    const scrollTop = window.scrollY;

    let opacity = scrollTop / (firstPageHeight/0.9);

    opacity = Math.max(0, Math.min(1, opacity));

    overlay.style.opacity = opacity;
}

document.addEventListener("DOMContentLoaded", updateOverlayOpacity);

document.addEventListener("scroll", updateOverlayOpacity);

document.addEventListener('click', function(event) {
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target) && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        bsCollapse.hide();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    let timeout;

    function showNavbar() {
        navbar.classList.add('visible');
        clearTimeout(timeout);
        timeout = setTimeout(hideNavbar, 1500);
    }
    function hideNavbar() {
        navbar.classList.remove('visible');
    }
    window.addEventListener('mousemove', showNavbar);
    timeout = setTimeout(hideNavbar, 1500);
});












/* ============================================
   SKILL TILE GAME
   ============================================ */
   (function () {
    function getSectionById(id) {
      const exactSection = document.querySelector(`section#${id}`);
      if (exactSection) return exactSection;
  
      const first = document.getElementById(id);
      if (first && first.tagName !== 'SECTION') {
        let n = first.nextElementSibling;
        while (n) {
          if (n.tagName === 'SECTION') return n;
          n = n.nextElementSibling;
        }
      }
      return null;
    }
  
    function computeGameBounds() {
      const projectsSection = getSectionById('projects');
      const skillsSection   = getSectionById('skills');
      if (!projectsSection || !skillsSection) return null;
  
      const projTop = projectsSection.getBoundingClientRect().top + window.scrollY;
      const skillsBottom = skillsSection.getBoundingClientRect().bottom + window.scrollY;
  
      return { top: projTop, bottom: skillsBottom, height: skillsBottom - projTop };
    }
  
    function ensureGameZone(bounds) {
      let zone = document.getElementById('skill-game-zone');
      if (!zone) {
        zone = document.createElement('div');
        zone.id = 'skill-game-zone';
        document.body.appendChild(zone);
      }
      zone.style.top = bounds.top + 'px';
      zone.style.height = bounds.height + 'px';
      return zone;
    }
  
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  
    let drag = null;
  
    function onCardMouseDown(e) {
        if (e.button !== 0) return;
        e.preventDefault();
      
        const card = e.currentTarget;
      
        const bounds = computeGameBounds();
        if (!bounds) return;
      
        const zone = ensureGameZone(bounds);
      
        const srcRect = card.getBoundingClientRect();
      
        const clone = card.cloneNode(true);
        clone.classList.add('skill-drag-clone', 'picked-up');
        clone.style.width = srcRect.width + 'px';
        clone.style.height = srcRect.height + 'px';
      
        zone.appendChild(clone);
        card.classList.add('skill-original-ghost');
        document.body.classList.add('dragging-skill');
      
        function placeAtOriginal() {
          const zoneRect = zone.getBoundingClientRect();
          const zoneLeft = zoneRect.left + window.scrollX;
          const zoneTop  = zoneRect.top + window.scrollY;
      
          const localLeft = srcRect.left + window.scrollX - zoneLeft;
          const localTop  = srcRect.top + window.scrollY - zoneTop;
      
          clone.style.transform = `translate(${localLeft}px, ${localTop}px)`;
        }
        placeAtOriginal();
      
        const startPageX = e.pageX;
        const startPageY = e.pageY;
        const offsetX = startPageX - (srcRect.left + window.scrollX);
        const offsetY = startPageY - (srcRect.top + window.scrollY);
      
        function positionClone(pageX, pageY) {
          const zoneRect   = zone.getBoundingClientRect();
          const zoneLeft   = zoneRect.left + window.scrollX;
          const zoneTop    = zoneRect.top + window.scrollY;
          const zoneRight  = zoneLeft + zoneRect.width;
          const zoneBottom = zoneTop + zoneRect.height;
      
          const desiredLeft = pageX - offsetX;
          const desiredTop  = pageY - offsetY;
      
          const maxLeft = zoneRight - srcRect.width;
          const maxTop  = zoneBottom - srcRect.height;
      
          const clampedLeft = Math.max(zoneLeft, Math.min(maxLeft, desiredLeft));
          const clampedTop  = Math.max(zoneTop,  Math.min(maxTop,  desiredTop));
      
          const localLeft = clampedLeft - zoneLeft;
          const localTop  = clampedTop  - zoneTop;
      
          clone.style.transform = `translate(${localLeft}px, ${localTop}px)`;
        }
      
        drag = { card, clone, zone, positionClone };
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseup', onMouseUp, { once: true });
      }
      
      function endDrag() {
        if (!drag) return;
        const { card, clone } = drag;
      
        if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
        card.classList.remove('skill-original-ghost');
        document.body.classList.remove('dragging-skill');
      
        window.removeEventListener('mousemove', onMouseMove);
        drag = null;
      }
  
    function onMouseMove(e) {
      if (!drag) return;
      drag.positionClone(e.pageX, e.pageY);
    }
  
    function onMouseUp() {
      endDrag();
    }
  
    function endDrag() {
      if (!drag) return;
      const { card, clone } = drag;
  
      clone.remove();
      card.classList.remove('skill-original-ghost');
      document.body.classList.remove('dragging-skill');
  
      window.removeEventListener('mousemove', onMouseMove);
      drag = null;
    }
  
    function bindSkillCards(root = document) {
      root.querySelectorAll('.img-background-card').forEach((el) => {
        if (!el.__skillDragBound) {
          el.addEventListener('mousedown', onCardMouseDown);
          el.addEventListener('dragstart', (ev) => ev.preventDefault());
          el.__skillDragBound = true;
        }
      });
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      bindSkillCards();
    });
  
    window.addEventListener('resize', () => {
      if (!drag) return;
      const bounds = computeGameBounds();
      if (!bounds) return;
      ensureGameZone(bounds);
    });
  })();
  

  