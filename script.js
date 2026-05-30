/* =============================================================
   Emmanuel Mikaelian — Landing
   Gestes sensoriels mécaniques, vanilla, sans dépendance.
   1. Hero : bruit saturé → retrait → titre qui s'assemble, + compteur.
   2. Réalisations : le « complexe » se barre et se réduit, tampon SIMPLIFIÉ.
   3. Reveal mécanique des sections.
   4. Grain analogique + curseur crosshair (desktop fin).
   Tout est neutralisé si prefers-reduced-motion.
   ============================================================= */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------------------------------------------------
     1. HERO — le dépouillement + compteur de retrait
     --------------------------------------------------------- */
  const NOISE = [
    "synergies", "blockchain", "écosystème", "disruptif", "scalable",
    "paradigme", "leverage", "roadmap", "agile", "framework",
    "pipeline", "MLOps", "fine-tuning", "vector store", "microservices",
    "low-code", "boilerplate", "legacy", "backlog", "cloud-native",
    "data lake", "workflow", "orchestration", "embeddings", "KPI",
    "stack", "API", "compliance", "dashboard", "proof of concept",
    "go-to-market", "scalabilité", "big data", "deep learning", "ROI",
  ];

  function rand(min, max) { return min + Math.random() * (max - min); }

  function runHero() {
    const layer = document.querySelector(".hero__noise");
    const title = document.querySelector(".hero__title");
    const status = document.querySelector("[data-status]");
    const essence = document.querySelector(".hero__essence");

    // Sans mouvement : on montre directement l'état final, net.
    if (reduceMotion || !layer) {
      if (status) status.textContent = "// SUPERFLU RETIRÉ — RESTE L'ESSENTIEL";
      return;
    }

    // État lisible garanti : appelé à la fin normale ET en cas d'échec JS.
    const revealHero = () => {
      if (essence) essence.style.opacity = "1";
      if (title) title.classList.add("is-revealed");
      if (layer && layer.isConnected) layer.remove();
    };

    try {
      if (title) title.classList.add("is-animated");
      if (essence) { essence.style.opacity = "0.12"; essence.style.transition = "opacity .8s linear"; }

      // Construire le bruit
      const frag = document.createDocumentFragment();
      const count = window.innerWidth < 720 ? 18 : NOISE.length;
      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        el.textContent = NOISE[i % NOISE.length];
        el.style.top = rand(4, 92) + "%";
        el.style.left = rand(-2, 92) + "%";
        el.style.fontSize = rand(0.7, 2.3).toFixed(2) + "rem";
        el.style.transform = `rotate(${rand(-4, 4).toFixed(1)}deg)`;
        el.style.opacity = rand(0.35, 0.8).toFixed(2);
        frag.appendChild(el);
      }
      layer.appendChild(frag);

      const words = Array.from(layer.children);
      // span dérivé de la VRAIE fin de la dernière animation (jamais coupée)
      const step = 1500 / words.length;
      const lastEnd = 220 + (words.length - 1) * step + 220 + 300;
      const span = lastEnd + 120;   // +120 ms de respiration avant remove

      // Retrait mécanique : barré vermillon → effacement net, en cascade
      words.forEach((el, i) => {
        const delay = 220 + i * step;
        el.animate(
          [{ color: "var(--muted)" }, { color: "var(--accent)", offset: .45 }, { color: "var(--accent)" }],
          { duration: 240, delay, fill: "forwards", easing: "steps(2)" }
        );
        el.animate(
          [
            { opacity: el.style.opacity, transform: el.style.transform },
            { opacity: 0, transform: `${el.style.transform} translateX(-14px) scaleX(.15)` },
          ],
          { duration: 300, delay: delay + 220, fill: "forwards", easing: "cubic-bezier(.85,0,.15,1)" }
        );
      });

      // Compteur : aligné sur la vraie disparition du dernier mot
      if (status) {
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / lastEnd);
          const n = Math.round(p * words.length);
          status.textContent = `// RETRAIT DU SUPERFLU … ${String(n).padStart(2, "0")} / ${words.length} ÉLÉMENTS`;
          if (p < 1) requestAnimationFrame(tick);
          else status.textContent = "// SUPERFLU RETIRÉ — RESTE L'ESSENTIEL";
        };
        requestAnimationFrame(tick);
      }

      window.setTimeout(revealHero, span);
    } catch (e) {
      revealHero(); // jamais de hero coincé invisible
    }
  }

  /* ---------------------------------------------------------
     2. RÉALISATIONS — complexe → simple
     --------------------------------------------------------- */
  function setupCards() {
    const cards = document.querySelectorAll(".card");
    if (!cards.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("is-simplified"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = Array.prototype.indexOf.call(cards, entry.target);
        window.setTimeout(() => entry.target.classList.add("is-simplified"), (idx % 2) * 140);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    cards.forEach((c) => io.observe(c));
  }

  /* ---------------------------------------------------------
     3. Strikes (douleurs) + reveal mécanique des sections
     --------------------------------------------------------- */
  function observeOnce(nodes, onHit, options) {
    if (reduceMotion || !("IntersectionObserver" in window)) { nodes.forEach(onHit); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onHit(entry.target);
        obs.unobserve(entry.target);
      });
    }, options);
    nodes.forEach((n) => io.observe(n));
  }

  function setupStrikes() {
    const strikes = Array.from(document.querySelectorAll(".strike"));
    observeOnce(strikes, (el) => el.style.setProperty("--strike", "1"), { threshold: 0.9 });
  }

  function setupReveal() {
    const sections = Array.from(document.querySelectorAll(".section"));
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    sections.forEach((s) => s.classList.add("reveal"));
    observeOnce(sections, (el) => el.classList.add("is-in"), { threshold: 0.12 });
  }

  /* ---------------------------------------------------------
     4. Grain analogique
     --------------------------------------------------------- */
  function setupGrain() {
    if (reduceMotion) return;
    const grain = document.querySelector(".grain");
    if (grain) grain.classList.add("is-on");
  }

  /* ---------------------------------------------------------
     5. Curseur crosshair (desktop fin seulement)
     --------------------------------------------------------- */
  function setupCursor() {
    if (reduceMotion || !finePointer) return;
    const el = document.querySelector("[data-cursor-el]");
    if (!el) return;
    el.hidden = false;
    document.body.classList.add("has-cursor");

    let x = window.innerWidth / 2, y = window.innerHeight / 2, raf = 0;
    // -50% concaténé : centrage exact quelle que soit la taille/l'état
    const render = () => { el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; raf = 0; };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };

    window.addEventListener("pointermove", (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY; schedule();
    }, { passive: true });

    // États au survol des cibles
    document.querySelectorAll("[data-cursor]").forEach((t) => {
      const kind = t.getAttribute("data-cursor");
      t.addEventListener("pointerenter", () => el.classList.add(kind === "card" ? "is-card" : "is-link"));
      t.addEventListener("pointerleave", () => el.classList.remove("is-card", "is-link"));
    });
    window.addEventListener("pointerdown", () => el.classList.add("is-down"));
    window.addEventListener("pointerup", () => el.classList.remove("is-down"));
    document.addEventListener("pointerleave", () => { el.style.opacity = "0"; });
    document.addEventListener("pointerenter", () => { el.style.opacity = "1"; });
  }

  /* ----------------------------- Boot ---------------------- */
  function init() {
    runHero();
    setupCards();
    setupStrikes();
    setupReveal();
    setupGrain();
    setupCursor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
