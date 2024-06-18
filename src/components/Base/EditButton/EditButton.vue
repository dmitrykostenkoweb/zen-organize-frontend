<template>
  <a-tooltip title="Edit">
    <a-button type="default" shape="circle" :icon="h(EditFilled)" />
  </a-tooltip>
</template>
<script setup lang="ts">
import { EditFilled } from "@ant-design/icons-vue";
import { h } from "vue";
</script>
<!--//not used-->
