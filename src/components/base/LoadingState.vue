<template>
  <f-dialog :value.sync="$attrs.value" isVCentered>
    <div class="color-white d-block text-center">
      <i class="fas fa-spinner fa-pulse text-size-large"></i>
      <p class="mb-0">Loading...</p>
    </div>
  </f-dialog>
</template>
