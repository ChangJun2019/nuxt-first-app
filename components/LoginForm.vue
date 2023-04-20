<script lang="ts" setup>
import { useQuasar } from 'quasar'

type ValidPropsType = 'login' | 'register'

interface LoginSettings {
  title: string
  btn: string
  tip: string
  redirectTip: string
  redirect: '/sign-up' | '/login'
  api: '/signup' | '/login'
  go: '/login' | '/'
  successTip: string
}
type LoginSettingsMap = Record<ValidPropsType, LoginSettings>

const { type } = $defineProps<{
  type: ValidPropsType
}>()

const settings = computed(() => {
  const loginSettings: LoginSettingsMap = {
    login: {
      title: 'Sign in to your account',
      btn: 'Sign in to accout',
      tip: 'Not registered?',
      redirectTip: 'Create an account.',
      redirect: '/sign-up',
      api: '/login',
      go: '/',
      successTip: 'login successfully , Will go to home',
    },
    register: {
      title: 'Create an account',
      btn: 'Create account',
      tip: 'Already have an account?',
      redirectTip: 'Login here.',
      redirect: '/login',
      api: '/signup',
      go: '/login',
      successTip: 'registered successfully , Will go to login',
    },
  }

  return loginSettings[type as ValidPropsType]
})

const $q = useQuasar()
const router = useRouter()

const email = ref()
const password = ref()
const submitIsLoading = ref(false)

const submitForm = async () => {
  const _settings = unref(settings)
  const { data, pending } = await useFetch(`/api${_settings.api}`, {
    method: 'POST',
    body: {
      email: unref(email),
      password: unref(password),
    },
  })
  syncRef(submitIsLoading, pending)
  $q.notify({
    type: 'positive',
    message: _settings.successTip,
    timeout: 5000,
  })
  useTimeoutFn(() => {
    router.push(_settings.go)
  }, 5500)
}
</script>

<template>
  <div class="w-full max-w-sm mx-auto p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-dark-800 dark:border-gray-500">
    <form class="space-y-6" action="#" @submit.prevent="submitForm">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">
        {{ settings.title }}
      </h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input id="email" v-model="email" type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input id="password" v-model="password" type="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
      </div>
      <button type="submit" :disabled="!email || !password || submitIsLoading" class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        {{ settings.btn }}
      </button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        {{ settings.tip }}
        <NuxtLink :to="settings.redirect" class="text-green-700 hover:underline dark:text-green-500">
          {{ settings.redirectTip }}
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
