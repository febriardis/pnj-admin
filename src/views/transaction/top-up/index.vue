<template>
  <div class="dashboard">
    <div class="bg-white p-4">
      <h6 class="mb-0">Top up List</h6>
    </div>
    <div class="p-3">
      <div class="card-custom p-3">
        <div class="form-row mb-2">
          <div class="col">
            <p class="m-0 font-weight-normal color-grey-500">
              Manage user top up for approve or reject.
            </p>
          </div>
          <div class="col text-right">
            <button
              type="button"
              @click="state.isDialog = true"
              class="btn btn-primary btn-sm"
            >
              <i class="fas fa-plus"></i>
              Top Up
            </button>
          </div>
        </div>
        <f-placeholder v-if="result.isLoading"></f-placeholder>
        <div class="tableFixHead" v-else>
          <TableTransaction
            :transactions="state.datas"
            :fetchTransactions="fetchTransactions"
          />
        </div>
        <f-pagination
          v-if="state.pagination"
          class="mt-3"
          v-model="filter.page"
          :totalPage="state.pagination.total_page"
        ></f-pagination>
      </div>
    </div>

    <TopupDialog
      v-if="state.isDialog"
      :dialog.sync="state.isDialog"
      :fetchTransactions="fetchTransactions"
    />
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  components: {
    TableTransaction: () => import("@/components/transaction/TableTopup"),
    TopupDialog: () => import("@/components/transaction/TopupDialog")
  },
  setup() {
    const { result, fetchData } = handler();
    const filter = reactive({
      page: 0
    });

    const state = reactive({
      isDialog: false,
      datas: [],
      pagination: null
    });

    watch(
      () => filter,
      () => {
        fetchTransactions();
      },
      {
        deep: true
      }
    );

    watch(
      () => result,
      value => {
        if (value.response) {
          state.datas = value.response.data;
          state.pagination = value.response.paging;
        }
      },
      {
        deep: true
      }
    );

    function fetchTransactions() {
      fetchData("/transaction/topup", filter);
    }

    onMounted(() => {
      fetchTransactions();
    });

    return {
      filter,
      state,
      result,
      fetchTransactions
    };
  }
};
</script>
