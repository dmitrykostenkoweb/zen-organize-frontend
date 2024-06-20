<template>
  <Card
    :loading="false"
    title="Add new Area"
    style="width: 300px"
    hoverable
    @click="emit('create')"
  >
    <a-typography-text type="secondary"
      >Click the Add button to create a new Area</a-typography-text
    >
    <br />
    <a-typography-text type="secondary"
      >An Area is a category like "Health & Fitness" or "Education" that helps
      you organize related projects and tasks.</a-typography-text
    >

    <template #actions>
      <a-tooltip title="Add">
        <a-button
          size="large"
          type="default"
          shape="circle"
          @click="emit('create')"
          :icon="h(FileAddFilled)"
        />
      </a-tooltip>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { h } from "vue";
import { Card } from "ant-design-vue";
import { FileAddFilled } from "@ant-design/icons-vue";

interface Emits {
  (emit: "create"): void;
}

const emit = defineEmits<Emits>();
</script>
