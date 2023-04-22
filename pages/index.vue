<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div w-full py-24>
    <div class="flex text-3xl py-4 justify-between">
      <span>Lists</span>
      <Icon name="material-symbols:format-list-bulleted-rounded" />
    </div>
    <LinkList />
  </div>
</template>

<style scoped></style>
