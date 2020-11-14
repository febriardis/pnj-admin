<template>
  <div class="setting-profile p-4">
    <div class="card-custom p-4">
      <div class="row">
        <div class="col-md-4">
          <f-upload-image
            isCenter
            v-model="form.file"
            height="200px"
            width="200px"
          ></f-upload-image>
        </div>
        <div class="col-md-8">
          <h3 class="mt-2 mb-2">Atur Profil Saya</h3>
          <p class="mt-0 text-size-small text-color-gray">
            Kelola informasi profil Anda untuk mengontrol, melindungi dan
            mengamankan akun
          </p>
          <el-form
            class="demo-refForm"
            :model="form"
            :rules="rules"
            ref="refForm"
            label-width="120px"
          >
            <el-form-item label="Nama" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Telepon" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-button
              class="mt-3"
              size="small"
              type="primary"
              @click="submitForm()"
              >Simpan</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  setup(_, ctx) {
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });

    const rules = reactive({
      name: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur"
        },
        {
          min: 3,
          max: 5,
          message: "Length should be 3 to 5",
          trigger: "blur"
        }
      ]
    });

    const refForm = ref(null);

    function submitForm() {
      refForm.value.validate(valid => {
        if (!valid) {
          const errorFirst = ctx.root.$el.querySelector(".el-form-item__error");
          if (errorFirst) {
            errorFirst.scrollIntoView({ behavior: "smooth" });
            errorFirst.focus();
          }
        } else {
          alert("submit!");
        }
      });
    }

    return {
      form,
      rules,
      refForm,
      submitForm
    };
  }
};
</script>
