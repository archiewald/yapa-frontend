import { StoreonModule } from "storeon";
import { User } from "models/User";
import { api } from "api";
import { AppEvents } from "store";

export interface UserState {
  user?: User | null;
  userTemp?: User;
}

export interface UserEvents {
  userSave: User | null;
  userGetWithTags: undefined;
  userClear: undefined;
  userSaveTemp: User;
}

export const UserModule: StoreonModule<UserState, AppEvents> = (store) => {
  store.on("@init", () => {
    store.dispatch("userGetWithTags");
  });

  store.on("userGetWithTags", async () => {
    const user = await api.getUser();

    store.dispatch("userSave", user ? user : null);
    const initialLoader = document.getElementById("initial-loader")!;
    initialLoader.style.display = "none";

    if (user) {
      store.dispatch("tagsGet");
      store.dispatch("pomodorosGet");
      store.dispatch("timerInit");
    }
  });

  store.on("userClear", () => ({
    user: null,
  }));

  store.on("userSave", (_state, user) => ({
    user,
  }));

  store.on("userSaveTemp", (_state, userTemp) => ({
    userTemp,
  }));
};
