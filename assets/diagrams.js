(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function triggerFlow(container) {
    if (container.classList.contains("is-animating")) return;
    container.classList.add("is-animating");
    var steps = container.querySelectorAll(".flow-step");
    steps.forEach(function (el, i) {
      el.style.animationDelay = i * 0.35 + "s";
      el.classList.add("flow-step-active");
    });
  }

  function initFlows() {
    document.querySelectorAll(".flow-track").forEach(function (track) {
      if (reduceMotion) {
        track.classList.add("is-animating");
        track.querySelectorAll(".flow-step").forEach(function (s) {
          s.classList.add("flow-step-active");
        });
        return;
      }
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              triggerFlow(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(track);
    });
  }

  function initArchPulse() {
    if (reduceMotion) return;
    document.querySelectorAll(".arch-link").forEach(function (link, i) {
      link.style.animationDelay = i * 0.15 + "s";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initFlows();
      initArchPulse();
    });
  } else {
    initFlows();
    initArchPulse();
  }
})();