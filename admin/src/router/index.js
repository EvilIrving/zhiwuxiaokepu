import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NProgress from "@/config/nprogress";
import { useUserStore } from "@/stores/user";
import { LOGIN_URL } from "@/config/config";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && name !== "login") {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  // 1.NProgress 开始
  NProgress.start();

  // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  // if (to.path.toLocaleLowerCase() === LOGIN_URL) {
  //   if (userStore.token) return next(from.fullPath);
  //   resetRouter();
  //   return next();
  // }

  // 5.判断是否有 Token，没有重定向到 login 页面
  // if (!userStore.token) return next({ path: LOGIN_URL, replace: true });

  // 8.正常访问页面
  next();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

export default router;
