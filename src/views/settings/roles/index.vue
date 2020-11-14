<template>
  <div class="setting-roles">
    <div class="bg-white p-4">
      <h3 class="mt-0 mb-0">Pengaturan Hak Akses</h3>
    </div>

    <div class="content p-3">
      <div class="row mb-3">
        <div class="col d-flex align-items-center">
          <p class="m-0 font-weight-normal color-grey-500">
            Kelola aksesibilitas hak akses pengguna aplikasi.
          </p>
        </div>
        <div class="col text-right">
          <el-button
            @click="isDialog = true"
            type="primary"
            size="small"
            icon="el-icon-plus"
          >
            Tambah Hak Akses
          </el-button>
        </div>
      </div>

      <add-dialog :isDialog.sync="isDialog"></add-dialog>

      <roles-item></roles-item>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AddDialog: () => import("@/components/settings/roles/AddDialog"),
    RolesItem: () => import("@/components/settings/roles/RolesItem")
  },
  data: () => ({
    isDialog: false
  })
};
</script>
