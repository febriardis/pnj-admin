<template>
  <f-dialog :value.sync="modal" width="400px">
    <div class="card-custom">
      <div class="card-head d-flex align-items-center justify-content-between">
        <p class="mb-0 font-weight-bold">
          {{ menuData ? "Edit" : "Add" }} Menu
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
          <label for="forDesc" class="font-weight-500">Menu Name</label>
          <input
            type="text"
            v-model="form.name"
            class="form-control"
            placeholder="Input name"
          />
        </div>

        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Status</label>
          <div class="f-nav-toggle">
            <a
              class="nav-item"
              style="flex-basis:50%;border-radius:4px 0 0 4px"
              :class="{ active: form.status === 0 }"
              @click="form.status = 0"
              >Inactive</a
            >
            <a
              class="nav-item"
              style="flex-basis:50%;border-radius:0 4px 4px 0"
              :class="{ active: form.status === 1 }"
              @click="form.status = 1"
              >Active</a
            >
          </div>
        </div>
        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Type</label>
          <input
            type="text"
            v-model="form.type"
            class="form-control"
            placeholder="Input type"
          />
        </div>
        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Route</label>
          <input
            type="text"
            v-model="form.route"
            class="form-control"
            placeholder="Input route link"
          />
        </div>

        <div class="form-group">
          <f-upload-image
            v-model="form.icon"
            label="Icon"
            width="100px"
            height="100px"
            :previewImage="menuData ? menuData.icon : null"
          ></f-upload-image>
        </div>

        <div class="form-group text-right">
          <button
            @click="menuData ? update() : submit()"
            type="button"
            class="btn btn-primary btn-sm"
          >
            {{ menuData ? "Save Changes" : "Submit" }}
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

    menuData: {
      type: Object
    },

    fetchMenus: {
      type: Function
    }
  },

  setup(props, { emit }) {
    const { form: response, postData } = handler();

    const form = reactive({
      icon: null,
      name: null,
      status: 0,
      route: null,
      type: null
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
      if (props.menuData) {
        form.name = props.menuData.name;
        form.status = props.menuData.status;
        form.route = props.menuData.route;
        form.type = props.menuData.type;
      }
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          emit("update:dialog", false);
          props.fetchMenus();
        }
      },
      { deep: true }
    );

    function submit() {
      let fd = new FormData();
      fd.append("icon", form.icon);
      fd.append("name", form.name);
      fd.append("status", form.status);
      fd.append("route", form.route);
      fd.append("type", form.type);

      postData("/menu", fd);
    }

    function update() {
      let fd = new FormData();
      if (form.icon) {
        fd.append("icon", form.icon);
      }
      fd.append("name", form.name);
      fd.append("status", form.status);
      fd.append("route", form.route);
      fd.append("type", form.type);
      postData(`/menu/${props.menuData.id}`, fd);
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
