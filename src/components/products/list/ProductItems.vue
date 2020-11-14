<template>
  <div class="product-content text-size-small">
    <div class="row">
      <div class="col p-0 text-center border-right">
        <p class="text-color-gray">Selvedge</p>
      </div>
      <div class="col p-0 text-center border-right">
        <div class="border-bottom" v-for="item in 3" :key="item">
          <p class="text-color-gray">Cutting name</p>
        </div>
      </div>
      <div class="col p-0 text-center border-right">
        <div class="border-bottom" v-for="item in 3" :key="item">
          <p class="text-color-gray">Fabric name</p>
        </div>
      </div>
      <div class="col p-0 text-center border-right">
        <div class="border-bottom" v-for="item in 3" :key="item">
          <p class="text-color-gray">Stitch name</p>
        </div>
      </div>
      <div class="col p-0 text-center border-right">
        <div class="border-bottom" v-for="item in 3" :key="item">
          <p class="text-color-gray">3{{ item }}</p>
        </div>
      </div>
      <div class="col p-0 text-center border-right">
        <p class="text-color-gray">100</p>
      </div>
      <div class="col p-0 text-center">
        <div class="mt-3">
          <el-button size="small" icon="el-icon-edit"></el-button>
          <el-button size="small" icon="el-icon-delete"></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: "0"
    }
  },

  data: () => ({
    isDialog: false
  })
};
</script>

<style lang="scss">
.product-content {
  border: 1px solid #e0e0e0;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
