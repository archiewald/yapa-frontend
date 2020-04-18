import { StoreonModule } from "storeon";
import { User } from "models/User";

export interface UserState {
  user?: User;
  userTemp?: User;
}

export interface UserEvents {
  userSave: User;
  userSaveTemp: User;
}

export const UserModule: StoreonModule<UserState, UserEvents> = store => {
  store.on("userSave", (_state, user) => ({
    user
  }));

  store.on("userSaveTemp", (_state, userTemp) => ({
    userTemp
  }));
};
