<script lang="ts" setup>
import { useUserStore } from '~/stores/userStore'

const appConfig = useAppConfig()
const userStore = useUserStore()
const user = computed(() => useUserStore().getUser)
</script>

<template>
  <nav app-bg app-text px-2 sm:px-4 py-2.5>
    <div container flex flex-wrap items-center justify-between mx-auto>
      <a flex items-center href="https://nuxt.com/">
        <Icon name="logos:nuxt-icon" size="32px" />
        <span ml-3 self-center text-xl font-semibold whitespace-nowrap>{{ appConfig.name }}</span>
      </a>
      <ul flex flex-col p-4 mt-4 md:flex-row md:space-x-8>
        <li v-if="!user">
          <NuxtLink class="block py-2 pl-3 pr-4 link" to="/login">
            sign in
          </NuxtLink>
        </li>
        <template v-else>
          <li>
            <NuxtLink class="block py-2 pl-3 pr-4" to="#">
              {{ user.email }}
            </NuxtLink>
          </li>
          <li @click="userStore.logout">
            <span class="block py-2 pl-3 pr-4 link">logout</span>
          </li>
        </template>
        <ToggleTheme />
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
