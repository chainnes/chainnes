(function () {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");

  function currentTheme() {
    return root.getAttribute("data-theme") === "night" ? "night" : "day";
  }

  function syncToggle() {
    const night = currentTheme() === "night";
    const icon = document.querySelector('link[rel="icon"]');
    if (icon) {
      icon.href = night ? "/assets/images/chainnes-logo.png" : "/assets/images/chainnes-logo-day.png";
    }
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", night ? "true" : "false");
    toggle.setAttribute("aria-label", night ? "Switch to day theme" : "Switch to night theme");
  }

  syncToggle();

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = currentTheme() === "night" ? "day" : "night";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("chainnes-theme", next);
      } catch (error) {
        /* Storage can be blocked; the toggle still applies for this view. */
      }
      syncToggle();
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
