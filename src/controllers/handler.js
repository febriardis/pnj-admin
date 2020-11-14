import { reactive } from "@vue/composition-api";
import api from "@/controllers/api";

export const handler = () => {
  const form = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null
  });

  const postData = async (url, data) => {
    form.isLoading = true;
    const response = await api.submitData(url, data);
    if (response.status === 200) {
      form.isLoading = false;
      form.isSuccess = true;
    } else {
      form.isLoading = false;
      form.isFailed = true;
    }
    form.response = response.data;
  };

  const putData = async (url, data) => {
    form.isLoading = true;
    const response = await api.updateData(url, data);
    if (response.status === 200) {
      form.isLoading = false;
      form.isSuccess = true;
    } else {
      form.isLoading = false;
      form.isFailed = true;
    }
    form.response = response;
  };

  const deleteData = async (url, data) => {
    form.isLoading = true;
    const response = await api.deleteData(url, data);
    if (response.status === 200) {
      form.isLoading = false;
      form.isSuccess = true;
    } else {
      form.isLoading = false;
      form.isFailed = true;
    }
    form.response = response;
  };

  //fetch Data
  const result = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null
  });

  const fetchData = async (url, data) => {
    result.isLoading = true;
    const response = await api.fetchData(url, data);
    if (response.status === 200) {
      result.isLoading = false;
      result.isSuccess = true;
    } else {
      result.isLoading = false;
      result.isFailed = true;
    }
    result.response = response.data;
  };

  return { form, postData, putData, deleteData, result, fetchData };
};
