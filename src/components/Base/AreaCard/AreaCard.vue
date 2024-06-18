<template>
  <Card
    :loading="false"
    :title="title"
    style="width: 300px"
    hoverable
    :description="description"
  >
    <template #cover>
      <div class="area-cover__wrapper">
        <img alt="no-image" :src="noImage" />
      </div>
    </template>
    <p v-if="description" class="area-description">{{ description }}</p>
    <template #actions>
      <EditButton @click="emit('edit')" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import noImage from "@/assets/img/no-image.png";
import { EditButton } from "@/components/Base";
import { Card } from "ant-design-vue";

interface Props {
  title: string;
  description?: string;
}

interface Emits {
  (e: "edit"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
.area-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
}

.area-cover {
  &__wrapper {
    width: 100%;
    min-width: 160px;

    height: 100%;
    min-height: 160px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
