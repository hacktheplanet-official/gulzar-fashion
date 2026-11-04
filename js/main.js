/* GULZAR FASHION — hero slider, product grid, header scroll */
(function () {
  "use strict";

  /* ---------- Header: transparent → solid on scroll ---------- */
  function initHeader() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Hero slider ---------- */
  function initHero() {
    var slides = document.querySelectorAll(".hero-slide");
    var num = document.getElementById("heroNum");
    var prev = document.getElementById("heroPrev");
    var next = document.getElementById("heroNext");
    if (!slides.length) return;
    var i = 0, timer = null;

    function pad(n) { return (n < 10 ? "0" : "") + n; }

    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("active", k === i); });
      if (num) num.textContent = pad(i + 1);
    }

    function auto() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(i + 1); }, 6000);
    }

    if (prev) prev.addEventListener("click", function () { go(i - 1); auto(); });
    if (next) next.addEventListener("click", function () { go(i + 1); auto(); });
    auto();
  }

  /* ---------- Product grid ---------- */
  function formatPrice() {
    var sale = "PKR " + PRICE_PKR.toLocaleString("en-PK");
    var old = "PKR " + OLD_PRICE_PKR.toLocaleString("en-PK");
    return '<s class="price-old">' + old + '</s><span class="price-sale">' + sale + "</span>";
  }

  function cardHTML(p) {
    return (
      '<article class="product-card">' +
        '<div class="product-media">' +
          '<img src="' + p.image + '" alt="' + p.alt + '" loading="lazy">' +
        '</div>' +
        '<div class="product-info">' +
          '<h3 class="product-name">' + p.name + "</h3>" +
          '<p class="product-details">' + p.details + "</p>" +
          '<p class="product-meta">' + p.pieces + " · " + p.fabric + "</p>" +
          '<p class="product-price">' + formatPrice() + "</p>" +
          '<button class="btn-buy" type="button" disabled title="Ordering coming soon">BUY NOW</button>' +
        '</div>' +
      "</article>"
    );
  }

  function renderGrid() {
    var grid = document.getElementById("productGrid");
    if (!grid || !Array.isArray(PRODUCTS)) return;
    grid.innerHTML = PRODUCTS.map(cardHTML).join("");
  }

  /* ---------- Trending carousel ---------- */
  function initTrending() {
    var track = document.getElementById("trendTrack");
    var dotsBox = document.getElementById("trendDots");
    var prev = document.getElementById("trendPrev");
    var next = document.getElementById("trendNext");
    var carousel = document.getElementById("trendCarousel");
    if (!track || !dotsBox || !Array.isArray(PRODUCTS) || !PRODUCTS.length) return;

    function trendCardHTML(p) {
      return (
        '<article class="trend-card">' +
          '<div class="trend-media"><img src="' + p.image + '" alt="' + p.alt + '" loading="lazy"></div>' +
          '<div class="trend-info">' +
            '<h3 class="trend-name">' + p.name + "</h3>" +
            '<p class="trend-price">' + formatPrice() + "</p>" +
          "</div>" +
        "</article>"
      );
    }
    track.innerHTML = PRODUCTS.map(trendCardHTML).join("");

    var i = 0, timer = null;
    function perView() { return window.innerWidth <= 900 ? 2 : 4; }
    function pages() { return Math.max(1, PRODUCTS.length - perView() + 1); }

    function renderDots() {
      var n = pages();
      dotsBox.innerHTML = "";
      for (var d = 0; d < n; d++) {
        (function (k) {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("aria-label", "Go to slide " + (k + 1));
          b.addEventListener("click", function () { go(k); restart(); });
          dotsBox.appendChild(b);
        })(d);
      }
    }

    function go(n) {
      var p = pages();
      i = ((n % p) + p) % p;
      var card = track.children[0];
      if (card) {
        var w = card.getBoundingClientRect().width + 24; /* + gap */
        track.style.transform = "translateX(" + -i * w + "px)";
      }
      var dots = dotsBox.children;
      for (var d = 0; d < dots.length; d++) dots[d].classList.toggle("active", d === i);
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(i + 1); }, 3500);
    }

    if (prev) prev.addEventListener("click", function () { go(i - 1); restart(); });
    if (next) next.addEventListener("click", function () { go(i + 1); restart(); });
    if (carousel) {
      carousel.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
      carousel.addEventListener("mouseleave", restart);
    }
    window.addEventListener("resize", function () { renderDots(); go(i); });

    renderDots();
    go(0);
    restart();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initHero();
    renderGrid();
    initTrending();
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
