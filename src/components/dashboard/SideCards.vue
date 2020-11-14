<template>
  <div class="side-cards">
    <div class="card-custom p-3" style="background:#26a69a;color:#fff">
      <div class="form-row">
        <div class="col-3">
          <i class="fas fa-users" style="font-size:30px"></i>
        </div>
        <div class="col">
          <h6>Total Member</h6>
          <div class="form-row">
            <div class="col">
              <p class="mb-1 text-size-mini">Merchant</p>
            </div>
            <div class="col text-right">
              <p class="mb-1 font-weight-500">
                {{ credits.user.merchant }}
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <p class="mb-1 text-size-mini">User</p>
            <p class="mb-1 font-weight-500">
              {{ credits.user.user }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-custom p-3 mt-2" style="background:#ec407a;color:#fff">
      <div class="form-row">
        <div class="col-3">
          <i class="fas fa-random" style="font-size:30px"></i>
        </div>
        <div class="col">
          <h6>Total Transactions</h6>
          <div class="form-row">
            <div class="col">
              <p class="mb-1 text-size-mini">Success</p>
            </div>
            <div class="col text-right">
              <p class="mb-1 font-weight-500">
                {{ credits.transaction.success }}
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <p class="mb-1 text-size-mini">Pending</p>
            <p class="mb-1 font-weight-500">
              {{ credits.transaction.pending }}
            </p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="mb-1 text-size-mini">Failed</p>
            <p class="mb-1 font-weight-500">
              {{ credits.transaction.failed }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="card-custom p-3 mt-2" style="background:#29b6f6;color:#fff">
      <div class="text">
        <h6>On Hold Balance</h6>
        <ul v-if="credits.unDeposit.length > 0" class="holder-list">
          <li v-for="(item, index) in credits.unDeposit" :key="index">
            <p class="mb-1 text-size-mini">{{ item.name }}</p>
            <p class="font-weight-500">Rp. {{ item.total_amount | price }}</p>
          </li>
        </ul>
        <p class="mb-0 text-center" v-else>No Data</p>
      </div>
    </div>

    <div class="card-custom p-3 mt-2" style="background:#50ba49;color:#fff">
      <div class="text">
        <h6>Rank Sales</h6>
        <ul v-if="state.ranks.length > 0" class="ranks-list">
          <div
            class="d-flex justify-content-between text-size-small border-top position-sticky border-bottom mb-1"
            style="top:0;background:#50ba49;"
          >
            <p class="mb-1 font-weight-500">Code</p>
            <p class="mb-1 font-weight-500">Count</p>
          </div>
          <li
            v-for="(item, index) in state.ranks"
            :key="index"
            v-show="item.count"
            class="border-bottom"
          >
            <div class="d-flex justify-content-between">
              <p class="mb-2 text-size-mini">{{ item.code }}</p>
              <p class="mb-2 font-weight-500">{{ item.count | price }}</p>
            </div>
          </li>
        </ul>
        <p class="mb-0 text-center" v-else>No Data</p>
      </div>
    </div>
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  props: {
    credits: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { result, fetchData } = handler();

    const state = reactive({
      hello: "reso",
      ranks: []
    });

    watch(
      () => result.response,
      value => {
        if (value) {
          state.ranks = value;
        }
      },
      {
        deep: true
      }
    );

    onMounted(() => {
      fetchData("/home/info");
    });

    return {
      state,
      result
    };
  }
};
</script>

<style lang="scss">
.holder-list {
  padding-left: 28px;
  li {
    // list-style: none;
  }
}
.ranks-list {
  padding-left: 0;
  padding-right: 10px;
  overflow-y: scroll;
  max-height: 380px;
  li {
    list-style: none;
  }
}
</style>
