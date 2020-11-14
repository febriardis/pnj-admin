<template>
  <div class="dashboard">
    <div class="bg-white p-4">
      <h6 class="mb-0">Transaction List</h6>
    </div>

    <div class="p-3">
      <div class="card-custom p-3">
        <div class="form-row mb-2">
          <div class="col-md-3 ">
            <select v-model="filter.type" class="form-control">
              <option
                v-for="(item, i) in transactions_type"
                :key="i"
                :value="item.type"
                >{{ item.name }}</option
              >
            </select>
          </div>
        </div>

        <f-placeholder v-if="result.isLoading"></f-placeholder>
        <div class="tableFixHead" v-else>
          <TableTransaction :transactions="state.datas" />
        </div>
        <f-pagination
          class="mt-3"
          v-if="state.pagination"
          v-model="filter.page"
          :totalPage="state.pagination.total_page"
        ></f-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { utilities } from "@/controllers/utilities";
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  components: {
    TableTransaction: () => import("@/components/transaction/TableTransactions")
  },
  setup() {
    const { result, fetchData } = handler();
    const { transactions_type } = utilities();

    const filter = reactive({
      type: "",
      page: 0
    });

    const state = reactive({
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
      fetchData("/transaction", filter);
    }

    onMounted(() => {
      fetchTransactions();
    });

    return {
      filter,
      state,
      result,
      transactions_type
    };
  }
};
</script>
