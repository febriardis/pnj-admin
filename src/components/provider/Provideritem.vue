<template>
  <div class="col-md-3 col-sm-6">
    <div class="provider-items card-custom pt-3 m-2">
      <div class="card-head pt-0 pb-0 bg-white card-banner position-relative">
        <img :src="payload.logo" class="img-banner border" alt="" />
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
              @click="
                $router.push({
                  name: 'provider-detail',
                  params: { provider_id: payload.id }
                })
              "
              class="btn btn-grey-100 btn-sm mr-2"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              type="button"
              @click="state.isEditDialog = true"
              class="btn btn-grey-100 btn-sm mr-2"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              type="button"
              @click="deleteProvider()"
              class="btn btn-grey-100 btn-sm"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </a>
      </div>
      <div class="card-footer pt-2">
        <p class="mb-0 font-weight-500">
          {{ payload.name }}
        </p>
      </div>
      <ChangeProvider
        v-if="state.isEditDialog"
        :dialog.sync="state.isEditDialog"
        :providerData="payload"
        :fetchProvider="fetchProvider"
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
    ChangeProvider: () => import("@/components/provider/AddProvider")
  },

  props: {
    payload: {
      typdeleteProvidere: Object
    },
    fetchProvider: {
      type: Function
    }
  },

  setup(props, ctx) {
    const { form: response, deleteData } = handler();

    const state = reactive({
      isEditDialog: false,
      isActionActive: false
    });

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          props.fetchProvider();
        }
      },
      { deep: true }
    );

    const deleteProvider = async () => {
      if (
        await ctx.root.$confirm({
          title: "Are you sure want to delete this provider?",
          lbLabel: "Cancel",
          rbLabel: "Ok",
          forceStay: false
        })
      ) {
        deleteData(`/provider/${props.payload.id}`);
      }
    };

    return {
      state,
      response,
      deleteProvider
    };
  }
};
</script>

<style lang="scss">
.provider-items {
  .img-banner {
    width: 100%;
    height: 100px;
    object-fit: contain;
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
