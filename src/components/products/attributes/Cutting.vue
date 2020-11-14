<template>
  <div class="row">
    <div class="col">
      <div class="card-custom p-3">
        <h4 class="mt-1 mb-1">Tambah Cutting</h4>
        <el-form
          :model="form"
          :rules="rules"
          ref="refForm"
          label-width="120px"
          class="demo-form"
        >
          <el-form-item label="Nama" prop="name">
            <el-input v-model="form.name" placeholder="Masukan nama"></el-input>
          </el-form-item>
          <el-form-item label="Harga" prop="name">
            <el-input
              type="number"
              v-model="form.price"
              placeholder="Masukan Harga"
            ></el-input>
          </el-form-item>
          <el-form-item class="mt-4 text-right">
            <el-button type="primary" size="small" @click="submitForm('form')"
              >Simpan</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="col">
      <attribute-list type="cutting" />
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/composition-api";
export default {
  components: {
    AttributeList: () => import("./ListAttribute")
  },
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
      name: null,
      file: null,
      price: null
    });

    const rules = reactive({
      name: [
        {
          required: true,
          message: "Please input name",
          trigger: "blur"
        }
      ],
      file: [
        {
          required: true,
          message: "Please select file",
          trigger: "blur"
        }
      ],
      price: [
        {
          required: true,
          message: "Please input price",
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
