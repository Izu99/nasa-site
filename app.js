/* 384,400 km — scroll journey.
   Without this file (or with reduced motion) the page is complete: every stop
   prints its final distance and the rail stays hidden. */
(function () {
  "use strict";

  var stops = Array.prototype.slice.call(document.querySelectorAll(".stop[data-km]"));
  var fmt = function (n) { return Math.round(n).toLocaleString("en-US"); };
  var log = function (km) { return Math.log10(km + 1); };
  var fromLog = function (l) { return Math.pow(10, l) - 1; };

  /* Fit each stop's final number to the width it has, so 100 and
     25,000,000,000 both fill the line without running off a phone. */
  function fit() {
    stops.forEach(function (s) {
      var box = s.querySelector(".stop-num");
      var num = box.querySelector(".num");
      var unit = box.querySelector(".unit");
      var text = num.textContent;
      num.style.fontSize = "";
      num.textContent = fmt(+s.dataset.km);
      var max = parseFloat(getComputedStyle(num).fontSize);
      var stacked = getComputedStyle(box).flexDirection === "column";
      var room = box.clientWidth - (stacked ? 0 : unit.offsetWidth + 12);
      var size = Math.min(max, max * room / num.scrollWidth);
      num.style.fontSize = size + "px";
      num.textContent = text;
    });
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener("resize", fit);
  fit();

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis) {
    var lenis = new Lenis({ lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -40 });
      });
    });
  }

  /* Distance rail: log scale from the pad to Voyager. */
  document.documentElement.classList.add("has-rail");
  var rail = document.querySelector(".rail");
  var dot = rail.querySelector(".rail-dot");
  var ticks = rail.querySelector(".rail-ticks");
  var maxLog = log(+stops[stops.length - 1].dataset.km);
  var names = ["Pad", "Space", "ISS", "Moon", "Webb", "Mars", "Voyager 1"];
  var tickEls = [0].concat(stops.map(function (s) { return +s.dataset.km; })).map(function (km, i) {
    var li = document.createElement("li");
    li.textContent = names[i];
    li.style.top = (log(km) / maxLog * 100) + "%";
    ticks.appendChild(li);
    return li;
  });
  var here = { km: 0 };
  function drawRail() {
    var p = log(here.km) / maxLog;
    dot.style.transform = "translateY(" + (p * rail.clientHeight - 5) + "px)";
    var idx = 0;
    stops.forEach(function (s, i) { if (here.km >= +s.dataset.km * 0.98) idx = i + 1; });
    tickEls.forEach(function (li, i) { li.classList.toggle("here", i === idx); });
  }

  ScrollTrigger.create({
    trigger: "#journey", start: "top 70%", end: "bottom 40%",
    onToggle: function (st) { rail.classList.toggle("on", st.isActive); }
  });

  /* Each number climbs from the previous stop's distance to its own,
     on a log scale, while the stop scrolls up into view. */
  var prev = 0;
  stops.forEach(function (s) {
    var num = s.querySelector(".num");
    var a = log(prev), b = log(+s.dataset.km);
    num.textContent = fmt(prev);
    ScrollTrigger.create({
      trigger: s, start: "top 85%", end: "top 25%", scrub: true,
      onUpdate: function (st) {
        var km = fromLog(a + (b - a) * st.progress);
        num.textContent = fmt(st.progress > 0.995 ? +s.dataset.km : km);
        here.km = km;
        drawRail();
      }
    });
    prev = +s.dataset.km;
  });

  drawRail();
})();
