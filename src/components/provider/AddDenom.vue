<template>
  <f-dialog :value.sync="modal" width="420px">
    <div class="card-custom">
      <div class="card-head d-flex align-items-center justify-content-between">
        <p class="mb-0 font-weight-bold">
          {{ denomData ? "Edit" : "Add" }} Denom
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
          <label for="forDesc" class="font-weight-500">Code</label>
          <input
            type="type"
            v-model="form.code"
            class="form-control"
            placeholder="Input denom code"
          />
        </div>
        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Status</label>
          <div class="f-nav-toggle">
            <a
              class="nav-item"
              style="flex-basis:50%;border-radius:4px 0 0 4px"
              :class="{ active: form.status === false }"
              @click="form.status = false"
              >Inactive</a
            >
            <a
              class="nav-item"
              style="flex-basis:50%;border-radius:0 4px 4px 0"
              :class="{ active: form.status === true }"
              @click="form.status = true"
              >Active</a
            >
          </div>
        </div>
        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Amount</label>
          <input
            type="text"
            v-model="form.amount"
            class="form-control"
            placeholder="Input amount"
          />
        </div>
        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Admin Fee</label>
          <input
            type="number"
            v-model="form.admin_fee"
            class="form-control"
            placeholder="Input admin fee"
          />
        </div>

        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Price</label>
          <input
            type="number"
            v-model="form.price"
            class="form-control"
            placeholder="Input price"
          />
        </div>

        <div class="form-group text-right">
          <button
            @click="!denomData ? submit() : update()"
            type="button"
            class="btn btn-primary btn-sm"
          >
            {{ denomData ? "Save Changes" : "Submit Denom" }}
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

    providerId: {
      type: Number
    },

    denomData: {
      type: Object
    },

    fetchProviderById: {
      type: Function
    }
  },

  setup(props, { emit }) {
    const { form: response, postData } = handler();

    const form = reactive({
      provider_id: null,
      admin_fee: null,
      status: true,
      price: 0,
      amount: null,
      code: null
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
      if (props.denomData) {
        form.provider_id = props.providerId;
        form.admin_fee = props.denomData.admin_fee;
        form.status = props.denomData.status ? true : false;
        // form.price = props.denomData.price;
        form.amount = props.denomData.amount;
        form.code = props.denomData.code;
      }
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          emit("update:dialog", false);
          props.fetchProviderById();
        }
      },
      { deep: true }
    );

    function submit() {
      form.provider_id = props.providerId;
      postData("/denom", form);
    }

    function update() {
      postData(`/denom/${props.denomData.id}`, form);
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
