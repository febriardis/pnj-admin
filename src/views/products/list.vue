<template>
  <div class="setting-roles">
    <div class="bg-white p-4">
      <h3 class="mt-0 mb-0">Daftar Produk</h3>
    </div>
    <div class="p-3">
      <div class="card-custom p-3">
        <div class="row">
          <div class="col-md-3">
            <f-search-field
              placeholder="Cari Produk"
              size="small"
            ></f-search-field>
          </div>
          <div class="col text-right">
            <el-button type="primary" size="small" icon="el-icon-plus">
              Tambah Produk
            </el-button>
          </div>
        </div>
        <div class="order-head">
          <div class="row">
            <div class="col text-center">
              Style
            </div>
            <div class="col text-center">
              Cutting
            </div>
            <div class="col text-center">
              Fabric
            </div>
            <div class="col text-center">
              Stitch
            </div>
            <div class="col text-center">
              Size
            </div>
            <div class="col text-center">
              Qty
            </div>
            <div class="col text-center">
              Aksi
            </div>
          </div>
        </div>

        <product-items
          v-for="item in 3"
          :key="item"
          :status="item.id"
        ></product-items>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ProductItems: () => import("@/components/products/list/ProductItems")
  },
  data() {
    return {
      activeName: 0,
      orderStatus: [
        { id: "0", name: "Semua Pesanan" },
        { id: "1", name: "Menunggu Pembayaran" },
        { id: "2", name: "Sedang Diproses" },
        { id: "3", name: "Selesai" }
      ]
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss">
.order-head {
  background: #f6f6f6;
  color: #747474;
  padding: 10px;
  margin-top: 15px;
  border-radius: 4px;
}
</style>
