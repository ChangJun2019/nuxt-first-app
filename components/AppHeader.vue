<script lang="ts" setup>
import { useUserStore } from '~/stores/userStore'

const appConfig = useAppConfig()
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
        <NuxtLink btn-icon to="/">
          <Icon name="material-symbols:other-houses-outline" />
        </NuxtLink>
        <NuxtLink v-if="!user" btn-icon to="/login">
          <Icon name="material-symbols:login" />
        </NuxtLink>
        <template v-else>
          <NuxtLink btn-icon to="/link/create">
            <Icon name="material-symbols:add-circle-outline-rounded" />
          </NuxtLink>
          <!-- <li class="block py-2 pl-3 pr-4">
            <NuxtLink to="#">
              {{ user.email }}
            </NuxtLink>
          </li> -->
          <!-- <li class="block py-2 pl-3 pr-4 link" @click="userStore.logout">
            <span>logout</span>
          </li> -->
        </template>
        <ToggleTheme />
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
