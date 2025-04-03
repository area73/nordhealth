import { ref } from 'vue'
import type { FormDataForm } from './formValidator'

export function usePostForm() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const response = ref(null)

  async function postFormData(url: string, formData: FormDataForm) {
    isLoading.value = true
    error.value = null

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      response.value = await res.json()
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'An error occurred'
      }
    } finally {
      isLoading.value = false
    }
  }

  return { postFormData, isLoading, error, response }
}
