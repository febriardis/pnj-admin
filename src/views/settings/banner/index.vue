<template>
  <div class="dashboard">
    <div class="bg-white p-4">
      <h6 class="mb-0">Setting Banner</h6>
    </div>
    <div class="p-3">
      <div class="form-row mb-2">
        <div class="col d-flex align-items-center">
          <p class="m-0 font-weight-normal color-grey-500">
            Manage your applications banner here.
          </p>
        </div>
        <div class="col text-right">
          <button
            type="button"
            @click="state.isDialog = true"
            class="btn btn-primary btn-sm"
          >
            <i class="fas fa-plus"></i>
            Add Banner
          </button>
        </div>
      </div>

      <div class="form-row" v-if="result.isLoading">
        <div v-for="item in 6" :key="item" class="col-md-3">
          <div class="card-custom m-2">
            <div class="card-content pb-0 bg-white">
              <f-skeleton height="130px" />
            </div>
            <div class="card-footer">
              <f-skeleton height="20px" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-row" v-else>
        <BannerItems
          v-for="item in state.datas"
          :key="item.id"
          :payload="item"
          :fetchBanners="fetchBanners"
        />
      </div>
    </div>

    <!-- add dialog -->
    <AddBanner :dialog.sync="state.isDialog" :fetchBanners="fetchBanners" />
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  components: {
    BannerItems: () => import("@/components/settings/banner/Banneritem"),
    AddBanner: () => import("@/components/settings/banner/AddBanner")
  },
  setup() {
    const { result, fetchData } = handler();

    const state = reactive({
      isDialog: false,
      datas: []
    });

    watch(
      () => result,
      value => {
        if (value.response) {
          state.datas = value.response.data;
        }
      },
      {
        deep: true
      }
    );

    function fetchBanners() {
      fetchData("/banner");
    }

    onMounted(() => {
      fetchBanners();
    });

    return {
      state,
      result,
      fetchBanners
    };
  }
};
</script>
