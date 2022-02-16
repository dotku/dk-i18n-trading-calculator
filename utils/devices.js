import { Linking } from "react-native";

export function launchURL(url) {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        Linking.openURL(url).catch((err) => {
          console.warn("openURL error", err);
        });
      }
    })
    .catch((err) => console.warn("An unexpected error happened", err));
}
