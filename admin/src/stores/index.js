import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useUserStoreWithOut } from "@/stores/user";

const store = createPinia();

export function setupPinia(app) {
    store.use(piniaPluginPersistedstate);
    app.use(store);
}

export function storeReset() {
    const userStore = useUserStoreWithOut();
    userStore.$reset();
}

export { store };
