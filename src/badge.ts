// https://web.dev/badging-api/#supporting

declare const navigator: any;
declare const window: any;

export function setBadge(value?: number) {
  if (navigator.setExperimentalAppBadge) {
    navigator.setExperimentalAppBadge(value);
    return;
  }

  if (window.setAppBadge) {
    window.setAppBadge(value);
  }
}

export function clearBadge() {
  if (navigator.clearExperimentalAppBadge) {
    navigator.clearExperimentalAppBadge();
  }

  if (window.clearAppBadge) {
    window.clearAppBadge();
  }
}
