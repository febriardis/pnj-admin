<template>
  <div class="card-custom p-3">
    <h4 class="mt-1 mb-1 text-capitalize">Daftar {{ type }}</h4>
    <table class="table table-list table-bordered table-striped mt-3">
      <thead>
        <tr>
          <th class="text-size-small bg-white border-right" width="3%">
            Nama
          </th>
          <th class="text-size-small bg-white border-right" width="3%">
            Harga
          </th>
          <th class="text-size-small bg-white border-right" width="2%">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in 3" :key="index">
          <td class="text-size-small text-center">
            Selvedge
          </td>
          <td class="text-size-small text-center">
            Rp. 10.000
          </td>
          <td class="text-size-small text-center">
            <el-button size="small" icon="el-icon-edit"></el-button>
            <el-button size="small" icon="el-icon-delete"></el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      dafault: "style"
    }
  }
};
</script>
