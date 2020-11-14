<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>

    <Notifications />
  </div>
</template>

<script>
export default {
  components: {
    Notifications: () => import("./components/base/Notifications")
  },
  computed: {
    layout() {
      let layout;
      if (this.$route.meta.layout) {
        layout = this.$route.meta.layout + "-layout";
      }
      return layout;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/custom-ui/custom";
@import "@/assets/styles/element-ui/custom";
</style>
