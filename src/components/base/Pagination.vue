<template>
  <div class="d-flex align-items-center">
    <button type="button" @click="count -= 1" class="btn btn-sm mr-2">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button type="button" @click="count += 1" class="btn btn-sm">
      <i class="fas fa-chevron-right"></i>
    </button>
    <div class="d-flex align-items-center ml-3">
      <p class="m-0 mr-2">Page</p>
      <input
        type="number"
        class="form-control text-center"
        v-model="value"
        style="width:20%"
      />
      <p class="m-0 ml-3" v-if="totalPage">Total Page: {{ totalPage }}</p>
      <p class="m-0" v-if="totalRecord">Total Record: {{ totalRecord }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalRecord: {
      type: Number,
      default: null
    },
    totalPage: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    value: 0
  }),
  watch: {
    value(newValue) {
      this.$emit("input", newValue);
    }
  },
  computed: {
    count: {
      get() {
        return parseInt(this.value);
      },
      set(val) {
        this.value = val;
      }
    }
  }
};
</script>
