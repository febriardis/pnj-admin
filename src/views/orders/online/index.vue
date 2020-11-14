<template>
  <div class="setting-roles">
    <div class="bg-white p-4">
      <h3 class="mt-0 mb-0">Pesanan Online</h3>
    </div>
    <div class="p-3">
      <div class="card-custom pl-3 pr-3 pb-3">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in orderStatus"
            :key="item.id"
            :label="item.name"
            :name="item.id"
          >
            <div class="row">
              <div class="col-md-3">
                <f-search-field
                  placeholder="Cari Pesanan"
                  size="small"
                ></f-search-field>
              </div>
              <div class="col"></div>
              <div class="col-md-3">
                <f-date-picker range></f-date-picker>
              </div>
            </div>
            <div class="order-head">
              <div class="row">
                <div class="col-md-3">
                  Produk
                </div>
                <div class="col text-center">
                  Pemesan
                </div>
                <div class="col text-center">
                  Dikirim ke
                </div>
                <div class="col text-center">
                  Status
                </div>
                <div class="col text-center">
                  Total (Nominal)
                </div>
                <div class="col text-center">
                  Aksi
                </div>
              </div>
            </div>

            <order-items
              v-for="order in 3"
              :key="order"
              :status="item.id"
            ></order-items>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    OrderItems: () => import("@/components/order/online/OrderItem")
  },
  data() {
    return {
      activeName: 0,
      orderStatus: [
        { id: "0", name: "Semua Pesanan" },
        { id: "1", name: "Menunggu Pembayaran" },
        { id: "2", name: "ٍPerlu Diproses" },
        { id: "3", name: "Sedang Diproses" },
        { id: "4", name: "Sedang Dikirim" },
        { id: "5", name: "Selesai" }
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
