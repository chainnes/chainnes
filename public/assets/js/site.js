(function () {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");

  function clockTheme() {
    if (window.chainnesClockTheme) return window.chainnesClockTheme();
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  }

  function chosenTheme() {
    const clock = clockTheme();
    try {
      const stored = localStorage.getItem("chainnes-theme");
      const period = localStorage.getItem("chainnes-theme-period");
      if (period && period !== clock) {
        localStorage.removeItem("chainnes-theme");
        localStorage.removeItem("chainnes-theme-period");
      } else if ((stored === "day" || stored === "night") && period === clock) {
        return stored;
      }
    } catch (error) {
      /* Storage can be blocked; the clock still chooses the theme. */
    }
    return clock;
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "night" ? "night" : "day";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    syncToggle();
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

  applyTheme(chosenTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = currentTheme() === "night" ? "day" : "night";
      const clock = clockTheme();
      applyTheme(next);
      try {
        if (next === clock) {
          localStorage.removeItem("chainnes-theme");
          localStorage.removeItem("chainnes-theme-period");
        } else {
          localStorage.setItem("chainnes-theme", next);
          localStorage.setItem("chainnes-theme-period", clock);
        }
      } catch (error) {
        /* Storage can be blocked; the toggle still applies for this view. */
      }
    });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") applyTheme(chosenTheme());
  });
  window.setInterval(function () {
    const next = chosenTheme();
    if (next !== currentTheme()) applyTheme(next);
  }, 60000);

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
