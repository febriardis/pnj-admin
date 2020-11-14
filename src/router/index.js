import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "login" } },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/index"),
    meta: {
      title: "Login Admin | Pride n Joy",
      layout: "default",
      requiresVisitor: true
    }
  },

  {
    path: "/antrian",
    name: "antrian",
    component: () =>
      import(/* webpackChunkName: "antrian" */ "../views/antrian/index"),
    meta: {
      title: "Antrian | Pride n Joy Admin",
      layout: "antrian",
      requiresAuth: false
    }
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/dashboard/index"),
    meta: {
      title: "Dashboard | Pride n Joy Admin",
      layout: "admin",
      requiresAuth: false
    }
  },

  {
    name: "orders",
    path: "/orders",
    component: () => import(/* webpackChunkName: "orders" */ "../views"),
    redirect: "/orders/online",
    children: [
      {
        path: "online",
        name: "orders-online",
        component: () =>
          import(
            /* webpackChunkName: "orders-online" */ "../views/orders/online"
          ),
        meta: {
          title: "Orders Online | Pride n Joy Admin",
          layout: "admin",
          requiresAuth: false
        }
      },
      {
        path: "offline",
        name: "orders-offline",
        component: () =>
          import(
            /* webpackChunkName: "orders-offline" */ "../views/orders/offline"
          ),
        meta: {
          title: "orders offline | Pride n Joy Admin",
          layout: "admin",
          requiresAuth: false
        }
      }
    ]
  },

  {
    name: "products",
    path: "/products",
    component: () => import(/* webpackChunkName: "products" */ "../views"),
    redirect: "/products/list",
    children: [
      {
        path: "list",
        name: "products-list",
        component: () =>
          import(
            /* webpackChunkName: "products-list" */ "../views/products/list"
          ),
        meta: {
          title: "Products List | Pride n Joy Admin",
          layout: "admin",
          requiresAuth: false
        }
      },
      {
        path: "add",
        name: "products-add",
        component: () =>
          import(
            /* webpackChunkName: "products-add" */ "../views/products/add"
          ),
        meta: {
          title: "Products Add | Pride n Joy Admin",
          layout: "admin",
          requiresAuth: false
        }
      },
      {
        path: "attribute",
        name: "products-attribute",
        component: () =>
          import(
            /* webpackChunkName: "products-attribute" */ "../views/products/attribute"
          ),
        meta: {
          title: "Products Attribute | Pride n Joy Admin",
          layout: "admin",
          requiresAuth: false
        }
      }
    ]
  },

  {
    name: "settings",
    path: "/settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views"),
    redirect: "/settings/banner",
    children: [
      {
        name: "setting-profile",
        path: "profile",
        component: () =>
          import(
            /* webpackChunkName: "setting-profile" */ "../views/settings/profile/index"
          ),
        meta: {
          title: "Setting | Pride n Joy Admin",
          layout: "admin",
          requiresAuth: false
        }
      },

      {
        name: "setting-roles",
        path: "roles",
        component: () =>
          import(
            /* webpackChunkName: "setting-roles" */ "../views/settings/roles/index"
          ),
        meta: {
          title: "Setting | Pride n Joy Admin",
          layout: "admin",
          requiresAuth: false
        }
      },

      {
        name: "setting-users",
        path: "users",
        component: () =>
          import(
            /* webpackChunkName: "setting-users" */ "../views/settings/users/index"
          ),
        meta: {
          title: "Setting | Pride n Joy Admin",
          layout: "admin",
          requiresAuth: false
        }
      }
    ]
  }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
