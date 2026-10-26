(function () {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  const fromHash = {
    course: "course",
    "case-studies": "case-study",
    whitepapers: "whitepaper",
    blogs: "blog",
    "field-notes": "field-note",
    patterns: "pattern"
  };

  function applyFilter(filter) {
    buttons.forEach(function (item) {
      item.setAttribute("aria-pressed", item.getAttribute("data-filter") === filter ? "true" : "false");
    });
    cards.forEach(function (card) {
      const category = card.getAttribute("data-category");
      card.hidden = filter !== "all" && category !== filter;
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyFilter(button.getAttribute("data-filter"));
    });
  });

  const hash = window.location.hash.replace("#", "");
  if (fromHash[hash]) applyFilter(fromHash[hash]);
})();
