// 5-digit gate with SHA-256 hash for '54321'
(async function(){
  const gateEl = document.getElementById("gate");
  const input = document.getElementById("codeInput");
  const showBtn = document.getElementById("showBtn");
  const submitBtn = document.getElementById("submitBtn");
  const errEl = document.getElementById("err");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // SHA-256('54321')
  const CODE_HASH_HEX = "20f3765880a5c269b747e1e906054a4b4a3a991259f1e16b5dde4742cec2319a";

  function setOk(ok){ sessionStorage.setItem("gate-ok", ok ? "1" : "0"); }
  function ok(){ return sessionStorage.getItem("gate-ok")==="1"; }
  async function sha256Hex(str){
    const enc = new TextEncoder();
    const buf = await crypto.subtle.digest("SHA-256", enc.encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
  }
  function toggle(){ gateEl.hidden = ok(); }

  showBtn.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password";
    input.focus();
  });

  submitBtn.addEventListener("click", async () => {
    errEl.hidden = true;
    const v = (input.value || "").trim();
    if (v.length !== 5) { errEl.textContent = "Kod 5 simvoldan ibarət olmalıdır."; errEl.hidden = false; return; }
    const hex = await sha256Hex(v);
    if (hex === CODE_HASH_HEX) { setOk(true); toggle(); }
    else { setOk(false); errEl.textContent = "Səhv kod."; errEl.hidden = false; input.select(); }
  });

  toggle();
})();