import { createContext, useContext } from "react";

export const NextPageContext = createContext<() => void>(() => {}); // default value doesn't matter

export const useNextPageContext = () => {
  return useContext(NextPageContext);
};
