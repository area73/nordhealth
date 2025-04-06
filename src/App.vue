<script setup lang="ts">
import { RouterView } from 'vue-router'
import ProvetHeader from './components/ProvetHeader.vue'
</script>

<template>
  <div class="wrapper">
    <ProvetHeader />
    <RouterView />
  </div>
</template>

<style scoped></style>
