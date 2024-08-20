<script setup>
import NavigationBar from '@/components/NavigationBar.vue'

import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <navigation-bar />
    <router-view class="default-margin" />
  </main>
</template>

<style lang="scss" scoped>
.default-margin {
  margin-top: 100px;
}
</style>
