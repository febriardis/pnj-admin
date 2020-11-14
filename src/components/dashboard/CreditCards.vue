<template>
  <div class="form-row">
    <div class="col-md-3 col-sm-12">
      <div class="card-custom p-3">
        <div class="form-row">
          <div class="col-4">
            <div
              class="rounded-circle p-3 bg-blue-50"
              style="padding: 14px;width: 60px;height: 60px;"
            >
              <i class="fas fa-wallet color-blue" style="font-size:30px"></i>
            </div>
          </div>
          <div class="col">
            <p class="mb-1 font-weight-light">Digiflazz Credit</p>
            <h5 class="color-grey-900 font-weight-bold">
              Rp. {{ credits.digiflazzCredit | price }}
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-12">
      <div class="card-custom p-3">
        <div class="form-row">
          <div class="col-4">
            <div
              class="rounded-circle bg-red-50"
              style="padding: 14px;width: 60px;height: 60px;"
            >
              <i class="fas fa-coins color-red-400" style="font-size:30px"></i>
            </div>
          </div>
          <div class="col">
            <p class="mb-1 font-weight-light">Merchant Balance</p>
            <h5 class="color-grey-900 font-weight-bold">
              Rp. {{ credits.totalMerchantBalance | price }}
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-12">
      <div class="card-custom p-3">
        <div class="form-row">
          <div class="col-4">
            <div
              class="rounded-circle p-3 bg-green-50"
              style="padding: 14px;width: 60px;height: 60px;"
            >
              <i
                class="fas fa-hand-holding-usd color-green-500"
                style="font-size:30px"
              ></i>
            </div>
          </div>
          <div class="col">
            <p class="mb-1 font-weight-light">Profit</p>
            <h5 class="color-grey-900 font-weight-bold">
              Rp.
              {{
                (credits.digiflazzCredit - credits.totalMerchantBalance) | price
              }}
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-12">
      <div class="card-custom pt-3 pl-3 pr-3" style="padding-bottom: 0.4rem;">
        <div class="form-row">
          <div class="col-4">
            <div
              class="rounded-circle bg-yellow-50"
              style="padding: 14px;width: 60px;height: 60px;"
            >
              <i
                class="fab fa-google-wallet color-yellow-900"
                style="font-size:30px"
              ></i>
            </div>
          </div>
          <div class="col">
            <p class="mb-1 font-weight-light">Zenziva Credit</p>
            <h5 class="color-grey-900 font-weight-bold mb-0">
              Rp. {{ credits.zenzivaCredit.credit | price }}
            </h5>
            <small>Exp. {{ credits.zenzivaCredit.expired }} </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    credits: {
      type: Object,
      required: true
    }
  }
};
</script>
