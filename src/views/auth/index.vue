<template>
  <div class="login">
    <div class="row justify-content-md-center">
      <div class="col-md-4">
        <div class="form-login-card mt-5">
          <div class="content text-center">
            <img
              src="../../assets/media/logo/pnj-blue.png"
              width="180"
              height="auto"
            />
            <h3 class="mt-2 mb-2">Login Admin</h3>
            <el-form
              :model="form"
              :rules="rules"
              ref="refForm"
              label-width="120px"
              class="demo-form"
            >
              <el-form-item label="Email" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="Masukan email"
                ></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="Masukan Password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="mt-3 w-100"
                  @click="submitForm('form')"
                  >Masuk</el-button
                >
              </el-form-item>
            </el-form>

            <!-- <p
              class="color-grey-400 position-absolute text-size-mini text-center"
              style="bottom:0"
            >
              &copy; Copyright Pridenjoy.
            </p> -->
          </div>
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
      name: ""
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
        this.$router.push({ name: "dashboard" });
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

<style lang="scss">
.login {
  height: 100vh;
  // background-image: url("../../assets/media/banner.jpg");
  // background-size: cover;
  // background-position: 50%;
}

.form-login-card {
  border: 1px solid #e0e0e0;
  border-radius: 3px !important;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 24px 40px 32px;
  background: #ffffff;
}
</style>
