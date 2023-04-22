<script lang="ts" setup>
import { useLinkStore } from '~/stores/linkStore'
import { useUserStore } from '~/stores/userStore'

await useLinkStore().fetchAllLinks()

const links = computed(() => useLinkStore().getLinks)
const user = computed(() => useUserStore().getUser)

const toEdit = (id: number) => {
  navigateTo({
    path: '/link/edit',
    query: {
      id,
    },
  })
}
const $q = useQuasar()

const deleteLinkFetch = async (id: number) => {
  const { data } = await useFetch(`/api/post/${id}`, {
    method: 'DELETE',
  }) as any

  if (data.value?.success) {
    await useLinkStore().fetchAllLinks()
    $q.notify({
      type: 'positive',
      message: 'Delete successfully',
      position: 'top',
      timeout: 5000,
    })
  }
}

const deleteLink = async (id: number) => {
  $q.dialog({
    dark: true,
    title: 'Confirm Delete',
    message: 'Are you sure to delete it?',
    cancel: {
      color: 'dark',
    },
    ok: {
      color: 'positive',
    },
    persistent: true,
  }).onOk(() => {
    deleteLinkFetch(id)
  }).onCancel(() => {
    $q.notify({
      type: 'positive',
      message: 'cancel delete',
      position: 'top',
      timeout: 3000,
    })
  })
}
</script>

<template>
  <div class="w-auto m-auto text-left mb-3 flex flex-col border rounded-md p-3 text-xl">
    <NuxtLink v-for="(item, index) of links" :key="index" :to="item.url" target="_blank">
      <div flex justify-between items-center cursor-pointer>
        <p class="truncate h-10 leading-10 hover:text-green-500 hover:font-bold">
          {{ index + 1 }}. {{ item.title }}
        </p>
        <div v-if="user && user?.id === item.authorId" class="text-3xl space-x-3">
          <Icon name="material-symbols:edit-note" class="hover:text-green-500" @click.prevent="toEdit(item.id!)" />
          <Icon name="ic:outline-delete-sweep" class="hover:text-green-500" @click.prevent="deleteLink(item.id!)" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
