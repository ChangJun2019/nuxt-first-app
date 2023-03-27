<script lang="ts" setup>
type ValidPropsType = 'login' | 'register'

interface LoginSettings {
  title: string
  btn: string
  tip: string
  redirectTip: string
  redirect: '/sign-up' | '/login'
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
    },
    register: {
      title: 'Create an account',
      btn: 'Create account',
      tip: 'Already have an account?',
      redirectTip: 'Login here.',
      redirect: '/login',
    },
  }

  return loginSettings[type as ValidPropsType]
})
</script>

<template>
  <div class="w-full max-w-sm mx-auto p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-dark-800 dark:border-gray-500">
    <form class="space-y-6" action="#">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">
        {{ settings.title }}
      </h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input id="email" type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input id="password" type="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
      </div>
      <button type="submit" class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
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
