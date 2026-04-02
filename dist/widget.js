(function (window, document) {
  if (window.self !== window.top) return;
  if (window.__YourAIWidgetLoaded) return;

  window.__YourAIWidgetLoaded = true;

  var iframe = null;
  var button = null;
  var isOpen = false;
  var config = {};


  function init(options) {

    config = options || {};

    if (!config.siteId) {
      console.error("siteId is required");
      return;
    }

    if (document.readyState === "loading") {

      document.addEventListener("DOMContentLoaded", start);

    } else {

      start();
    }
  }

  function start() {

    createButton();
    createIframe();
  }
  window.addEventListener("message", function(event) {
    //console.log("Received message:", iframe, event.data);
    // if (event.origin !== "https://s-resonance.co.jp") return;
    //iframe.style.display = "none";
    if (event.data && event.data.type === "tatami-close-chat") {
      if (iframe) {
        iframe.style.display = "none";
        isOpen = false;
      }
    }

  });
  function createButton() {

    if (button) return;

    button = document.createElement("div");

    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.width = "160px";
    button.style.height = "56px";
    button.style.cursor = "pointer";
    button.style.zIndex = "2147483647";
    button.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.25))";
    button.innerHTML = '<svg width="160" height="56" viewBox="0 0 160 56" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="wgB" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#56ab2f"/><stop offset="100%" stop-color="#2d6a4f"/></linearGradient></defs><rect width="160" height="56" rx="28" fill="url(#wgB)"/><rect x="14" y="10" width="32" height="32" rx="3" fill="rgba(255,255,255,0.2)"/><rect x="18" y="14" width="24" height="24" fill="rgba(255,255,255,0.9)"/><line x1="18" y1="20" x2="42" y2="20" stroke="#56ab2f" stroke-width="1"/><line x1="18" y1="26" x2="42" y2="26" stroke="#56ab2f" stroke-width="1"/><line x1="18" y1="32" x2="42" y2="32" stroke="#56ab2f" stroke-width="1"/><line x1="24" y1="14" x2="24" y2="20" stroke="#56ab2f" stroke-width="1"/><line x1="30" y1="14" x2="30" y2="20" stroke="#56ab2f" stroke-width="1"/><line x1="36" y1="14" x2="36" y2="20" stroke="#56ab2f" stroke-width="1"/><line x1="21" y1="20" x2="21" y2="26" stroke="#56ab2f" stroke-width="1"/><line x1="27" y1="20" x2="27" y2="26" stroke="#56ab2f" stroke-width="1"/><line x1="33" y1="20" x2="33" y2="26" stroke="#56ab2f" stroke-width="1"/><line x1="39" y1="20" x2="39" y2="26" stroke="#56ab2f" stroke-width="1"/><line x1="24" y1="26" x2="24" y2="32" stroke="#56ab2f" stroke-width="1"/><line x1="30" y1="26" x2="30" y2="32" stroke="#56ab2f" stroke-width="1"/><line x1="36" y1="26" x2="36" y2="32" stroke="#56ab2f" stroke-width="1"/><line x1="21" y1="32" x2="21" y2="38" stroke="#56ab2f" stroke-width="1"/><line x1="27" y1="32" x2="27" y2="38" stroke="#56ab2f" stroke-width="1"/><line x1="33" y1="32" x2="33" y2="38" stroke="#56ab2f" stroke-width="1"/><line x1="39" y1="32" x2="39" y2="38" stroke="#56ab2f" stroke-width="1"/><text x="100" y="31" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#fff" font-weight="bold">畳を相談する</text></svg>';

    button.onclick = toggle;

    document.body.appendChild(button);
  }

  function createIframe() {

    if (iframe) return;
    const sessionId = crypto.randomUUID();

    iframe = document.createElement("iframe");

iframe.src = "https://ai-tatami-select.hibiki-labsystem.online?t=" + encodeURIComponent(config.siteId);
  

    //iframe.src = "http://localhost:8000?siteId=" + encodeURIComponent(config.siteId) + "&sessionId=" + sessionId;
    iframe.style.position = "fixed";
    iframe.style.bottom = "90px";
    iframe.style.right = "20px";
    iframe.style.width = "400px";
    iframe.style.height = "600px";
    iframe.style.border = "none";
    iframe.style.display = "none";
    iframe.style.zIndex = "2147483647";
    iframe.style.background = "#fff";
    iframe.style.borderRadius = "12px";
    iframe.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";

    applyResponsiveStyle();

    iframe.setAttribute("allow", "clipboard-write; microphone");

    document.body.appendChild(iframe);

    window.addEventListener("resize", applyResponsiveStyle);
  }
  function applyResponsiveStyle() {
    if (!iframe) return;

    const isMobile = window.innerWidth <= 640;

    if (isMobile) {
      iframe.style.bottom = "0";
      iframe.style.right = "0";
      iframe.style.width = "100vw";
      iframe.style.height = "95vh";
      iframe.style.borderRadius = "0";
      iframe.style.boxShadow = "none";
    } else {
      iframe.style.bottom = "0";
      iframe.style.right = "10px";
      iframe.style.width = "400px";
      iframe.style.height = "85vh";
      iframe.style.borderRadius = "12px";
      iframe.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
    }
  }
  function toggle() {

    if (!iframe) return;

    isOpen = !isOpen;

    iframe.style.display = isOpen ? "block" : "none";
  }

  function api(command, options) {

    if (command === "init") {
      init(options);
    }

    if (command === "open") {
      if (iframe) iframe.style.display = "block";
    }

    if (command === "close") {
      if (iframe) iframe.style.display = "none";
    }
  }

  window.TenjinAi = api;

})(window, document);


