<template>
  <el-select v-model="innerValue" multiple filterable default-first-option>
    <slot></slot>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      innerValue: null
    };
  }
};
</script>
