<template>
  <el-dialog
    title="Tambah Pengguna"
    :visible.sync="visibleDialog"
    width="380px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      label-width="120px"
      class="demo-form"
    >
      <el-form-item label="Name" prop="role">
        <el-select
          v-model="form.role"
          class="w-100"
          placeholder="Pilih Hak Akses"
        >
          <el-option
            v-for="item in state.roles"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" placeholder="Masukan name"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Masukan email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="form.password"
          placeholder="Masukan Password"
        ></el-input>
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
    const state = reactive({
      roles: [
        { id: 1, name: "Super Admin" },
        { id: 2, name: "Admin Bandung" },
        { id: 3, name: "Admin Jakarta" }
      ]
    });

    const form = reactive({
      role: null,
      name: null,
      email: null,
      password: null
    });

    const rules = reactive({
      role: [
        {
          required: true,
          message: "Please select role",
          trigger: "blur"
        }
      ],
      name: [
        {
          required: true,
          message: "Please input name",
          trigger: "blur"
        }
      ],
      email: [
        {
          required: true,
          message: "Please input email",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "Please input password",
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
