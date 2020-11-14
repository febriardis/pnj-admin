<template>
  <div class="product-content text-size-small">
    <div class="row">
      <div class="col text-center border-right">
        <p class="text-color-gray">ORD/2349320</p>
      </div>
      <div class="col text-center border-right">
        <p class="text-color-gray">Rocky Cak</p>
      </div>
      <div class="col border-right">
        <p>
          <span class="text-color-gray">Fast Pants</span> (selvedge/chino/denim)
        </p>
        <p><span class="text-color-gray">Fabric:</span> Fabric name</p>
        <p><span class="text-color-gray">Stitch:</span> Stitch name</p>
        <p><span class="text-color-gray">Size:</span> XL</p>
        <p><span class="text-color-gray">Cutting:</span> Cutting name</p>
      </div>
      <div class="col text-center border-right">
        <p class="text-color-gray">Sedang di proses/</p>
      </div>
      <div class="col text-center border-right">
        <p class="text-color-gray">00:00:00:00</p>
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
