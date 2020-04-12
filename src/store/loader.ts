import { StoreonModule } from "storeon";

export interface LoaderState {
  isLoading: boolean;
}

export interface LoaderEvents {
  setIsLoading: boolean;
}

export const LoaderModule: StoreonModule<LoaderState, LoaderEvents> = store => {
  store.on("@init", () => ({
    isLoading: false
  }));

  store.on("setIsLoading", (_state, isLoading) => ({
    isLoading
  }));
};
