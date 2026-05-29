(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();

      if (prefersReducedMotion) {
        target.scrollIntoView();
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (id === "#about" && target.tabIndex === -1) {
        target.focus({ preventScroll: true });
      }
    });
  });

  ["about", "book"].forEach(function (id) {
    var section = document.getElementById(id);
    if (section && !section.hasAttribute("tabindex")) {
      section.setAttribute("tabindex", "-1");
    }
  });
})();
