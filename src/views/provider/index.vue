<template>
  <div class="dashboard">
    <div class="bg-white p-4">
      <h6 class="mb-0">Providers</h6>
    </div>
    <div class="p-3">
      <div class="form-row">
        <div class="col d-flex align-items-center">
          <p class="m-0 font-weight-normal color-grey-500">
            Manage your applications provider here.
          </p>
        </div>
        <div class="col text-right">
          <button
            type="button"
            @click="state.isDialog = true"
            class="btn btn-primary btn-sm"
          >
            <i class="fas fa-plus"></i>
            Add Provider
          </button>
        </div>
      </div>

      <div v-if="!result.isLoading" class="form-row">
        <Provideritem
          v-for="item in state.datas"
          :key="item.id"
          :payload="item"
          :fetchProvider="fetchProviders"
        />
      </div>

      <div v-else class="form-row">
        <div v-for="item in 12" :key="item" class="col-md-3">
          <div class="card-custom m-2">
            <div class="card-content pb-0 bg-white">
              <f-skeleton height="100px" />
            </div>
            <div class="card-footer">
              <f-skeleton height="20px" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- add dialog -->
    <AddProvider
      :dialog.sync="state.isDialog"
      :fetchProvider="fetchProviders"
    />
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  components: {
    Provideritem: () => import("@/components/provider/Provideritem"),
    AddProvider: () => import("@/components/provider/AddProvider")
  },
  setup() {
    const { result, fetchData } = handler();

    const state = reactive({
      datas: [],
      pagination: null,
      isDialog: false
    });

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

    function fetchProviders() {
      fetchData("/provider");
    }

    onMounted(() => {
      fetchProviders();
    });

    return {
      state,
      result,
      fetchProviders
    };
  }
};
</script>
