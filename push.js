const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BCnfkRhk5cXdE0IbNOIsc8Durk12cYPRPAaEmlPwBWi8UZ0u4f6msi8uxjLS6ubhxVXZPnIQCZ4u_AnxJcYq1RM",
  privateKey: "F8LThAXItFtI4jx3z5UPkmbaUvRlaOKuyLUdxljtKGQ",
};

webPush.setVapidDetails(
  "mailto: aufaroot18@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/ekwJVB-akbQ:APA91bGFZLMFi2E_Jbtyk0y1qceqXK358uK9xncSeX-VV3tDWNglQhETFLbWFzsusA91sNmTw19tonEBSQ4Fe5mSciGXbSyCgx1wq-PwY5DG5dxQ5SuBsSIsBwqyXQzGitITMzl0UfEw",
  keys: {
    p256dh:
      "BD3VokU8BXaT/dPgCWsbqQUjml1l/aK43W9BuI1x5GlSxcNYQzw+oikX0R89F3HeDD6zOjMqskLGBotpnkP/Zig=",
    auth: "NgaxSjlgtg2zKMdtcMCGmg==",
  },
};

let payload = "Push Notification dengan FCM";
let options = {
  gcmAPIKey: "874996069735",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
