import router from "../router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(record => record.meta.title)) {
    document.title = to.meta.title;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({
        name: "login"
      });
    }
  } else {
    if (localStorage.getItem("token")) {
      next({
        name: "dashboard"
      });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
