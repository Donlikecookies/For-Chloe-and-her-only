(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  // Escape text and turn \n into <br>
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  const br = (s = "") => esc(s).replace(/\n/g, "<br>");

  /* ---------- Cover ---------- */
  document.title = SITE.title;
  $("#coverEyebrow").textContent = SITE.eyebrow || "";
  $("#coverTitle").textContent = SITE.title || "";
  $("#coverSubtitle").textContent = SITE.subtitle || "";

  /* ---------- Counter ---------- */
  let daysTogether = 0;

  function renderCounter() {
    const box = $("#counter");
    if (!SITE.startDate) { box.remove(); return; }
    const start = new Date(SITE.startDate + "T00:00:00");
    daysTogether = Math.max(0, Math.floor((Date.now() - start) / 86400000));
    box.innerHTML = `
      <p class="counter__label">Together for</p>
      <p class="counter__num" id="counterNum">0</p>
      <p class="counter__label">days, and counting</p>`;
  }

  function startCounter() {
    const el = $("#counterNum");
    if (!el) return;
    const duration = 2200;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(daysTogether * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

    /* ---------- Moments + galleries ---------- */
  const galleries = []; // every gallery on the page, so the viewer knows which list to flip through

  const isVideo = (g) =>
    g.type === "video" || /\.(mp4|mov|m4v|webm)$/i.test(g.src || "");

  // Builds the tiles for one gallery and registers it
  function galleryTiles(list) {
    const gi = galleries.push(list) - 1;
    return list
      .map((g, i) => {
        const media = isVideo(g)
          ? `<video src="${esc(g.src)}"${g.poster ? ` poster="${esc(g.poster)}"` : ""} data-g="${gi}" data-i="${i}" muted loop playsinline preload="metadata"></video>`
          : `<img src="${esc(g.src)}" alt="${esc(g.caption || "Photo " + (i + 1))}" data-g="${gi}" data-i="${i}" loading="lazy">`;
        return `
          <figure class="reveal">
            ${media}
            ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
          </figure>`;
      })
      .join("");
  }

  function mediaHTML(m) {
    if (m.type === "video") {
      const poster = m.poster ? ` poster="${esc(m.poster)}"` : "";
      return `<video controls playsinline preload="metadata"${poster}>
        <source src="${esc(m.src)}" type="video/mp4">
      </video>`;
    }
    return `<img src="${esc(m.src)}" alt="${esc(m.alt || m.title || "")}" loading="lazy">`;
  }

  function momentHTML(m, i) {
    // A gallery inside the story
    if (m.type === "gallery") {
      return `
        <section class="moment">
          <div class="moment__inner">
            ${m.title ? `<h2 class="section-title reveal">${esc(m.title)}</h2>` : ""}
            <div class="gallery">${galleryTiles(m.items || [])}</div>
            ${m.text ? `<div class="moment__text reveal"><p class="moment__body">${br(m.text)}</p></div>` : ""}
          </div>
        </section>`;
    }

    const layout = m.type === "pair" ? "full" : (m.layout || "full");
    const flip = layout === "split" && i % 2 === 1 ? " flip" : "";

    const media = m.type === "pair"
      ? `<div class="pair">${m.items
          .map((it) => `<div class="media-frame">${mediaHTML(it)}</div>`)
          .join("")}</div>`
      : `<div class="media-frame">${mediaHTML(m)}</div>`;

    const text = `
      <div class="moment__text">
        ${m.date ? `<p class="moment__date">${esc(m.date)}</p>` : ""}
        ${m.title ? `<h2 class="moment__title">${esc(m.title)}</h2>` : ""}
        ${m.text ? `<p class="moment__body">${br(m.text)}</p>` : ""}
      </div>`;

    return `
      <section class="moment moment--${layout}${flip}">
        <div class="moment__inner reveal">
          <div class="moment__media">${media}</div>
          ${text}
        </div>
      </section>`;
  }

  $("#moments").innerHTML = (SITE.moments || []).map(momentHTML).join("");

  /* ---------- Bottom gallery ---------- */
  const bottomItems = SITE.gallery || [];
  if (!bottomItems.length) {
    $("#gallerySection").remove();
  } else {
    $("#galleryTitle").textContent = SITE.galleryTitle || "Our favorite moments";
    $("#gallery").innerHTML = galleryTiles(bottomItems);
  }

  // Make sure gallery videos are really muted so they can autoplay
  document.querySelectorAll(".gallery video").forEach((v) => { v.muted = true; });

  /* ---------- Lightbox (shared by every gallery) ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbVideo = $("#lbVideo");
  const lbCap = $("#lbCap");
  let currentG = 0;
  let current = 0;

  function showLightbox(g, i) {
    const list = galleries[g] || [];
    if (!list.length) return;
    currentG = g;
    current = (i + list.length) % list.length;
    const item = list[current];

    // pause story videos while the viewer is open
    document.querySelectorAll(".moment__media video").forEach((v) => v.pause());
    lbVideo.pause();

    if (isVideo(item)) {
      lbImg.style.display = "none";
      lbVideo.style.display = "block";
      lbVideo.poster = item.poster || "";
      lbVideo.src = item.src;
      lbVideo.play().catch(() => {});
    } else {
      lbVideo.style.display = "none";
      lbVideo.removeAttribute("src");
      lbVideo.load();
      lbImg.style.display = "block";
      lbImg.src = item.src;
      lbImg.alt = item.caption || "";
    }

    lbCap.textContent = item.caption || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
  }

  function hideLightbox() {
    lbVideo.pause();
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
  }

  // Click any tile in any gallery
  document.addEventListener("click", (e) => {
    const el = e.target.closest(".gallery img, .gallery video");
    if (el) showLightbox(Number(el.dataset.g), Number(el.dataset.i));
  });

  $("#lbClose").addEventListener("click", hideLightbox);
  $("#lbPrev").addEventListener("click", () => showLightbox(currentG, current - 1));
  $("#lbNext").addEventListener("click", () => showLightbox(currentG, current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) hideLightbox(); });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") hideLightbox();
    if (e.key === "ArrowRight") showLightbox(currentG, current + 1);
    if (e.key === "ArrowLeft") showLightbox(currentG, current - 1);
  });

  // Swipe on phones
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLightbox(currentG, current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Reasons list ---------- */
  const reasons = SITE.reasons || [];
  if (!reasons.length) {
    $("#reasons").remove();
  } else {
    $("#reasonsTitle").textContent =
      SITE.reasonsTitle || `${reasons.length} reasons why I love you`;
    $("#reasonsList").innerHTML = reasons
      .map((r) => `<li class="reveal">${br(r)}</li>`)
      .join("");
  }

  /* ---------- Letter + footer ---------- */
  const L = SITE.letter;
  if (L) {
    $("#letter").innerHTML = `
      <div class="letter__inner">
        <h2 class="section-title">${esc(L.title || "")}</h2>
        ${(L.paragraphs || []).map((p) => `<p class="letter__p reveal">${br(p)}</p>`).join("")}
        <p class="letter__sign reveal">${esc(L.signoff || "")}<span>${esc(SITE.yourName || "")}</span></p>
      </div>`;
  } else {
    $("#letter").remove();
  }

  $("#footer").innerHTML = `Made with &#9829; by ${esc(SITE.yourName || "")}`;

  renderCounter();

  /* ---------- Scroll reveal ---------- */
  function observeReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

   /* ---------- Music ---------- */
  const bgm = $("#bgm");
  const musicBtn = $("#musicBtn");

  function startMusic() {
    if (!SITE.music) return;
    bgm.src = SITE.music;
    bgm.volume = 0.6;
    bgm.play().catch(() => {});
    musicBtn.classList.add("show");
  }

  musicBtn.addEventListener("click", () => {
    if (bgm.paused) { bgm.play(); musicBtn.classList.remove("off"); }
    else { bgm.pause(); musicBtn.classList.add("off"); }
  });

  // Only one story video plays at a time (music and gallery tiles are left alone)
  document.addEventListener("play", (e) => {
    const v = e.target;
    if (v.tagName !== "VIDEO" || !v.closest(".moment__media")) return;
    document.querySelectorAll(".moment__media video").forEach((o) => { if (o !== v) o.pause(); });
  }, true);

  /* ---------- Floating hearts ---------- */
  function spawnHeart() {
    if (document.hidden) return;
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = "\u2665";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 14 + Math.random() * 22 + "px";
    h.style.animationDuration = 6 + Math.random() * 6 + "s";
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
  setInterval(spawnHeart, 900);

  /* ---------- Autoplay videos when scrolled into view ---------- */
  function playWithFallback(v) {
    const p = v.play();
    if (p && p.catch) {
      // If the browser blocks sound, retry muted (she can unmute with the controls)
      p.catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  }

  function setupAutoplay() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) playWithFallback(entry.target);
        else entry.target.pause();
      });
    }, { threshold: 0.5 });

    document.querySelectorAll(".moment__media video, .gallery video").forEach((v) => io.observe(v));
  }

  /* ---------- Open button ---------- */
  $("#openBtn").addEventListener("click", () => {
    document.body.classList.remove("locked");
    $("#story").classList.remove("hidden");
    observeReveals();
    setupAutoplay();
    startCounter();
    startMusic();
    $("#story").scrollIntoView({ behavior: "smooth" });
  });
})();