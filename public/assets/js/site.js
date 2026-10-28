(function () {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const megas = Array.prototype.slice.call(document.querySelectorAll("[data-mega]"));
  const MOBILE_MQ = window.matchMedia("(max-width: 899px)");
  const REDUCE_MQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  let hoverTimer = null;

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

  function isMobile() {
    return MOBILE_MQ.matches;
  }

  function hoverDelay() {
    return REDUCE_MQ.matches ? 0 : 120;
  }

  function panelItems(panel) {
    return Array.prototype.slice.call(
      panel.querySelectorAll("a.mega-item, a.mega-foot-link, a.nav-plain")
    );
  }

  function closeMega(mega, options) {
    const opts = options || {};
    const button = mega.querySelector("[data-mega-toggle]");
    const panel = mega.querySelector(".mega-panel");
    if (!button || !panel) return;
    mega.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    if (opts.focusToggle) button.focus();
  }

  function closeAllMegas(except, options) {
    megas.forEach(function (mega) {
      if (except && mega === except) return;
      closeMega(mega, options);
    });
  }

  function openMega(mega) {
    const button = mega.querySelector("[data-mega-toggle]");
    const panel = mega.querySelector(".mega-panel");
    if (!button || !panel) return;
    closeAllMegas(mega);
    mega.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  }

  function toggleMega(mega) {
    if (mega.classList.contains("is-open")) closeMega(mega);
    else openMega(mega);
  }

  function setNavOpen(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-locked", open && isMobile());
    if (!open) closeAllMegas();
  }

  megas.forEach(function (mega) {
    const button = mega.querySelector("[data-mega-toggle]");
    const panel = mega.querySelector(".mega-panel");
    if (!button || !panel) return;

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      toggleMega(mega);
    });

    button.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openMega(mega);
        const items = panelItems(panel);
        if (items[0]) items[0].focus();
      }
      if (event.key === "ArrowUp" && mega.classList.contains("is-open")) {
        event.preventDefault();
        closeMega(mega);
      }
    });

    panel.addEventListener("keydown", function (event) {
      const items = panelItems(panel);
      if (!items.length) return;
      const index = items.indexOf(document.activeElement);

      if (event.key === "Escape") {
        event.preventDefault();
        closeMega(mega, { focusToggle: true });
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = index < 0 ? items[0] : items[(index + 1) % items.length];
        next.focus();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (index <= 0) {
          closeMega(mega, { focusToggle: true });
        } else {
          items[index - 1].focus();
        }
      }

      if (event.key === "Home") {
        event.preventDefault();
        items[0].focus();
      }

      if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1].focus();
      }
    });

    mega.addEventListener("mouseenter", function () {
      if (isMobile()) return;
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(function () {
        openMega(mega);
      }, hoverDelay());
    });

    mega.addEventListener("mouseleave", function () {
      if (isMobile()) return;
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(function () {
        closeMega(mega);
      }, hoverDelay());
    });
  });

  document.addEventListener("click", function (event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("[data-nav-toggle]")) return;

    const openMegaEl = document.querySelector("[data-mega].is-open");
    if (openMegaEl && !target.closest("[data-mega]")) {
      closeAllMegas();
    }
    if (isMobile() && nav && nav.classList.contains("is-open") && !target.closest("[data-site-nav]")) {
      setNavOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    const openMegaEl = document.querySelector("[data-mega].is-open");
    if (openMegaEl) {
      closeMega(openMegaEl, { focusToggle: true });
      return;
    }
    if (nav && nav.classList.contains("is-open")) {
      setNavOpen(false);
      if (navToggle) navToggle.focus();
    }
  });

  if (navToggle && nav) {
    navToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      setNavOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (isMobile()) setNavOpen(false);
        closeAllMegas();
      });
    });
  }

  function onBreakpointChange() {
    window.clearTimeout(hoverTimer);
    closeAllMegas();
    setNavOpen(false);
  }

  if (MOBILE_MQ.addEventListener) {
    MOBILE_MQ.addEventListener("change", onBreakpointChange);
  } else if (MOBILE_MQ.addListener) {
    MOBILE_MQ.addListener(onBreakpointChange);
  }
})();
