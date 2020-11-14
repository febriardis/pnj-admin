// ui by febri ardi saputra

import Vue from "vue";

import Skeleton from "@/components/base/Skeleton";
import Dialog from "@/components/base/Dialog";
import Dropdown from "@/components/base/Dropdown";
import PlaceholderLoader from "@/components/base/PlaceholderLoader";
import LoadingState from "@/components/base/LoadingState";
import LoadingData from "@/components/base/LoadingData";
import Pagination from "@/components/base/Pagination";

//form
import UploadImage from "@/components/form/UploadImage";
import SearchField from "@/components/form/SearchField";
import DatePicker from "@/components/form/DatePicker";
import MultipleSelectField from "@/components/form/MultipleSelectField";

//custom-ui
Vue.component("f-skeleton", Skeleton);
Vue.component("f-dialog", Dialog);
Vue.component("f-dropdown", Dropdown);
Vue.component("f-placeholder", PlaceholderLoader);
Vue.component("f-loading", LoadingState);
Vue.component("f-loading-flat", LoadingData);
Vue.component("f-pagination", Pagination);

// form
Vue.component("f-upload-image", UploadImage);
Vue.component("f-search-field", SearchField);
Vue.component("f-date-picker", DatePicker);
Vue.component("f-select-field-tag", MultipleSelectField);
