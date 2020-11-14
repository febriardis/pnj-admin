<template>
  <div class="setting-roles">
    <div class="bg-white p-4">
      <h3 class="mt-0 mb-0">Antrian Pesanan</h3>
    </div>
    <div class="p-3">
      <div class="card-custom p-3">
        <div class="order-head">
          <div class="row">
            <div class="col text-center">
              No Order
            </div>
            <div class="col text-center">
              Nama Pemesan
            </div>
            <div class="col text-center">
              Item
            </div>
            <div class="col text-center">
              Status
            </div>
            <div class="col text-center">
              Waktu
            </div>
          </div>
        </div>

        <antrian-list
          v-for="item in 3"
          :key="item"
          :status="item.id"
        ></antrian-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AntrianList: () => import("@/components/antrian/List")
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
  border-radius: 4px;
}
</style>
