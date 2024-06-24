import "./assets/main.css";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupPinia } from "@/stores";
import { setupIcon, setupGlobalUtils } from "@/plugins";

const app = createApp(App);
const setupPlugins = () => {
  // 注册pinia
  setupPinia(app);
  // 注册el-icon图标
  setupIcon(app);
  // 注册全局方法
  setupGlobalUtils(app);
};

setupPlugins();

app.use(router).mount("#app");
