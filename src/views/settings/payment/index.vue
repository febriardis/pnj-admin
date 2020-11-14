<template>
  <div class="dashboard">
    <div class="bg-white p-4">
      <h6 class="mb-0">Setting Payment Method</h6>
    </div>
    <div class="p-3">
      <div class="card-custom p-3">
        <div class="form-row">
          <div class="col d-flex align-items-center">
            <p class="m-0 font-weight-normal color-grey-500">
              Manage your payment method here.
            </p>
          </div>
          <div class="col text-right">
            <button
              type="button"
              @click="(state.paymentData = null), (state.isDialog = true)"
              class="btn btn-primary btn-sm"
            >
              <i class="fas fa-plus"></i>
              Add Payment Method
            </button>
          </div>
        </div>

        <!-- skeleton loader -->
        <f-placeholder v-if="payments.isLoading"></f-placeholder>
        <div class="items-content bg-white mt-2" v-else>
          <div class="form-row bg-grey-300">
            <div class="col text-center font-weight-500 border-right p-2">
              Bank Name
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Account Name
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Account Number
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Created at
            </div>
            <div class="col text-center font-weight-500 p-2">
              Action
            </div>
          </div>
          <div
            v-for="item in payments.list"
            :key="item.id"
            class="form-row bg-white border-bottom"
          >
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.bank_name }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.account_name }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.account_number }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.created_at | formatDate }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              <button
                type="button"
                @click="(state.paymentData = item), (state.isDialog = true)"
                class="btn btn-grey-100 btn-sm mr-2"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                type="button"
                @click="deletePayment(item.id)"
                class="btn btn-grey-100 btn-sm"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddPayment
      v-if="state.isDialog"
      :dialog.sync="state.isDialog"
      :fetchPayments="fetchPayments"
      :paymentData="state.paymentData"
    />
    <f-loading :value="response.isLoading"></f-loading>
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { utilities } from "@/controllers/utilities";
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  components: {
    AddPayment: () => import("@/components/settings/payment/AddPayment")
  },

  setup(props, ctx) {
    const { payments, fetchPayments } = utilities();
    const { form: response, deleteData } = handler();

    const state = reactive({
      datas: [],
      isDialog: false,
      paymentData: null
    });

    onMounted(() => {
      fetchPayments();
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          fetchPayments();
        }
      },
      { deep: true }
    );

    const deletePayment = async paymentId => {
      if (
        await ctx.root.$confirm({
          title: "Are you sure want to delete this payment method?",
          lbLabel: "Cancel",
          rbLabel: "Ok",
          forceStay: false
        })
      ) {
        deleteData(`/payment-method/${paymentId}`);
      }
    };

    return {
      state,
      payments,
      deletePayment,
      fetchPayments,
      response
    };
  }
};
</script>
