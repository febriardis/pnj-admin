import { computed, reactive } from "@vue/composition-api";
import api from "@/controllers/api";

export const utilities = () => {
  //transactions_type
  const transactions_type = computed(() => {
    return [
      { type: "", name: "All Transactions" },
      { type: "PULSA", name: "Pulsa" },
      { type: "EMONEY", name: "E-Money" },
      { type: "DATA", name: "Data" },
      { type: "PLN", name: "PLN Prepaid" },
      { type: "PLN_POSTPAID", name: "PLN Postpaid" }
    ];
  });

  // payments
  const payments = reactive({
    isLoading: false,
    isFailed: false,
    list: []
  });

  const fetchPayments = async () => {
    payments.isLoading = true;
    const response = await api.fetchData("/payment-method");
    if (response.status === 200) {
      payments.list = response.data.data;
      payments.isLoading = false;
    } else {
      payments.list = [];
      payments.isLoading = false;
    }
  };

  //merchant
  const merchants = reactive({
    isLoading: false,
    isFailed: false,
    list: []
  });

  const fetchMerchants = async () => {
    merchants.isLoading = true;
    const response = await api.fetchData("/user/merchant");
    if (response.status === 200) {
      merchants.list = response.data.data;
      merchants.isLoading = false;
    } else {
      merchants.list = [];
      merchants.isLoading = false;
    }
  };

  return {
    transactions_type,
    payments,
    fetchPayments,
    merchants,
    fetchMerchants
  };
};
