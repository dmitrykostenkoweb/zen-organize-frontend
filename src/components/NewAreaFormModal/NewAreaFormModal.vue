<template>
  <div>
    <a-modal v-model:open="isOpen" title="Add new Area" :footer="null">
      <NewAreaForm @submit="handleOk" />
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import NewAreaForm from "./NewAreaForm.vue";
import type { FormState } from "@/components/NewAreaFormModal/new-area-from.types.ts";

const isOpen = defineModel<boolean>({
  default: false,
});

const handleOk = (data: FormState): void => {
  console.log(data);
  isOpen.value = false;
};
</script>
