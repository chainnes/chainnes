(function () {
  const canvas = document.getElementById("node-field");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    let nodes = [];
    let frameId = 0;
    let running = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.min(46, Math.floor(width / 32)));
      nodes = Array.from({ length: count }, function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32
        };
      });
    }

    function paint() {
      if (!running) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      ctx.clearRect(0, 0, width, height);
      const night = document.documentElement.getAttribute("data-theme") === "night";
      const rgb = night ? "62, 224, 197" : "30, 77, 58";

      nodes.forEach(function (node) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 150) {
            ctx.strokeStyle = "rgba(" + rgb + "," + ((1 - dist / 150) * 0.35) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(function (node) {
        ctx.fillStyle = "rgba(" + rgb + ",0.9)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, night ? 2.4 : 2.1, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = window.requestAnimationFrame(paint);
    }

    resize();
    paint();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(frameId);
      } else if (!running) {
        running = true;
        paint();
      }
    });
  }

  document.querySelectorAll("[data-carousel-root]").forEach(function (root) {
    const scroller = root.querySelector("[data-carousel]");
    const previous = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    if (!scroller) return;

    function distance() {
      const card = scroller.querySelector(".concept");
      if (!card) return 300;
      const styles = window.getComputedStyle(scroller);
      const gap = parseFloat(styles.columnGap || styles.gap) || 14;
      return card.getBoundingClientRect().width + gap;
    }

    function scrollCarousel(direction) {
      scroller.scrollBy({ left: direction * distance(), behavior: reduceMotion ? "auto" : "smooth" });
    }

    if (previous) previous.addEventListener("click", function () { scrollCarousel(-1); });
    if (next) next.addEventListener("click", function () { scrollCarousel(1); });
  });

  const marquee = document.querySelector("[data-marquee]");
  const toggle = document.querySelector("[data-marquee-toggle]");
  if (reduceMotion && toggle) toggle.hidden = true;
  if (!marquee || reduceMotion) return;

  const row = marquee.querySelector(".ally-row");
  if (!row) return;
  const clone = row.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  clone.querySelectorAll("a").forEach(function (link) {
    link.tabIndex = -1;
  });
  const track = document.createElement("div");
  track.className = "marquee-track";
  track.appendChild(row);
  track.appendChild(clone);
  marquee.appendChild(track);
  marquee.classList.add("is-running");

  if (toggle) {
    toggle.addEventListener("click", function () {
      const paused = track.classList.toggle("is-paused");
      toggle.setAttribute("aria-pressed", paused ? "true" : "false");
      toggle.textContent = paused ? "Play" : "Pause";
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        track.classList.toggle("is-offscreen", !entry.isIntersecting);
      });
    }, { threshold: 0.15 });
    observer.observe(marquee);
  }

  document.addEventListener("visibilitychange", function () {
    track.classList.toggle("is-offscreen", document.hidden);
  });
})();
