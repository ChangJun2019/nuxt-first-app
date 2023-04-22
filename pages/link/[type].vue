<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import type { Link } from '@/types/link'

definePageMeta({
  validate: async (route) => {
    return ['create', 'edit'].includes(route.params.type as string)
  },
})

const route = useRoute()
const mode = computed(() => {
  return route.params.type
})

const $q = useQuasar()
const url = ref('')
const title = ref('')
const editId = ref()

const getEditFetch = async () => {
  editId.value = useRouteQuery('id').value
  const { data: link } = await useFetch(`/api/post/${editId.value}`)
  if (link.value) {
    title.value = link.value.title
    url.value = link.value.url
  }
}

if (mode.value === 'edit')
  await getEditFetch()

const createFetch = async (params: Link) => {
  return await useFetch('/api/post', {
    method: 'POST',
    body: params,
  })
}

const editFetch = async (params: Link) => {
  return await useFetch(`/api/post/${editId.value}`, {
    method: 'PUT',
    body: params,
  })
}

const submitForm = async () => {
  const isEdit = mode.value === 'edit'
  const params = {
    url: unref(url),
    title: unref(title),
  }

  const { data } = isEdit ? await editFetch(params) : await createFetch(params) as any

  if (data.value?.success) {
    useTimeoutFn(() => {
      navigateTo('/')
    }, 5500)
    $q.notify({
      type: 'positive',
      message: `${mode.value} successfully`,
      timeout: 5000,
    })
  }
}
</script>

<template>
  <div class="my-24 w-full max-w-sm mx-auto p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-dark-800 dark:border-gray-500">
    <form class="space-y-6" action="#" @submit.prevent="submitForm">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">
        {{ mode }} link
      </h5>
      <div>
        <label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">url</label>
        <input id="url" v-model="url" type="url" name="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="https://" required>
      </div>
      <div>
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">title</label>
        <input id="title" v-model="title" name="title" placeholder="..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
      </div>
      <button type="submit" :disabled="!url || !title " class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        submit
      </button>
    </form>
  </div>
</template>

<style scoped></style>
