<template>
  <div class="add-prouduct">
    <div class="bg-white p-4">
      <h3 class="mt-0 mb-0">Tambah Produk</h3>
    </div>
    <div class="mt-3 pt-3 pl-5 pr-5">
      <div class="card-custom p-3">
        <el-form
          :model="form"
          :rules="rules"
          ref="refForm"
          label-width="120px"
          class="demo-form"
        >
          <div class="row">
            <div class="col">
              <el-form-item label="Nama" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="Masukan nama"
                ></el-input>
              </el-form-item>
            </div>
            <div class="col">
              <el-form-item label="Cutting" prop="name">
                <f-select-field-tag class="w-100" placeholder="Select Cutting">
                  <el-option
                    v-for="item in state.roles"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </f-select-field-tag>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <el-form-item label="Fabric" prop="name">
                <f-select-field-tag class="w-100" placeholder="Select Fabric">
                  <el-option
                    v-for="item in state.roles"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </f-select-field-tag>
              </el-form-item>
            </div>
            <div class="col">
              <el-form-item label="Stitch" prop="name">
                <f-select-field-tag class="w-100" placeholder="Select Cutting">
                  <el-option
                    v-for="item in state.roles"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </f-select-field-tag>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <el-form-item label="Size" prop="name">
                <f-select-field-tag class="w-100" placeholder="Select Cutting">
                  <el-option
                    v-for="item in state.roles"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </f-select-field-tag>
              </el-form-item>
            </div>

            <div class="col">
              <el-form-item label="Harga" prop="name">
                <el-input
                  type="number"
                  v-model="form.price"
                  placeholder="Masukan Harga"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="File 3D" prop="file">
            <el-input
              type="file"
              v-model="form.file"
              placeholder="Pilih File"
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
  </div>
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
