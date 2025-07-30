<template>
  <div class="space-y-6">
    <!-- Form Header -->
    <div v-if="title" class="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ title }}</h3>
      <p v-if="description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ description }}</p>
    </div>

    <!-- Form Content -->
    <form @submit.prevent="$emit('submit')" class="space-y-4">
      <slot />
      
      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
        >
          {{ cancelText }}
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ submitText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  description?: string
  submitText?: string
  cancelText?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  submitText: 'Save',
  cancelText: 'Cancel',
  loading: false
})

defineEmits<{
  submit: []
  cancel: []
}>()
</script>