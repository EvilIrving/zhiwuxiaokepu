import { defineStore } from "pinia";
import { store, storeReset } from "./index";
import { login } from "@/api/user";
import { resetRouter } from "@/router";
import piniaPersistConfig from "@/stores/helper/persist";
import { LOGIN_URL } from "@/config/config";
export const useUserStore = defineStore({
  id: "user",
  persist: true,
  state: () => ({
    token: "",
  }),
  getters: {
    getToken() {
      return this.token;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
    },

    async login(params = { username: "", password: "" }) {
      const res = await login(params);
      this.setToken(res.token);
    },

    logout(router) {
      storeReset();
      resetRouter();
      const { currentRoute } = router;
      router.replace({
        path: LOGIN_URL,
        query: {
          redirect: currentRoute.value.path,
        },
      });
    },
  },
  persist: piniaPersistConfig("zhiwu-user"),
});

// 便于外部使用
export const useUserStoreWithOut = () => {
  return useUserStore(store);
};
