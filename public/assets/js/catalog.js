(function () {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.getAttribute("data-filter");
      buttons.forEach(function (item) {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      cards.forEach(function (card) {
        const category = card.getAttribute("data-category");
        card.hidden = filter !== "all" && category !== filter;
      });
    });
  });
})();
