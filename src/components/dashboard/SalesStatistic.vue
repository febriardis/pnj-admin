<template>
  <div class="card-custom p-2 mb-2">
    <div class="card-head">
      <div class="form-row align-items-center">
        <div class="col">
          <h6>Sales Statistics</h6>
        </div>

        <div class="col-md-3 ">
          <select v-model="filter.type" class="form-control">
            <option
              v-for="(item, i) in transactions_type"
              :key="i"
              :value="item.type"
              >{{ item.name }}</option
            >
          </select>
        </div>

        <div class="col-md-3">
          <f-date-picker v-model="state.date_range" range></f-date-picker>
        </div>
      </div>
    </div>
    <div class="card-head bg-white">
      <f-loading-flat v-if="result.isLoading"></f-loading-flat>
      <apexchart
        v-else
        type="area"
        height="280"
        :options="options"
        :series="state.labels"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { handler } from "@/controllers/handler";
import { utilities } from "@/controllers/utilities";
import { computed, onMounted, reactive, watch } from "@vue/composition-api";

export default {
  setup() {
    const { result, fetchData } = handler();
    const { transactions_type } = utilities();

    const filter = reactive({
      type: "",
      start_date: moment()
        .add(-7, "days")
        .format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD")
    });

    const state = reactive({
      date_range: [
        moment()
          .add(-7, "days")
          .format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ],
      years: [],
      labels: []
    });

    watch(
      () => result.response,
      response => {
        state.years = [];
        state.labels = [];
        if (response) {
          let allDatas = [];
          let FailedDatas = [];
          let SuccessDatas = [];
          response.data.all.forEach(el => {
            state.years.push(el.date);
            allDatas.push(el.count);
          });
          response.data.failed.forEach(el => {
            state.years.push(el.date);
            FailedDatas.push(el.count);
          });
          response.data.success.forEach(el => {
            state.years.push(el.date);
            SuccessDatas.push(el.count);
          });
          state.labels.push({
            name: "All Transactions",
            data: allDatas
          });
          state.labels.push({
            name: "Transactions Success",
            data: SuccessDatas
          });
          state.labels.push({
            name: "Transactions Failed",
            data: FailedDatas
          });
        }
      },
      {
        deep: true
      }
    );

    watch(
      () => filter,
      () => {
        fetchSalesDatas();
      },
      {
        deep: true
      }
    );

    watch(
      () => state.date_range,
      newValue => {
        if (newValue.length > 0) {
          filter.start_date = newValue[0];
          filter.end_date = newValue[1];
        }
      },
      {
        deep: true
      }
    );

    const options = computed(() => {
      return {
        chart: {
          height: 280,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          categories: state.years
        },
        stroke: {
          // curve: 'straight'
        },
        yaxis: {
          title: {
            text: "Count"
          }
        }
      };
    });

    function fetchSalesDatas() {
      fetchData("/home/chart", filter);
    }

    onMounted(() => {
      fetchSalesDatas();
    });

    return {
      state,
      filter,
      result,
      options,
      transactions_type
    };
  }
};
</script>
