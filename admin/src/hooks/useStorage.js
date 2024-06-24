import { local, session } from "@/utils";

export const useStorage = (type = "session") => {
  const storageMode = type === "session" ? session : local;

  const getItem = (key) => {
    return storageMode.getItem(key);
  };

  const setItem = (key, value) => {
    storageMode.setItem(key, value);
  };

  const removeItem = (key) => {
    storageMode.removeItem(key);
  };

  const clear = () => {
    storageMode.clear();
  };

  return { getItem, setItem, removeItem, clear };
};
