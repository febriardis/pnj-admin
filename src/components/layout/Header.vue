<template>
  <div class="header" :class="{ 'pad-antrian': isAntrian }">
    <div class="left-navbar">
      <el-button
        v-if="!isAntrian"
        @click="sidebarVisible = !sidebarVisible"
        class="mr-3"
        type="info"
      >
        <i class="fas fa-bars"></i>
      </el-button>

      <router-link to="/">
        <img
          src="../../assets/media/logo/pnj-white.png"
          width="140"
          height="auto"
        />
      </router-link>
    </div>
    <div class="right-navbar" v-if="!isAntrian">
      <el-dropdown @command="handleDropdown">
        <span class="el-dropdown-link">
          <i class="fas fa-user-circle"></i>
          {{ session ? session.name : "user session" }}
          <i class="fas fa-caret-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setting"> Pengaturan </el-dropdown-item>
          <el-dropdown-item command="logout"> Keluar </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    sidebar: {
      type: Boolean,
      default: true
    },
    isAntrian: {
      type: Boolean,
      dafault: true
    }
  },
  computed: {
    sidebarVisible: {
      get() {
        return this.sidebar;
      },
      set(val) {
        this.$emit("update:sidebar", val);
      }
    },
    ...mapState({
      session: state => state.auth.session || null
    })
  },
  methods: {
    handleDropdown(command) {
      if (command === "logout") {
        this.$store.dispatch("auth/logout");
      } else {
        this.$router.push({ name: "setting-profile" });
      }
    }

    // async fetchSession() {
    //   const response = await this.$api.fetchData("/session");
    //   if (response.status === 200) {
    //     this.$store.commit("auth/SET_SESSION", response.data.data);
    //   }
    // }
  },
  mounted() {
    // this.fetchSession();
  }
};
</script>

<style lang="scss">
.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;
}
.pad-antrian {
  padding: 18px 10px !important;
}
.header {
  display: flex;
  justify-content: space-between;
  background: #1b3858;
  color: #fff;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.14);
  padding: 8px 10px;
  .left-navbar,
  .right-navbar {
    display: flex;
    align-items: center;
  }
}

.menu-list a {
  border-radius: 2px;
  color: #4a4a4a;
  display: block;
  padding: 0.5em 0.8em;
  &:hover {
    background: #ebebeb;
    text-decoration: none;
  }
}
</style>
