<template>
  <div class="add-prouduct">
    <div class="bg-white p-4">
      <h3 class="mt-0 mb-0">Kelola Atribut</h3>
    </div>

    <div class="mt-3 p-3 pr-5">
      <el-tabs tab-position="left">
        <el-tab-pane
          v-for="item in attributes"
          :key="item.id"
          :label="item.name"
        >
          <cutting-form v-if="item.id === 1" />
          <fabric-form v-else-if="item.id === 2" />
          <stitch-form v-else-if="item.id === 3" />
          <size-form v-else-if="item.id === 4" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CuttingForm: () => import("@/components/products/attributes/Cutting"),
    FabricForm: () => import("@/components/products/attributes/Fabric"),
    SizeForm: () => import("@/components/products/attributes/Size"),
    StitchForm: () => import("@/components/products/attributes/Stitch")
  },
  data: () => ({
    attributes: [
      { id: 1, name: "Cutting" },
      { id: 2, name: "Fabric" },
      { id: 3, name: "Stitch" },
      { id: 4, name: "Size" }
    ]
  })
};
</script>
