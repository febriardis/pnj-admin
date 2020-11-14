<template>
  <f-dialog :value.sync="modal" width="400px">
    <div class="card-custom">
      <div class="card-head d-flex align-items-center justify-content-between">
        <p class="mb-0 font-weight-bold">Add Payment Method</p>
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
          <label for="forDesc" class="font-weight-500">Bank Name</label>
          <input
            type="text"
            v-model="form.bank_name"
            class="form-control"
            placeholder="Input Bank Name"
          />
        </div>

        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Account Name</label>
          <input
            type="text"
            v-model="form.account_name"
            class="form-control"
            placeholder="Input Account Name"
          />
        </div>
        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Account Number</label>
          <input
            type="number"
            v-model="form.account_number"
            class="form-control"
            placeholder="Input Account Number"
          />
        </div>

        <div class="form-group text-right">
          <button
            @click="paymentData ? update() : submit()"
            type="button"
            class="btn btn-primary btn-sm"
          >
            {{ paymentData ? "Save Changes" : "Submit" }}
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

    paymentData: {
      type: Object
    },

    fetchPayments: {
      type: Function
    }
  },

  setup(props, { emit }) {
    const { form: response, postData } = handler();

    const form = reactive({
      bank_name: null,
      account_name: null,
      account_number: null
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
      if (props.paymentData) {
        form.bank_name = props.paymentData.bank_name;
        form.account_name = props.paymentData.account_name;
        form.account_number = props.paymentData.account_number;
      }
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          emit("update:dialog", false);
          props.fetchPayments();
        }
      },
      { deep: true }
    );

    function submit() {
      postData("/payment-method", form);
    }

    function update() {
      postData(`/payment-method/${props.paymentData.id}`, form);
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
