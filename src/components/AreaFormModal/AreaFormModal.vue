<template>
  <div>
    <a-modal v-model:open="isOpen" title="Add new Area" :footer="null">
      <AreaForm @close="isOpen = false" :area="area" :mode="mode" />
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import AreaForm from "./AreaForm.vue";
import type { Area } from "@/models";

interface Props {
  area: Area | null;
  mode: "create" | "update";
}

defineProps<Props>();

const isOpen = defineModel<boolean>({
  default: false,
});
</script>
