<template>
  <div class="grid-container">
    <AreaCard
      class="grid-item"
      v-for="area in areas"
      :key="area.areaId"
      :title="area.name"
      :description="area.description"
      @edit="editArea(area)"
    />
    <AddAreaCard @add="addArea" />
  </div>
  <AreaFormModal v-model="isAddAreaModalOpen" :area="updatedArea" />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { AreaCard } from "@/components/Base";
import AddAreaCard from "./AddAreaCard";
import AreaFormModal from "@/components/AreaFormModal";
import { useGetAllAreas } from "@/composables";
import type { Area } from "@/models";

const isAddAreaModalOpen = ref<boolean>(false);
const updatedArea = ref<Area | undefined>(undefined);

const { get, data: areas } = useGetAllAreas();

const addArea = (): void => {
  isAddAreaModalOpen.value = true;
  updatedArea.value = undefined;
};

const editArea = (area: Area): void => {
  isAddAreaModalOpen.value = true;
  updatedArea.value = area;
};

watch(isAddAreaModalOpen, (is: boolean): void => {
  if (!is) updatedArea.value = undefined;
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
