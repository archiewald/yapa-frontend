import { StoreonModule } from "storeon";
import { User } from "models/User";

export interface UserState {
  user: User;
}

export interface UserEvents {
  userSave: User;
}

export const UserModule: StoreonModule<UserState, UserEvents> = store => {
  // store.on("@init", () => ({
  // }));

  store.on("userSave", (_state, user) => ({
    user
  }));
};
