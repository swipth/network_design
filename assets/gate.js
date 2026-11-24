(function () {
  var STORAGE_KEY = "network_design_auth_v1";
  var PASSCODE = "616";

  function unlock() {
    document.body.classList.remove("is-locked");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      /* ignore */
    }
  }

  function bindGate() {
    var form = document.getElementById("accessForm");
    var input = document.getElementById("accessPassword");
    var err = document.getElementById("accessError");
    if (!form || !input) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value === PASSCODE) {
        err.textContent = "";
        unlock();
      } else {
        err.textContent = "密码错误，请重试";
        input.focus();
        input.select();
      }
    });
  }

  function init() {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        unlock();
        return;
      }
    } catch (e) {
      /* ignore */
    }
    bindGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();