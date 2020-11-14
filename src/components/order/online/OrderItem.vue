<template>
  <div class="order-content text-size-small">
    <div class="row border-bottom">
      <div class="col">
        <p class="mt-0 mb-2 font-weight-bold">
          No. Order: ORD/2423/423432
        </p>
      </div>
      <div class="col text-right">
        <p class="mt-0 mb-2 font-weight-light">
          Tanggal Pesan: 06/09/2020
        </p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-3 border-right">
        <p>
          <span class="text-color-gray">Fast Pants</span> (selvedge/chino/denim)
        </p>
        <p><span class="text-color-gray">Fabric:</span> Fabric name</p>
        <p><span class="text-color-gray">Stitch:</span> Stitch name</p>
        <p><span class="text-color-gray">Size:</span> XL</p>
        <p><span class="text-color-gray">Cutting:</span> Cutting name</p>
      </div>
      <div class="col text-center border-right">
        <p>John Kenedy</p>
      </div>
      <div class="col border-right">
        <p class="text-color-gray">
          Jln. sesuai harapan 2 No. 25 Rt. 002 Rw. 001, Cibiru, Bandung, Jawa
          Barat.
        </p>
        <div class="text-size-mini border-top pt-2">
          <p class="m-0 mb-1">Expedisi:</p>
          <p class="m-0 font-weight-bold">JNE- Reg</p>
          <p class="m-0 text-color-gray">(Rp. 10.000)</p>
        </div>
      </div>
      <div class="col text-center border-right">
        <p class="text-color-gray">Sedang Diproses</p>
      </div>
      <div class="col text-center border-right">
        <p class="font-weight-bold">Rp. 123.000</p>
      </div>
      <div class="col text-center">
        <el-button
          type="primary"
          size="small"
          class="w-100"
          v-if="status === '2'"
          >Proses Pesanan</el-button
        >
        <el-button
          type="success"
          size="small"
          class="w-100"
          v-else-if="status === '3'"
          >Kirim Pesanan</el-button
        >
        <el-button
          size="small"
          type="warning"
          plain
          class="w-100"
          v-else-if="status === '4'"
          >Pengiriman Selesai</el-button
        >

        <el-button
          size="small"
          class="w-100 ml-0 mt-2"
          icon="el-icon-printer"
          v-if="status !== '2'"
          >Cetak Struk</el-button
        >
      </div>
    </div>
    <!-- <div class="row border-top">
      <div class="col"></div>
      <div class="col text-right pt-2">
        <a href="#">Detail Pesanan</a>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: "0"
    }
  }
};
</script>

<style lang="scss">
.order-content {
  border: 1px solid #e0e0e0;
  //   color: #747474;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
