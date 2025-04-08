import { ref } from 'vue'
import type { FormDataForm } from './formValidator'

/**
 * @module useFormPost
 * @description Provides a function to post a form data object to a given URL.
 * @example
 * const { postFormData, isLoading, error, response } = useFormPost()
 * postFormData('https://example.com/api', formData)
 */
export function useFormPost() {
  /**
   * Whether the form is currently being posted.
   */
  const isLoading = ref(false)
  /**
   * The error message in case of an error.
   */
  const error = ref<string | null>(null)
  /**
   * The server response in case of success.
   */
  const response = ref(null)

  /**
   * Posts a form data object to a given URL.
   * @param url The URL to post to.
   * @param formData The form data object to post.
   */
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
