chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received: ", message);
  // 2. A page requested user data, respond with a copy of `user`
  if (message.time) {
    chrome.history.search(
      { text: "youtube", startTime: 0, maxResults: 1 },
      function (historyItems) {
        for (const item of historyItems) {
          const newUrl = item.url
            .replace(/&t=\d+s/g, "")
            .concat(`&t=${Math.floor(message.time).toString()}s`);
          chrome.history.deleteUrl({ url: item.url });
          chrome.history.addUrl({
            url: newUrl,
          });
        }
      }
    );
  }
});
