<template>
  <!-- <teleport to="body"> -->
  <transition name="modal-fade">
    <div v-if="active" class="dialog">
      <div class="dialog-container">
        <div
          class="dialog-content"
          :style="{ width: width }"
          :class="{ 'content-center': isVCentered }"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
  <!-- </teleport> -->
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "80%"
    },
    isVCentered: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    active: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:value", val);
      }
    }
  }
};
</script>

<style lang="scss">
.dialog {
  overflow: hidden;
  transition: opacity 0.25s, transform 0.25s;
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-container {
    overflow-y: scroll;
    padding: 20px;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }
  &-content {
    // width: 30%;
    // background: white;
    height: 100%;
    margin: 0 auto;
    border-radius: 10px;
  }
}

.content-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
