<template>
  <div>
    <a-modal v-model:open="isOpen" title="Add new Area" :footer="null">
      <AreaForm @submit="handleOk" :area="area" />
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import AreaForm from "./AreaForm.vue";
import type { Area } from "@/models";

interface Props {
  area?: Area;
}

defineProps<Props>();

const isOpen = defineModel<boolean>({
  default: false,
});

const handleOk = (): void => {
  isOpen.value = false;
};
</script>
