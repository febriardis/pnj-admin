<template>
  <f-dialog :value.sync="modal" width="400px">
    <div class="card-custom">
      <div class="card-head d-flex align-items-center justify-content-between">
        <p class="mb-0 font-weight-bold">
          {{ providerData ? "Change" : "Add" }} Provider
        </p>
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
          <label for="forDesc" class="font-weight-500">Provider Name</label>
          <input
            type="text"
            v-model="form.name"
            placeholder="input name"
            class="form-control"
            rows="4"
          />
        </div>
        <div class="form-group">
          <f-upload-image
            v-model="form.logo"
            width="180px"
            height="150px"
            :previewImage="providerData ? providerData.logo : null"
          ></f-upload-image>
        </div>

        <div class="form-group text-right">
          <button
            @click="providerData ? update() : submit()"
            type="button"
            class="btn btn-primary btn-sm"
          >
            {{ providerData ? "Save Change" : "Submit Provider" }}
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
    fetchProvider: {
      type: Function
    },
    providerData: {
      type: Object
    }
  },

  setup(props, { emit }) {
    const { form: response, postData } = handler();

    const form = reactive({
      logo: null,
      name: null
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
      if (props.providerData) {
        form.name = props.providerData.name;
      }
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          emit("update:dialog", false);
          props.fetchProvider();
        }
      },
      { deep: true }
    );

    function submit() {
      let fd = new FormData();
      fd.append("logo", form.logo);
      fd.append("name", form.name);
      postData("/provider", fd);
    }

    function update() {
      let fd = new FormData();
      if (form.logo) {
        fd.append("logo", form.logo);
      }
      fd.append("name", form.name);
      postData(`/provider/${props.providerData.id}`, fd);
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
