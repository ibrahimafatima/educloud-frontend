import Pusher from "pusher-js";

export function pusherChannel() {
  const pusher = new Pusher("1dc703e7dbe1e499837c", {
    cluster: "eu",
    forceTLS: true,
    encrypted: true,
  });
  const channel = pusher.subscribe("educloud");
  return channel;
}

export default {
  pusherChannel,
};
