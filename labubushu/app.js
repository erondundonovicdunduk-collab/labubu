// App logic with oak button, synthetic click sound, and animated bottle fill
(function(){
  const pdfInput = document.getElementById("pdfInput");
  const docInput = document.getElementById("docInput");
  const pdfStatus = document.getElementById("pdfStatus");
  const docStatus = document.getElementById("docStatus");
  const fill = document.getElementById("fill");
  const oakBtn = document.getElementById("oakBtn");
  const prepNote = document.getElementById("prepNote");
  const downloadBtn = document.getElementById("downloadBtn");
  const readyNote = document.getElementById("readyNote");

  const acc = document.querySelector(".accordion");
  const panel = document.querySelector(".panel");
  const topicBox = document.getElementById("topicBox");

  const topics = {
    aml: "Pul yuyulmasına dair (placeholder).",
    credit: "Kreditlərə dair (placeholder).",
    ipoteka: "İpotekaya dair (placeholder)."
  };

  function updateOakVisibility(){
    const show = pdfInput.files.length && docInput.files.length;
    oakBtn.hidden = !show;
  }

  function updateStatuses(){
    pdfStatus.textContent = pdfInput.files[0] ? `Seçildi: ${pdfInput.files[0].name}` : "Fayl seçilməyib.";
    docStatus.textContent = docInput.files[0] ? `Seçildi: ${docInput.files[0].name}` : "Fayl seçilməyib.";
  }

  pdfInput.addEventListener("change", () => { updateStatuses(); updateOakVisibility(); });
  docInput.addEventListener("change", () => { updateStatuses(); updateOakVisibility(); });

  acc.addEventListener("click", () => {
    const expanded = acc.getAttribute("aria-expanded") === "true";
    acc.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });

  document.querySelectorAll(".tag").forEach(btn => {
    btn.addEventListener("click", () => {
      topicBox.textContent = topics[btn.dataset.topic] || "Bölmə tapılmadı.";
    });
  });

  // Simple synthetic "click" using WebAudio (approximation of Minecraft button click)
  function playClick(){
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.value = 880; // short high blip
    g.gain.setValueAtTime(0.0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.13);
  }

  function animateFill(durationMs){
    const maxH = 146; // inside bottle
    const startY = parseInt(fill.getAttribute("y")) || 196;
    const startH = parseInt(fill.getAttribute("height")) || 0;
    const targetH = maxH;
    const start = performance.now();
    function step(t){
      const p = Math.min(1, (t - start) / durationMs);
      const h = Math.round(startH + (targetH - startH) * p);
      fill.setAttribute("height", String(h));
      fill.setAttribute("y", String(196 - h));
      if (p < 1) requestAnimationFrame(step);
      else {
        downloadBtn.disabled = false;
        readyNote.hidden = false;
        prepNote.hidden = true;
      }
    }
    requestAnimationFrame(step);
  }

  oakBtn.addEventListener("click", () => {
    playClick();
    prepNote.hidden = false;
    readyNote.hidden = true;
    downloadBtn.disabled = true;
    animateFill(6000); // 6 seconds
  });

  // download result
  downloadBtn.addEventListener("click", () => {
    const pdfName = pdfInput.files[0]?.name || "yoxdur";
    const docName = docInput.files[0]?.name || "yoxdur";
    const text = [
      "Labovu — nəticə faylı",
      "======================",
      `PDF (Qaydalar): ${pdfName}`,
      `Word (Nəticələr): ${docName}`,
      "",
      "Bu demo faylı brauzerdə generasiya olundu."
    ].join("\n");
    const blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "netice.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();