<template>
  <div>
    <table
      class="table table-list table-bordered table-striped"
      style="min-width:1500px"
    >
      <thead>
        <tr>
          <th
            class="text-size-small bg-white align-middle"
            width="7%"
            rowspan="2"
          >
            Transaction Time
          </th>
          <th class="text-size-small bg-white" colspan="3">
            Customer Details
          </th>
          <th class="text-size-small bg-white" colspan="3">
            Payment Method
          </th>
          <th
            class="text-size-small bg-white align-middle"
            width="5%"
            rowspan="2"
          >
            Amount
          </th>
          <th
            class="text-size-small bg-white align-middle"
            width="5%"
            rowspan="2"
          >
            Status
          </th>
          <th
            class="text-size-small bg-white align-middle"
            width="5%"
            rowspan="2"
          >
            Last Update
          </th>
          <th
            class="text-size-small bg-white align-middle table-sticky-column"
            width="6%"
            style="z-index: 3 !important"
            rowspan="2"
          >
            Action
          </th>
        </tr>
        <tr>
          <th class="text-size-small bg-white border-right" width="8%">Name</th>
          <th class="text-size-small bg-white border-right" width="8%">
            Email
          </th>
          <th class="text-size-small bg-white border-right" width="8%">
            Phone
          </th>
          <th class="text-size-small bg-white border-right" width="5%">
            Bank Name
          </th>
          <th class="text-size-small bg-white border-right" width="8%">
            Account Name
          </th>
          <th class="text-size-small bg-white border-right" width="6%">
            Account
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="transactions.length === 0">
          <td class="text-size-small text-center" colspan="8">
            No Data
          </td>
        </tr>
        <tr v-for="(item, index) in transactions" :key="index">
          <td class="text-size-small text-center">
            {{ item.created_at | formatDate("DD/MM/YYYY - HH:mm") }}
          </td>
          <td class="text-size-small text-center text-capitalize">
            {{ item.merchant ? item.merchant.user.name : "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.merchant ? item.merchant.user.email : "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.merchant ? item.merchant.user.phone : "-" }}
          </td>
          <td class="text-size-small text-center text-capitalize">
            {{ item.payment_method ? item.payment_method.bank_name : "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.payment_method ? item.payment_method.account_name : "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.payment_method ? item.payment_method.account_number : "-" }}
          </td>
          <td class="text-size-small text-center">
            Rp.{{ (item.amount + item.unique_code) | price }}
          </td>
          <td class="text-size-small text-center">
            <p
              class="mb-0 text-capitalize"
              :class="
                item.status === 'PAID'
                  ? 'color-green'
                  : item.status === 'PENDING'
                  ? 'color-yellow-800'
                  : 'color-red-500'
              "
            >
              {{ item.status | lowercase }}
            </p>
          </td>
          <td class="text-size-small text-center">
            {{ item.updated_at | formatDate }}
          </td>
          <td class="text-size-small text-center table-sticky-column">
            <div class="action" v-if="item.status === 'PENDING'">
              <button
                type="button"
                @click="topupAction(item.id, 'PAID')"
                class="btn btn-success btn-sm btn-block mb-1"
              >
                Approve
              </button>
              <button
                type="button"
                @click="topupAction(item.id, 'CANCEL')"
                class="btn btn-danger btn-sm btn-block"
              >
                Reject
              </button>
            </div>
            <div
              class="action"
              v-else-if="item.status === 'PAID' && !item.deposited"
            >
              <button
                type="button"
                @click="topupAction(item.id, 'deposit')"
                class="btn btn-primary btn-sm btn-block mb-1"
              >
                Deposit
              </button>
            </div>
            <p v-else>No Action</p>
          </td>
        </tr>
      </tbody>
    </table>

    <f-loading :value="response.isLoading"></f-loading>
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { watch } from "@vue/composition-api";

export default {
  props: {
    transactions: {
      type: Array
    },
    fetchTransactions: {
      type: Function
    }
  },

  setup(props, ctx) {
    const { form: response, putData } = handler();

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          props.fetchTransactions();
        }
      },
      { deep: true }
    );

    const topupAction = async (topup_id, status) => {
      if (
        await ctx.root.$confirm({
          title: "Are you sure for this action?",
          lbLabel: "Cancel",
          rbLabel: "Ok",
          forceStay: false
        })
      ) {
        if (status === "deposit") {
          putData(`/transaction/topup/deposit/${topup_id}`, {
            status: true
          });
        } else {
          putData(`/transaction/topup/${topup_id}`, {
            status: status
          });
        }
      }
    };

    return {
      topupAction,
      response
    };
  }
};
</script>
