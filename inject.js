"use strict";

(() => {
  const setPauseListener = () => {
    const player = document.querySelector(".video-stream");
    if (player) {
      player.onpause = () => {
        const time = player.currentTime;
        chrome.runtime.sendMessage({ time: time });

        setTimeout(() => {
          const newUrl = window.location.href
            .replace(/&t=\d+s/g, "")
            .concat(`&t=${Math.floor(time).toString()}s`);

          history.replaceState(history.state, "", newUrl);
        }, 500);
      };
    }
  };
  setPauseListener();
  let previousUrl = "";
  const observer = new MutationObserver(function (mutations) {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
      setPauseListener();
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);
})();
