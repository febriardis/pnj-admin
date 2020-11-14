<template>
  <f-dialog :value.sync="modal" width="400px">
    <div class="card-custom">
      <div class="card-head d-flex align-items-center justify-content-between">
        <p class="mb-0 font-weight-bold">Top Up</p>
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
          <label for="forDesc" class="font-weight-500">Select Merchant</label>
          <select v-model="form.merchant_id" class="form-control">
            <option :value="null" disabled>Select</option>
            <option v-for="(n, i) in merchants.list" :key="i" :value="n.id">{{
              n.name + " (" + n.user + ")"
            }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Payment Method</label>
          <select v-model="form.payment_method_id" class="form-control">
            <option :value="null" disabled>Select</option>
            <option v-for="(n, i) in payments.list" :key="i" :value="n.id">{{
              n.account_name + " (" + n.bank_name + ")"
            }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="forDesc" class="font-weight-500">Amount</label>
          <input
            type="number"
            v-model="form.amount"
            class="form-control"
            placeholder="Input amount"
          />
        </div>

        <div class="form-group text-right">
          <button
            @click="submit()"
            type="button"
            class="btn btn-primary btn-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <f-loading :value="response.isLoading"></f-loading>
  </f-dialog>
</template>

<script>
import { handler } from "@/controllers/handler";
import { utilities } from "@/controllers/utilities";
import { computed, onMounted, reactive, watch } from "@vue/composition-api";

export default {
  props: {
    dialog: {
      type: Boolean
    },
    fetchTransactions: {
      type: Function
    }
  },

  setup(props, { emit }) {
    const { merchants, fetchMerchants, payments, fetchPayments } = utilities();
    const { form: response, postData } = handler();

    const form = reactive({
      merchant_id: null,
      payment_method_id: null,
      amount: null
    });

    let modal = computed({
      get: () => {
        return props.dialog;
      },
      set: val => {
        emit("update:dialog", val);
      }
    });

    onMounted(() => {
      fetchMerchants();
      fetchPayments();
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          emit("update:dialog", false);
          props.fetchTransactions();
        }
      },
      { deep: true }
    );

    function submit() {
      postData("/transaction/topup", form);
    }

    return {
      modal,
      form,
      payments,
      merchants,
      submit,
      response
    };
  }
};
</script>
