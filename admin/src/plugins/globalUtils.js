import { session, local } from "@/utils";

export default (app) => {
  app.config.globalProperties.$session = session;
  app.config.globalProperties.$local = local;
};
