<template>
  <AddArea @add="showAddAreaModalOpen" />
  <NewAreaFormModal v-model="isAddAreaModalOpen" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import AddArea from "./AddArea";
import NewAreaFormModal from "@/components/NewAreaFormModal";

const isAddAreaModalOpen = ref<boolean>(false);

const showAddAreaModalOpen = (): void => {
  isAddAreaModalOpen.value = true;
};
</script>
