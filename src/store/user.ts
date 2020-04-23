import { StoreonModule } from "storeon";
import { User } from "models/User";
import { api } from "api";

export interface UserState {
  user?: User | null;
  userTemp?: User;
}

export interface UserEvents {
  userSave: User | null;
  userGet: undefined;
  userSaveTemp: User;
}

export const UserModule: StoreonModule<UserState, UserEvents> = store => {
  store.on("@init", () => {
    store.dispatch("userGet");
  });

  store.on("userGet", async () => {
    const user = await api.getUser();

    store.dispatch("userSave", user ? user : null);
  });

  store.on("userSave", (_state, user) => ({
    user
  }));

  store.on("userSaveTemp", (_state, userTemp) => ({
    userTemp
  }));
};
