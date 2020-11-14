<template>
  <el-dialog
    title="Tambah Hak Akses"
    :visible.sync="visibleDialog"
    width="500px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      label-width="120px"
      class="demo-form"
    >
      <el-form-item label="Nama Hak Akses" prop="name">
        <el-input
          v-model="form.name"
          placeholder="Masukan nama hak hkses"
        ></el-input>
      </el-form-item>
      <el-form-item label="Aksesibilitas" prop="accessibility">
        <el-checkbox
          v-model="accessibility"
          v-for="(item, i) in state.accessibilityList"
          :key="i"
          >{{ item.name }}</el-checkbox
        >
      </el-form-item>
      <el-form-item class="mt-4 text-right">
        <el-button size="small" @click="visibleDialog = false">Batal</el-button>
        <el-button type="primary" size="small" @click="submitForm('form')"
          >Simpan</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { computed, reactive, ref } from "@vue/composition-api";
export default {
  props: {
    isDialog: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const form = reactive({
      name: null,
      accessibility: null
    });

    const state = reactive({
      accessibilityList: [
        { value: null, name: "Pesanan Online" },
        { value: null, name: "Pesanan Offline" },
        { value: null, name: "Add Product" },
        { value: null, name: "Daftar Product" },
        { value: null, name: "Pengaturan Profile" },
        { value: null, name: "Pengaturan Hak Akses" },
        { value: null, name: "Pengaturan Pengguna" }
      ]
    });

    const rules = reactive({
      name: [
        {
          required: true,
          message: "Please input name",
          trigger: "blur"
        }
      ],
      accessibility: [
        {
          required: true,
          message: "Please select accessibility",
          trigger: "blur"
        }
      ]
    });

    const visibleDialog = computed({
      get: () => {
        return props.isDialog;
      },
      set: val => {
        emit("update:isDialog", val);
      }
    });

    const refForm = ref(null);

    function submitForm() {
      refForm.value.validate(valid => {
        if (valid) {
          alert("submit!");
        }
      });
    }

    return {
      state,
      form,
      rules,
      refForm,
      submitForm,
      visibleDialog
    };
  }
};
</script>
