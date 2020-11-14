<template>
  <div class="membership">
    <div class="bg-white p-4">
      <h6 class="mb-0">Membership</h6>
    </div>

    <div class="p-3">
      <div class="card-custom p-3">
        <div class="form-row mb-2">
          <div class="col-md-3 ">
            <f-search-field
              type="text"
              class="form-control"
              v-model="filter.search"
              placeholder="Search Member"
            ></f-search-field>
          </div>
        </div>

        <f-placeholder v-if="result.isLoading"></f-placeholder>
        <div class="tableFixHead" v-else>
          <table
            class="table table-list table-bordered table-striped table-vcenter"
            style="min-width:1200px"
          >
            <thead>
              <tr>
                <th class="text-size-small bg-white" colspan="2">
                  Member Profile
                </th>
                <th class="text-size-small bg-white" colspan="4">
                  Merchant Details
                </th>
                <th class="text-size-small bg-white align-middle" rowspan="2">
                  Join at
                </th>
              </tr>
              <tr>
                <th class="text-size-small bg-white border-right">Name</th>
                <th class="text-size-small bg-white border-right">Phone</th>
                <th class="text-size-small bg-white border-right">Name</th>
                <th class="text-size-small bg-white border-right">Saldo</th>
                <th class="text-size-small bg-white border-right">Address</th>
                <th class="text-size-small bg-white border-right">City</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="state.datas.length === 0">
                <td class="text-size-small text-center" colspan="7">
                  no datas
                </td>
              </tr>
              <tr v-else v-for="(item, index) in state.datas" :key="index">
                <td class="text-size-small text-center">{{ item.name }}</td>
                <td class="text-size-small text-center">{{ item.phone }}</td>
                <td class="text-size-small text-center">
                  {{ item.merchant ? item.merchant.name : "-" }}
                </td>
                <td class="text-size-small text-center">
                  Rp.{{ item.merchant ? item.merchant.balance : 0 | price }}
                </td>
                <td class="text-size-small text-center">
                  {{ item.merchant ? item.merchant.address : "-" }},
                  {{
                    item.merchant ? item.merchant.village.name : "-" | lowercase
                  }}
                </td>
                <td class="text-size-small text-center text-capitalize">
                  {{
                    item.merchant
                      ? item.merchant.district.name
                      : null | lowercase
                  }},
                  {{
                    item.merchant ? item.merchant.city.name : null | lowercase
                  }},
                  {{
                    item.merchant
                      ? item.merchant.province.name
                      : null | lowercase
                  }}
                </td>
                <td class="text-size-small text-center">
                  {{ item.created_at | formatDate("DD/MM/YYYY - HH:mm") }}
                </td>
              </tr>
            </tbody>
          </table>
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
import { onMounted, reactive, watch } from "@vue/composition-api";

export default {
  setup() {
    const { result, fetchData } = handler();
    const filter = reactive({
      page: 0,
      search: ""
    });

    const state = reactive({
      datas: [],
      pagination: null
    });

    watch(
      () => filter,
      () => {
        fetchUsers();
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

    function fetchUsers() {
      fetchData("/user", filter);
    }

    onMounted(() => {
      fetchUsers();
    });

    return {
      filter,
      state,
      result
    };
  }
};
</script>
