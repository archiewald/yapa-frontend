import { StoreonModule } from "storeon";

export interface CookiesBannerState {
  areCookiesAccepted: boolean;
}

export interface CookiesBannerEvents {
  setAreCookiesAccepted: boolean;
}

const ARE_COOKIES_ACCEPTED_STORAGE_KEY = "areCookiesAccepted";

export const CookiesBannerModule: StoreonModule<
  CookiesBannerState,
  CookiesBannerEvents
> = (store) => {
  store.on("@init", () => ({
    areCookiesAccepted: !!(
      window.localStorage.getItem(ARE_COOKIES_ACCEPTED_STORAGE_KEY) === "true"
    ),
  }));

  store.on("setAreCookiesAccepted", (_state, areCookiesAccepted) => {
    window.localStorage.setItem(ARE_COOKIES_ACCEPTED_STORAGE_KEY, "true");

    return {
      areCookiesAccepted: true,
    };
  });
};
