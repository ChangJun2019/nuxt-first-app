<script lang="ts" setup>
import { useUserStore } from '~/stores/userStore'

const appConfig = useAppConfig()
const userStore = useUserStore()
const user = computed(() => useUserStore().getUser)
</script>

<template>
  <div class="text-center py-14 text-xl">
    <p v-if="user" py-3>
      Hello, <span class="text-green-500 font-bold">{{ user?.email }}</span>
      <span class="link ml-8" @click="userStore.logout">logout</span>
    </p>
    <p>
      Copyright © 2023 - All right reserved by <a :href="appConfig.footer.authorLink" target="_blank" class="link link-hover">{{ appConfig.footer.author }}</a>
    </p>
  </div>
</template>

<style scoped></style>
