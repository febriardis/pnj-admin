<template>
  <date-pick
    v-model="innerValue"
    :shortcuts="shortcuts"
    value-type="format"
    format="YYYY-MM-DD"
    :range="$attrs.range"
    placeholder="Select date"
  >
  </date-pick>
</template>

<script>
import moment from "moment";
import DatePick from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePick
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: "",
    shortcuts: [
      {
        text: "Today",
        onClick() {
          return [moment().toDate(), moment().toDate()];
        }
      },
      {
        text: "Yesterday",
        onClick() {
          return [
            moment()
              .add(-1, "days")
              .toDate(),
            moment()
              .add(-1, "days")
              .toDate()
          ];
        }
      },
      {
        text: "Last 7 days",
        onClick() {
          return [
            moment()
              .add(-7, "days")
              .toDate(),
            moment().toDate()
          ];
        }
      },
      {
        text: "Last 14 days",
        onClick() {
          return [
            moment()
              .add(-14, "days")
              .toDate(),
            moment().toDate()
          ];
        }
      },
      {
        text: "Last 30 days",
        onClick() {
          return [
            moment()
              .add(-30, "days")
              .toDate(),
            moment().toDate()
          ];
        }
      }
    ]
  }),
  watch: {
    innerValue(value) {
      this.$emit("input", value);
    },
    value(val) {
      if (val !== this.innerValue) {
        this.innerValue = val;
      }
      if (Array.isArray(val) && val.some(el => el === null)) {
        this.innerValue = "";
      }
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

<style lang="scss">
// @import "vue2-datepicker/index.css";
.mx-datepicker {
  width: 100%;
  border-radius: 4px;
  &.is-danger {
    border: 1px solid #f14668;
  }
  &.is-success {
    border: 1px solid #48c774;
  }
  .mx-input-wrapper {
    input {
      padding: 15px 10px;
      background: #ffffff;
      height: 0;
      border-color: #dbdbdb;
    }
  }
}
.mx-datepicker-main {
  .mx-table td,
  .mx-table th {
    vertical-align: inherit !important;
  }
}
</style>
