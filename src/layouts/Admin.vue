<template>
  <div class="admin">
    <Header :sidebar.sync="sidebarVisible"></Header>
    <div class="admin-container">
      <div class="admin-sidebar" :class="{ active: sidebarVisible }">
        <Sidebar></Sidebar>
      </div>
      <div class="admin-content" :class="{ active: !sidebarVisible }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import("@/components/layout/Header"),
    Sidebar: () => import("@/components/layout/Sidebar")
  },

  data: () => ({
    sidebarVisible: true
  }),

  watch: {
    mediaWidth(val) {
      console.log("mediaWidthWatch", val);
    }
  },

  computed: {
    mediaWidth() {
      return window.matchMedia("(max-width: 700px)").matches;
    }
  },

  mounted() {
    this.sidebarVisible = !this.mediaWidth;
    // console.log("mediaWidthMounted", this.mediaWidth);
  }
};
</script>

<style lang="scss">
.admin-container {
  display: flex;
  height: calc(100vh - 50px);
  .admin-content {
    background: #eeeded;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    &.active {
      margin: auto;
      width: 100%;
      // @media (min-width: 768px) {
      //   & > div {
      //     width: calc(100% - 260px);
      //     margin: auto;
      //   }
      // }
    }
  }
  .admin-sidebar {
    height: 100%;
    overflow-y: scroll;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
    border-right: 1px solid #dee2e6;
    position: relative;
    left: -260px;
    transition: all 0.5s ease;
    width: 0;
    &.active {
      left: 0;
      width: 260px;
    }
  }
}
</style>
