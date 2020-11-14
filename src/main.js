import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./filter";
// import "./middleware";

import api from "@/controllers/api";
import VueCompositionAPI from "@vue/composition-api";

import * as axios from "@/plugins/axios";
import * as CustomUi from "@/plugins/custom-ui";
import * as elementUi from "@/plugins/element-ui";
import Notifications from "@/plugins/notify";
import ZyDialog from "@/plugins/zy-dialog";
import VueApexCharts from "@/plugins/vue-apexcharts";

import Admin from "@/layouts/Admin";
import Default from "@/layouts/Default";
import Antrian from "@/layouts/Antrian";

Vue.use(VueCompositionAPI);
Vue.component("default-layout", Default);
Vue.component("admin-layout", Admin);
Vue.component("antrian-layout", Antrian);

Vue.config.productionTip = false;

new Vue({
  api,
  axios,
  router,
  store,
  CustomUi,
  Notifications,
  ZyDialog,
  VueApexCharts,
  elementUi,
  render: h => h(App)
}).$mount("#app");
