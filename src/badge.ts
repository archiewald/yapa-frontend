// https://web.dev/badging-api/#supporting

declare const navigator: any;
declare const window: any;

export function setBadge(value?: number) {
  if (navigator.setExperimentalAppBadge) {
    navigator.setExperimentalAppBadge(value);
    return;
  }

  if (navigator.setAppBadge) {
    navigator.setAppBadge(value);
  }
}

export function clearBadge() {
  if (navigator.clearExperimentalAppBadge) {
    navigator.clearExperimentalAppBadge();
  }

  if (navigator.clearAppBadge) {
    navigator.clearAppBadge();
  }
}
