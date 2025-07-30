<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Redirect to dashboard if on home page
  if (router.currentRoute.value.path === '/') {
    router.push('/dashboard')
  }
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
