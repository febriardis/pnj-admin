<template>
  <div class="col-md-4">
    <div class="banner-items card-custom pt-3 m-2">
      <div class="card-head pt-0 pb-0 bg-white card-banner position-relative">
        <img :src="payload.image" class="img-banner" alt="" />
        <a
          href="javascript:void(0)"
          @mouseover="state.isActionActive = true"
          @mouseout="state.isActionActive = false"
          class="placeholder-action"
        >
          <div
            :class="state.isActionActive ? 'd-flex' : 'd-none'"
            class="justify-content-center align-items-center h-100"
          >
            <button
              type="button"
              @click="state.isDialog = true"
              class="btn btn-grey-100 btn-sm mr-2"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              type="button"
              @click="deleteBanner()"
              class="btn btn-grey-100 btn-sm"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </a>
      </div>
      <div class="card-footer pt-2">
        <p class="mb-0 font-weight-500">
          {{ payload.description }}
        </p>
      </div>

      <ChangeBanner
        v-if="state.isDialog"
        :dialog.sync="state.isDialog"
        :fetchBanners="fetchBanners"
        :bannerData="payload"
      />
    </div>
    <f-loading :value="response.isLoading"></f-loading>
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { reactive, watch } from "@vue/composition-api";

export default {
  components: {
    ChangeBanner: () => import("./AddBanner")
  },

  props: {
    payload: {
      type: Object
    },
    fetchBanners: {
      type: Function
    }
  },

  setup(props, ctx) {
    const { form: response, deleteData } = handler();

    const state = reactive({
      isDialog: false,
      isActionActive: false
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          props.fetchBanners();
        }
      },
      { deep: true }
    );

    const deleteBanner = async () => {
      if (
        await ctx.root.$confirm({
          title: "Are you sure want to delete this banner?",
          lbLabel: "Cancel",
          rbLabel: "Ok",
          forceStay: false
        })
      ) {
        deleteData(`/banner/${props.payload.id}`);
      }
    };

    return {
      state,
      deleteBanner,
      response
    };
  }
};
</script>

<style lang="scss">
.banner-items {
  .img-banner {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  .placeholder-action {
    text-decoration: none;
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    &.active,
    &:hover {
      background: rgba(0, 0, 0, 0.3);
      text-decoration: none;
    }
  }
}
</style>
