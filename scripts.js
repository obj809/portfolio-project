// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const qs  = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];
  const on  = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
  const raf  = (fn) => requestAnimationFrame(fn);

  const $aboutSection   = qs("#about");
  const $typedTarget    = qs("#typed-text");
  const $projectTitle   = qs("#typed-project-title");
  const $skillsTitle    = qs("#typed-skills-title");
  const $firstPage      = qs(".first_page");
  const $overlay        = qs(".black-overlay");
  const $navbar         = qs(".navbar");
  const $navbarCollapse = qs("#navbarNav");
  const $navbarToggler  = qs(".navbar-toggler");

  let typedStarted = false;
  function initTypedOnce() {
    if (typedStarted || !$typedTarget) return;
    if (typeof Typed !== "function") return;
    new Typed("#typed-text", {
      strings: [
        '<span class="text-color-off-white">Nice to meet you, I\'m </span><span class="text-color-five">Oliver. </span>',
      ],
      typeSpeed: 75,
      backSpeed: 50,
      loop: false,
      contentType: "html",
      cursorChar: "_",
      showCursor: true,
      onComplete: () => {
        const cur = qs(".typed-cursor");
        if (cur) cur.classList.add("slow");
      },
    });
    typedStarted = true;
  }

  if ($aboutSection) {
    const aboutObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) initTypedOnce(); }),
      { root: null, threshold: 0.1 }
    );
    aboutObserver.observe($aboutSection);
  }

  function toggleActive(el, shouldActivate) {
    const inSkills = !!el.closest("#skills");
    if (inSkills && document.body.classList.contains("game-active")) return;
    el.classList.toggle("active", !!shouldActivate);
  }

  function updateSlideIns() {
    const trigger = window.innerHeight * 0.5;
    const slideEls = [
      ...qsa(".project-div"),
      ...qsa(".image-container"),
    ];
    slideEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      toggleActive(el, top < trigger);
    });
    if ($projectTitle) {
      toggleActive($projectTitle, $projectTitle.getBoundingClientRect().top < trigger);
    }
    if ($skillsTitle) {
      toggleActive($skillsTitle, $skillsTitle.getBoundingClientRect().top < trigger);
    }
  }

  let ticking = false;
  function onScrollTick() {
    if (ticking) return;
    ticking = true;
    raf(() => { updateSlideIns(); updateOverlayOpacity(); ticking = false; });
  }

  on(window, "load",  updateSlideIns);
  on(window, "resize", updateSlideIns);
  on(document, "scroll", onScrollTick, { passive: true });
  on(window, "game:end", updateSlideIns);

  function updateOverlayOpacity() {
    if (!$firstPage || !$overlay) return;
    const firstPageHeight = $firstPage.offsetHeight || 1;
    const scrollTop = window.scrollY || 0;
    let opacity = scrollTop / (firstPageHeight / 0.9);
    $overlay.style.opacity = Math.max(0, Math.min(1, opacity));
  }

  updateOverlayOpacity();

  qsa(".navbar-nav .nav-item").forEach((item) => {
    on(item, "mouseenter", () => {
      const prev = item.previousElementSibling;
      const next = item.nextElementSibling;
      if (prev) {
        prev.classList.add("scale-small");
        if (prev.previousElementSibling) prev.previousElementSibling.classList.add("scale-smallest");
      }
      if (next) {
        next.classList.add("scale-small");
        if (next.nextElementSibling) next.nextElementSibling.classList.add("scale-smallest");
      }
    });
    on(item, "mouseleave", () => {
      qsa(".navbar-nav .nav-item").forEach((n) => n.classList.remove("scale-small", "scale-smallest"));
    });
  });

  on(document, "click", (evt) => {
    if (!$navbarCollapse || !$navbarToggler) return;
    const isOpen = $navbarCollapse.classList.contains("show");
    if (!isOpen) return;
    const clickedInside = $navbarCollapse.contains(evt.target);
    const clickedToggler = $navbarToggler.contains(evt.target);
    if (!clickedInside && !clickedToggler) {
      const bsCollapse = new bootstrap.Collapse($navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  });

  (function setupAutoHideNavbar() {
    if (!$navbar) return;
    let hideTimer;
    const showNavbar = () => {
      $navbar.classList.add("visible");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => $navbar.classList.remove("visible"), 1500);
    };
    on(window, "mousemove", showNavbar);
    setTimeout(() => $navbar.classList.remove("visible"), 1500);
  })();
});
