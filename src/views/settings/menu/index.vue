<template>
  <div class="dashboard">
    <div class="bg-white p-4">
      <h6 class="mb-0">Setting Menu</h6>
    </div>
    <div class="p-3">
      <div class="card-custom p-3">
        <div class="form-row">
          <div class="col d-flex align-items-center">
            <p class="m-0 font-weight-normal color-grey-500">
              Manage your applications menu here.
            </p>
          </div>
          <div class="col text-right">
            <button
              type="button"
              @click="(state.menuData = null), (state.isDialog = true)"
              class="btn btn-primary btn-sm"
            >
              <i class="fas fa-plus"></i>
              Add Menu
            </button>
          </div>
        </div>
        <!-- skeleton loader -->
        <f-placeholder v-if="result.isLoading"></f-placeholder>
        <div class="items-content bg-white mt-2" v-else>
          <div class="form-row bg-grey-300">
            <div class="col text-center font-weight-500 border-right p-2">
              Icon
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Menu Name
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Route
            </div>
            <div class="col text-center font-weight-500 border-right p-2">
              Status
            </div>
            <div class="col text-center font-weight-500 p-2">
              Action
            </div>
          </div>
          <div
            v-for="item in state.datas"
            :key="item.id"
            class="form-row bg-white border-bottom"
          >
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              <img
                :src="item.icon"
                alt=""
                width="40px"
                height="40px"
                class="circle responsive-img"
              />
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.name }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.route }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              {{ item.status ? "Active" : "Inactive" }}
            </div>
            <div
              class="col d-flex align-items-center justify-content-center font-weight-normal border-right p-2"
            >
              <button
                type="button"
                @click="(state.menuData = item), (state.isDialog = true)"
                class="btn btn-grey-100 btn-sm mr-2"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                type="button"
                @click="deleteMenu(item.id)"
                class="btn btn-grey-100 btn-sm"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddMenu
      v-if="state.isDialog"
      :dialog.sync="state.isDialog"
      :fetchMenus="fetchMenus"
      :menuData="state.menuData"
    />
    <f-loading :value="response.isLoading"></f-loading>
  </div>
</template>

<script>
import { handler } from "@/controllers/handler";
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  components: {
    AddMenu: () => import("@/components/settings/menu/AddMenu")
  },
  setup(_, ctx) {
    const { result, fetchData, form: response, deleteData } = handler();

    const state = reactive({
      isDialog: false,
      menuData: null,
      datas: [],
      pagination: null
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

    watch(
      () => response,
      value => {
        if (value.isSuccess) {
          fetchMenus();
        }
      },
      { deep: true }
    );

    const deleteMenu = async menu_id => {
      if (
        await ctx.root.$confirm({
          title: "Are you sure want to delete this menu?",
          lbLabel: "Cancel",
          rbLabel: "Ok",
          forceStay: false
        })
      ) {
        deleteData(`/menu/${menu_id}`);
      }
    };

    function fetchMenus() {
      fetchData("/menu");
    }

    onMounted(() => {
      fetchMenus();
    });

    return {
      state,
      result,
      deleteMenu,
      fetchMenus,
      response
    };
  }
};
</script>
