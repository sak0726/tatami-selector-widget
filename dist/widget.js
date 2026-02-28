
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
      console.error("YourAI: siteId is required");
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

    button.innerHTML = "AI";

    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.width = "60px";
    button.style.height = "60px";
    button.style.background = "#0066ff";
    button.style.color = "#fff";
    button.style.borderRadius = "50%";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.cursor = "pointer";
    button.style.zIndex = "2147483647";
    button.style.fontFamily = "sans-serif";

    button.onclick = toggle;

    document.body.appendChild(button);
  }

  function createIframe() {

    if (iframe) return;
    const sessionId = crypto.randomUUID();

    iframe = document.createElement("iframe");

    iframe.src ="https://ai-tatami-select.hibiki-labsystem.online?siteId=" + encodeURIComponent(config.siteId) + "&sessionId=" + sessionId;
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


