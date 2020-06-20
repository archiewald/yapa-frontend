// example from https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onnotificationclick

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    self.clients
      .matchAll({
        includeUncontrolled: true,
        type: "window",
      })
      .then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if ("focus" in client) {
            client.focus();
            client.postMessage({ action: event.action });
            return;
          }
        }
        // if (self.clients.openWindow) return self.clients.openWindow("/");
      })
  );
});
