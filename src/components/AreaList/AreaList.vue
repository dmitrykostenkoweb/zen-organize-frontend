<template>
  <div class="grid-container">
    <AreaCard
      class="grid-item"
      v-for="area in areas"
      :key="area.areaid"
      :title="area.name"
      :description="area.description"
      @update="updateArea(area)"
    />
    <AddAreaCard @create="createArea" />
  </div>
  <AreaFormModal
    v-model="isAddAreaModalOpen"
    :area="updatedArea"
    :mode="areaFormMode"
  />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { AreaCard } from "@/components/Base";
import AddAreaCard from "./AddAreaCard";
import AreaFormModal from "@/components/AreaFormModal";
import { useGetAllAreas } from "@/composables";
import type { Area } from "@/models";

const isAddAreaModalOpen = ref<boolean>(false);
const updatedArea = ref<Area | null>(null);
const areaFormMode = ref<"create" | "update">("create");

const { get, data: areas } = useGetAllAreas();

const createArea = (): void => {
  updatedArea.value = null;
  isAddAreaModalOpen.value = true;
  areaFormMode.value = "create";
};

const updateArea = (area: Area): void => {
  isAddAreaModalOpen.value = true;
  updatedArea.value = area;
  areaFormMode.value = "update";
};

watch(isAddAreaModalOpen, (is: boolean): void => {
  get();
  if (!is) updatedArea.value = null;
});

onMounted(get);
</script>
<style scoped>
.grid-container {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 16px;
}

.grid-item {
  width: 300px;
}
</style>
