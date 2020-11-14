<template>
  <div class="sidebar">
    <ul class="menu-list">
      <li v-for="(menu, index) in menus" :key="index">
        <router-link v-if="menu.router" :to="menu.router">
          <div class="d-flex align-items-center">
            <i class="fas" :class="menu.icon" style="flex-basis: 15%;"></i>
            <p class="mt-1 mb-1">{{ menu.name }}</p>
          </div>
        </router-link>
        <a
          v-else
          href="javascript:void(0)"
          @click="menu.subActive = !menu.subActive"
          class="is-expanded"
        >
          <div class="d-flex align-items-center">
            <i class="fas" :class="menu.icon" style="flex-basis: 15%;"></i>
            <p class="mt-1 mb-1">{{ menu.name }}</p>
          </div>
        </a>
        <ul v-if="menu.submenu.length > 0 && menu.subActive" class="submenu">
          <li v-for="(submenu, index) in menu.submenu" :key="index">
            <router-link :to="submenu.router">{{ submenu.name }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          name: "Dashboard",
          router: "/dashboard",
          icon: "fa-home",
          submenu: [],
          subActive: false
        },
        {
          name: "Pesanan",
          router: null,
          icon: "fa-list-ul",
          submenu: [
            { name: "Pesanan Online", router: "/orders/online" },
            { name: "Pesanan Offline", router: "/orders/offline" }
          ],
          subActive: false
        },
        {
          name: "Produk",
          router: null,
          icon: "fa-archive",
          submenu: [
            { name: "Daftar Produk", router: "/products/list" },
            { name: "Tambah Produk", router: "/products/add" },
            { name: "Kelola Atribut", router: "/products/attribute" }
          ],
          subActive: false
        },
        {
          name: "Pengaturan",
          icon: "fa-cog",
          router: null,
          submenu: [
            { name: "Profil", router: "/settings/profile" },
            { name: "Hak Akses", router: "/settings/roles" },
            { name: "Pengguna", router: "/settings/users" }
          ],
          subActive: false
        }
      ]
    };
  },

  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(value) {
        const routePath = value.path;
        this.menus.forEach(element => {
          element.subActive = false;
          element.submenu.forEach(child => {
            if (child.router === routePath) {
              element.subActive = true;
            }
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  .menu-list {
    padding-left: 0;
    li {
      list-style: none;
    }
  }
  .menu-list a {
    border-radius: 2px;
    color: #4a4a4a;
    display: block;
    padding: 0.6em 1.2em;
    text-decoration: none;
    &:hover,
    &.active {
      background: #f5f5f5;
      color: #333;
      font-weight: 500;
      text-decoration: none;
    }
  }
  .submenu {
    margin-left: 23px;
    padding: 0;
    // border-left: 1px solid #d5d5d5;
    transition: opacity 0.25s, transform 0.25s;
  }
}
</style>
