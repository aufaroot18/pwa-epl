const registerServiceWorker = () => {
  return navigator.serviceWorker
    .register("/pwa-epl/sw.js", {scope: "/pwa-epl/"})
    .then((registration) => {
      console.log("ServiceWorker Berhasil Didaftarkan");
      return registration;
    })
    .catch((err) => {
      console.log("ServiceWorker Gagal didaftarkan");
    });
};

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const requestPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result == "denied") {
        console.log("Fitur notifikasi tidak diiinkan");
        return;
      } else if (result == "default") {
        console.log("Fitur notifikasi ditutup");
      }

      if ("PushManager" in window) {
        navigator.serviceWorker.getRegistration().then((registration) => {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BCnfkRhk5cXdE0IbNOIsc8Durk12cYPRPAaEmlPwBWi8UZ0u4f6msi8uxjLS6ubhxVXZPnIQCZ4u_AnxJcYq1RM"
              ),
            })
            .then((subscribe) => {
              console.log(
                "Berhasil melakukan subscribe dengan endpoint: ",
                subscribe.endpoint
              );
              console.log(
                "Berhasil melakukan subscribe dengan p256dh key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("p256dh"))
                  )
                )
              );
              console.log(
                "Berhasil melakukan subscribe dengan auth key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("auth"))
                  )
                )
              );
            })
            .catch((e) => {
              console.log("Tidak dapat melakukan subscribe", e);
            });
        });
      }
    });
  }
};

if ("serviceWorker" in navigator) {
  registerServiceWorker();
  requestPermission();
} else {
  console.log("Service Worker Belum Didukung di Browser Ini");
}
