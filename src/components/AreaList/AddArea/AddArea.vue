<template>
  <Card
    :loading="false"
    title="Add new Area"
    style="width: 300px"
    hoverable
    @click="emit('add')"
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
      <a-button
        size="large"
        type="text"
        @click="emit('add')"
        :icon="h(FileAddFilled)"
        block
        >Add</a-button
      >
    </template>
  </Card>
</template>

<script setup lang="ts">
import { h } from "vue";
import { Card } from "ant-design-vue";
import { FileAddFilled } from "@ant-design/icons-vue";

interface Emits {
  (emit: "add"): void;
}

const emit = defineEmits<Emits>();
</script>
