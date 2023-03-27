<script lang="ts" setup></script>

<template>
  <div class="container min-h-screen mx-auto">
    <AppHeader />
    <div class="max-w-prose mx-auto">
      <slot />
      <AppFooter />
    </div>
  </div>
</template>

<style scoped></style>
