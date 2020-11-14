<template>
  <f-dialog :value.sync="modal" width="380px">
    <div class="card-custom">
      <div class="card-head d-flex align-items-center justify-content-between">
        <p class="mb-0 font-weight-bold">Add Banner</p>
        <button
          type="button"
          class="btn btn-grey-100 btn-sm"
          @click="modal = false"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="card-content">
        <div class="form-group">
          <f-upload-image
            v-model="form.file"
            height="200px"
            :previewImage="bannerData ? bannerData.image : null"
          ></f-upload-image>
        </div>

        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Description</label>
          <textarea
            v-model="form.description"
            placeholder="input banner description"
            class="form-control"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group text-right">
          <button
            @click="bannerData ? update() : submit()"
            type="button"
            class="btn btn-primary btn-sm"
          >
            {{ bannerData ? "Save Changes" : "Submit Banner" }}
          </button>
        </div>
      </div>
    </div>
    <f-loading :value="response.isLoading"></f-loading>
  </f-dialog>
</template>

<script>
import { handler } from "@/controllers/handler";
import { computed, onMounted, reactive, watch } from "@vue/composition-api";

export default {
  props: {
    dialog: {
      type: Boolean
    },

    bannerData: {
      type: Object
    },

    fetchBanners: {
      type: Function
    }
  },

  setup(props, { emit }) {
    const { form: response, postData } = handler();

    const form = reactive({
      file: null,
      description: null
    });

    const modal = computed({
      get: () => {
        return props.dialog;
      },
      set: val => {
        emit("update:dialog", val);
      }
    });

    onMounted(() => {
      if (props.bannerData) {
        form.description = props.bannerData.description;
      }
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          emit("update:dialog", false);
          props.fetchBanners();
        }
      },
      { deep: true }
    );

    function submit() {
      let fd = new FormData();
      fd.append("image", form.file);
      fd.append("description", form.description);
      postData("/banner", fd);
    }

    function update() {
      let fd = new FormData();
      if (form.logo) {
        fd.append("image", form.file);
      }
      fd.append("description", form.description);
      postData(`/banner/${props.bannerData.id}`, fd);
    }

    return {
      modal,
      form,
      submit,
      update,
      response
    };
  }
};
</script>
