<template>
  <el-input
    v-model="innerValue"
    @input.native="debounceInput"
    v-bind="$attrs"
    prefix-icon="el-icon-search"
  />
</template>

<script>
import _ from "lodash";

export default {
  data: () => ({
    innerValue: ""
  }),
  methods: {
    searchData(value) {
      this.$emit("input", value.target.value);
    }
  },

  created() {
    this.debounceInput = _.debounce(this.searchData, 500);
  }
};
</script>
