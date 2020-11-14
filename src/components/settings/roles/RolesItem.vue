<template>
  <div class="card-custom p-2 text-size-small">
    <table class="table table-list table-bordered table-striped">
      <thead>
        <tr>
          <th class="text-size-small bg-white border-right">
            Nama Hak Akses
          </th>
          <th class="text-size-small bg-white border-right">
            Aksesibilitas
          </th>
          <th class="text-size-small bg-white border-right">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in 3" :key="index">
          <td class="text-size-small text-center">
            Admin Bandung
          </td>
          <td class="text-size-small text-center text-capitalize">
            <a href="#">Lihat</a>
          </td>
          <td class="text-size-small text-center">
            <el-button size="small" icon="el-icon-edit">Edit</el-button>
            <el-button size="small" icon="el-icon-delete">Delete</el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
