<template>
  <div>
    <table
      class="table table-list table-bordered table-striped"
      style="min-width:1900px;"
    >
      <thead>
        <tr>
          <th
            class="text-size-small bg-white align-middle"
            width="8%"
            rowspan="2"
          >
            Transaction Time
          </th>
          <th
            class="text-size-small bg-white align-middle"
            width="8%"
            rowspan="2"
          >
            Transaction Duration
          </th>
          <th
            class="text-size-small bg-white align-middle"
            width="8%"
            rowspan="2"
          >
            User Name
          </th>
          <th class="text-size-small bg-white" colspan="3">
            Merchant Details
          </th>
          <th class="text-size-small bg-white" colspan="5">
            Transaction Details
          </th>
          <th class="text-size-small bg-white" colspan="4">
            Denom Details
          </th>
          <th
            class="text-size-small bg-white align-middle table-sticky-column"
            style="z-index: 3 !important;right:80px"
            width="5%"
            rowspan="2"
          >
            Status
          </th>
          <th
            class="text-size-small bg-white align-middle table-sticky-column"
            style="z-index: 3 !important"
            rowspan="2"
          >
            Client Response
          </th>
        </tr>
        <tr>
          <th class="text-size-small bg-white border-right" width="8%">Name</th>
          <th class="text-size-small bg-white border-right" width="6%">
            Current Saldo
          </th>
          <th class="text-size-small bg-white border-right" width="6%">
            Credit
          </th>
          <th class="text-size-small bg-white border-right" width="8%">
            Customer Number
          </th>
          <th class="text-size-small bg-white border-right" width="8%">
            Customer Name
          </th>
          <th class="text-size-small bg-white border-right" width="5%">
            Value Paid
          </th>
          <th class="text-size-small bg-white border-right" width="5%">
            Tarif
          </th>
          <th class="text-size-small bg-white border-right" width="5%">
            Voltage
          </th>
          <th class="text-size-small bg-white border-right" width="5%">Code</th>
          <th class="text-size-small bg-white border-right" width="5%">
            Amount
          </th>
          <th class="text-size-small bg-white border-right" width="5%">
            Admin Fee
          </th>
          <th class="text-size-small bg-white border-right" width="5%">
            Nett Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="transactions.length === 0">
          <td class="text-size-small text-center" colspan="15">
            No Data
          </td>
        </tr>
        <tr v-for="(item, index) in transactions" :key="index">
          <td class="text-size-small text-center">
            {{ item.created_at | formatDate("DD/MM/YYYY - HH:mm:ss") }}
          </td>
          <td class="text-size-small text-center">
            {{ item.created_at | compareDuration(item.updated_at) }} Seconds
          </td>
          <td class="text-size-small text-center text-capitalize">
            {{ item.merchant ? item.merchant.user.name : "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.merchant ? item.merchant.name : "-" }}
          </td>
          <td class="text-size-small text-center">
            Rp.{{ item.merchant ? item.merchant.balance : 0 | price }}
          </td>
          <td class="text-size-small text-center">
            Rp.{{ item.balance | price }}
          </td>
          <td class="text-size-small text-center">
            {{ item.customer_number || "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.customer_name || "-" }}
          </td>
          <td class="text-size-small text-center">
            Rp.{{ item.amount | price }}
          </td>
          <td class="text-size-small text-center">
            {{ item.tarif || "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.voltage || "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.denom_id ? item.denom_id.code : "-" }}
          </td>
          <td class="text-size-small text-center">
            {{ item.denom_id ? item.denom_id.amount : "-" }}
          </td>
          <td class="text-size-small text-center">
            Rp.{{ item.admin_fee | price }}
          </td>
          <td class="text-size-small text-center">
            Rp.{{ (item.amount - item.admin_fee) | price }}
          </td>
          <td
            class="text-size-small text-center table-sticky-column"
            style="z-index: 2 !important;right:80px"
          >
            <p
              class="mb-0"
              :class="
                item.status === 'Sukses'
                  ? 'color-green'
                  : item.status === 'Pending'
                  ? 'color-yellow-800'
                  : 'color-red-500'
              "
            >
              {{ item.status }}
            </p>
          </td>
          <td
            class="text-size-small text-center table-sticky-column"
            style="z-index: 2 !important;"
          >
            <a
              href="javascript:void(0)"
              @click="
                (isDialog = true), (clientResponse = item.client_response)
              "
              >View Response</a
            >
          </td>
        </tr>
      </tbody>
    </table>

    <f-dialog :value.sync="isDialog" width="400px">
      <div class="card-custom">
        <div
          class="card-head d-flex align-items-center justify-content-between"
        >
          <p class="mb-0 font-weight-bold">Client Response</p>
          <button
            type="button"
            class="btn btn-grey-100 btn-sm"
            @click="isDialog = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="card-content">
          <ul v-if="clientResponse" class="client-response text-left">
            <li
              v-for="(res, i) in Object.entries(JSON.parse(clientResponse))"
              :key="i"
            >
              <b class="text-capitalize">{{ res[0].replace(/_/g, " ") }}: </b>
              <div v-if="res[1].constructor === {}.constructor">
                <ul>
                  <li v-for="(desc, idx) in Object.entries(res[1])" :key="idx">
                    <b>{{ desc[0] }}: </b>
                    <div v-if="desc[1].constructor === [].constructor">
                      <ul>
                        <li
                          v-for="(det, id) in Object.entries(desc[1][0])"
                          :key="id"
                        >
                          <b>{{ det[0] }}</b> {{ det[1] }}
                        </li>
                      </ul>
                    </div>
                    <span v-else>{{ desc[1] }}</span>
                  </li>
                </ul>
              </div>
              <span v-else>{{ res[1] }}</span>
            </li>
          </ul>
        </div>
      </div>
    </f-dialog>
  </div>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array
    }
  },

  data() {
    return {
      isDialog: false,
      clientResponse: null
    };
  }
};
</script>
