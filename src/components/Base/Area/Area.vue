<template>
  <Card
    :loading="false"
    :title="title"
    :extra="EditButton"
    style="width: 300px"
    hoverable
    :description="description"
  >
    <template #cover>
      <div class="area-cover__wrapper">
        <img alt="no-image" :src="noImage" />
      </div>
    </template>
    <p class="area-description">{{ description }}</p>
    <template #actions>
      <EditButton />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { EditButton } from "@/components/Base";
import noImage from "@/assets/img/no-image.png";
import { Card } from "ant-design-vue";

interface Props {
  title: string;
  description: string;
}

defineProps<Props>();
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
