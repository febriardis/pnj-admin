<template>
  <div class="skeleton-loader mt-2">
    <div class="form-row">
      <div class="col">
        <f-skeleton height="20px" />
      </div>
      <div class="col">
        <f-skeleton height="20px" />
      </div>
      <div class="col">
        <f-skeleton height="20px" />
      </div>
      <div class="col">
        <f-skeleton height="20px" />
      </div>
      <div class="col">
        <f-skeleton height="20px" />
      </div>
    </div>
    <hr />
    <div v-for="item in 5" :key="item" class="form-row mb-2">
      <div class="col">
        <f-skeleton height="20px" />
      </div>
      <div class="col">
        <f-skeleton height="20px" />
      </div>
      <div class="col">
        <f-skeleton height="20px" />
      </div>
      <div class="col">
        <f-skeleton height="20px" />
      </div>
      <div class="col">
        <f-skeleton height="20px" />
      </div>
    </div>
  </div>
</template>
