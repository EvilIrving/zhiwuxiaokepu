import * as Icons from "@element-plus/icons-vue";

export { Icons };

export default (app) => {
  for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component);
  }
};
