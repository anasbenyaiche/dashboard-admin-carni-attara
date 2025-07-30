<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="closeModal"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
        :class="sizeClasses"
      >
        <!-- Modal header -->
        <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3
                class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                id="modal-title"
              >
                {{ title }}
              </h3>
              <div class="mt-2">
                <slot />
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <slot name="footer">
            <button
              type="button"
              @click="$emit('confirm')"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ confirmText }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ cancelText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  isOpen: boolean
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  confirmText: 'Confirm',
  cancelText: 'Cancel'
})

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'sm:max-w-lg sm:w-full'
    case 'md':
      return 'sm:max-w-2xl sm:w-full'
    case 'lg':
      return 'sm:max-w-4xl sm:w-full'
    case 'xl':
      return 'sm:max-w-6xl sm:w-full'
    default:
      return 'sm:max-w-2xl sm:w-full'
  }
})

const closeModal = () => {
  emit('close')
}
</script>