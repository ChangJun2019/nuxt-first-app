<script lang="ts" setup>
const appConfig = useAppConfig()
</script>

<template>
  <p text-center py-14>
    Copyright © 2023 - All right reserved by <a :href="appConfig.footer.authorLink" target="_blank" class="link link-hover">{{ appConfig.footer.author }}</a>
  </p>
</template>

<style scoped></style>
