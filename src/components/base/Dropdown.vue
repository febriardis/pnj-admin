<template>
  <div class="menu-navigation">
    <slot name="activator" v-bind:on="onClick"></slot>
    <div v-if="is_display" class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    is_display: false
  }),
  methods: {
    onClick() {
      this.is_display = !this.is_display;
    }
  }
};
</script>

<style lang="scss">
.menu-navigation {
  position: relative;
  .content {
    width: 100%;
    padding: 0 5px;
    margin-top: 10px;
    border-radius: 4px;
    background: white;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.04),
      0px 2px 8px rgba(0, 0, 0, 0.04), 0px 1px 4px rgba(0, 0, 0, 0.04);
    position: absolute;
    z-index: 4;
  }
}
</style>
