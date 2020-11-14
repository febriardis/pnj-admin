<template>
  <div class="dashboard">
    <div class="bg-white p-4">
      <h3 class="mt-0 mb-0">Dashboard</h3>
    </div>

    <div class="p-3">
      <div class="form-row" v-if="result.isLoading">
        <div class="col-md-3 col-sm-12" v-for="item in 4" :key="item">
          <div class="card-custom d-flex p-3">
            <f-skeleton height="45px" width="45px" />
            <div class="text ml-3">
              <f-skeleton height="20px" width="150px" class="mb-2" />
              <f-skeleton height="20px" width="100px" />
            </div>
          </div>
        </div>
      </div>
      <div class="form-row" v-else-if="state.credits">
        <div class="col-12">
          <credit-cards :credits="state.credits" class="mb-2" />
        </div>
        <div class="col-md-9">
          <sales-statistic />
          <benefit-statistic />
        </div>
        <div class="col-md-3 col-sm-12">
          <side-cards :credits="state.credits" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { reactive } from "@vue/composition-api";

export default {
  components: {
    CreditCards: () => import("@/components/dashboard/CreditCards"),
    SideCards: () => import("@/components/dashboard/SideCards"),
    SalesStatistic: () => import("@/components/dashboard/SalesStatistic"),
    BenefitStatistic: () => import("@/components/dashboard/BenefitStatistic")
  },
  setup() {
    const { result } = handler();

    const state = reactive({
      credits: null
    });

    // watch(
    //   () => result,
    //   value => {
    //     if (value.response) {
    //       state.credits = value.response.data;
    //     }
    //   },
    //   {
    //     deep: true
    //   }
    // );

    // onMounted(() => {
    //   fetchData("/home/credit");
    // });

    return {
      state,
      result
    };
  }
};
</script>
