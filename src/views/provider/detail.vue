<template>
  <div class="dashboard">
    <div class="bg-white p-4">
      <div class="d-flex align-items-center">
        <button type="button" @click="$router.back()" class="btn btn-sm mr-2">
          <i class="fas fa-chevron-left"></i>
        </button>
        <p class="mb-0 font-weight-500">
          View {{ state.payload ? state.payload.name : null }} Provider
        </p>
      </div>
    </div>
    <div class="breadcrumb-line-light">
      <p class="mb-0 font-weight-500">Denom List</p>
    </div>

    <div class="card-custom">
      <div class="card-content">
        <div class="form-row">
          <div class="col d-flex align-items-center">
            <p class="m-0 font-weight-normal color-grey-500">
              Manage your denom here.
            </p>
          </div>
          <div class="col text-right">
            <button
              type="button"
              @click="(state.denomData = null), (state.isDialog = true)"
              class="btn btn-primary btn-sm"
            >
              <i class="fas fa-plus"></i>
              Add Denom
            </button>
          </div>
        </div>

        <f-placeholder v-if="result.isLoading"></f-placeholder>

        <div v-else-if="state.payload" class="items-content bg-white mt-2">
          <div class="form-row bg-grey-300 m-0">
            <div class="col text-center font-weight-500 border-right p-2">
              Code
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Amount
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Price
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Admin Fee
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Status
            </div>
            <div class="col text-center font-weight-500 p-2">
              Action
            </div>
          </div>
          <div
            v-for="item in state.payload.denom"
            :key="item.id"
            class="form-row border-bottom"
          >
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.code }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.amount }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              Rp. {{ item.price | price }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              Rp. {{ item.admin_fee | price }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.status ? "Active" : "Inactive" }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal p-2"
            >
              <button
                type="button"
                @click="(state.denomData = item), (state.isDialog = true)"
                class="btn btn-grey-100 btn-sm mr-2"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                type="button"
                @click="deleteDenom(item.id)"
                class="btn btn-grey-100 btn-sm"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <!-- pagination -->
      </div>
    </div>

    <!-- add dialog -->
    <AddDenom
      v-if="state.isDialog"
      :dialog.sync="state.isDialog"
      :fetchProviderById="fetchProviderById"
      :denomData="state.denomData"
      :providerId="state.payload.id"
    />

    <f-loading :value="response.isLoading"></f-loading>
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  components: {
    AddDenom: () => import("@/components/provider/AddDenom")
  },
  setup(_, ctx) {
    const { result, fetchData, form: response, deleteData } = handler();

    const state = reactive({
      payload: null,
      denomData: null,
      isDialog: false,
      providerId: ctx.root.$route.params.provider_id
    });

    watch(
      () => result,
      value => {
        if (value.response) {
          state.payload = value.response.data;
        }
      },
      {
        deep: true
      }
    );

    function fetchProviderById() {
      fetchData(`/provider/${state.providerId}`);
    }

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          fetchProviderById();
        }
      },
      { deep: true }
    );

    const deleteDenom = async denomId => {
      if (
        await ctx.root.$confirm({
          title: "Are you sure want to delete this denom?",
          lbLabel: "Cancel",
          rbLabel: "Ok",
          forceStay: false
        })
      ) {
        deleteData(`/denom/${denomId}`);
      }
    };

    onMounted(() => {
      fetchProviderById();
    });

    return {
      state,
      result,
      deleteDenom,
      response,
      fetchProviderById
    };
  }
};
</script>
