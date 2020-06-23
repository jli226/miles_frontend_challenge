import React from "react";
import { useLocalStore } from "mobx-react";
import { Store } from ".";

const StoreContext = React.createContext<Store | null>(null);

export const StoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const localStore = useLocalStore(() => new Store());
  return (
    <StoreContext.Provider value={localStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
