<script setup lang="ts">
/**
 * Developer information:
 * To retrieve the data from the form since we are using web component we could rely on
 * standard browser API access by adding an event listener to the submit and then retrieving
 * data from the form and then  wrapped it inside a Vue 3 onMounted hook
 * example:
 * <code>
  onMounted(() => {
    const form = document.querySelector('#signup') as HTMLFormElement
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      const data = new FormData(form)
      console.log(JSON.stringify(Object.fromEntries(data)))
    })
  })
  </code>
 * This approach is used on https://provetcloud.design/web-components/#vue
 *
 * In this case I wanted to do it more Vue 3 style and stick to the way Vue handles and validate
 * forms, and because it look like the web components accepts v-model I can use this approach.
 *
 * In Vue 3 they recomend to use the reactive binding "v-model" and use the directive
 *  @submit.prevent to avoid default behaviour and do the validation logic in a method
 *
**/
import { ref, reactive } from 'vue'

import { useFormValidator, type FormDataForm } from '@/composables/formValidator'
import { useFormPost } from '@/composables/formPost'

const { validate, hasErrors } = useFormValidator()
const { postFormData, isLoading, error, response } = useFormPost()

const formData = reactive<FormDataForm>({
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
  allowCommunication: false,
})

const hidePassword = ref(true)
/**
 * Toggle the visibility of the password.
 *
 * When the method is called, the `hidePassword` ref is toggled. This ref is
 * used to conditionally render the password as a plain text or a password
 * input type.
 */
const toggleVisibility = () => {
  hidePassword.value = !hidePassword.value
}

async function onSubmit() {
  Object.assign(formData, validate(formData))

  if (hasErrors(formData)) {
    console.log(formData)
  } else {
    console.log('1', isLoading.value)
    await postFormData('https://your-api-endpoint.com/submit', formData)

    // Log or handle the response as needed
    console.log('2', response.value)
    console.log('3', error.value)
    console.log('4', isLoading.value)
    console.log('5', 'good to go')
  }
}
</script>
<template>
  <div class="signup">
    <h1>This is The sign up page</h1>

    <form id="signup" @submit.prevent="onSubmit" action="/success">
      <provet-stack>
        <provet-input
          v-model="formData.email!.value"
          label="email"
          name="email"
          type="email"
          placeholder="business email"
          required="true"
          :error="formData.email?.error"
        >
        </provet-input>
        <section class="n-stack-horizontal n-gap-xs">
          <provet-input
            v-model="formData.password!.value"
            label="password"
            name="password"
            :type="hidePassword ? 'password' : 'text'"
            placeholder="minimum 8 characters"
            required="true"
            :error="formData.password?.error"
          >
          </provet-input>
          <provet-button href="#" variant="primary" @click="toggleVisibility">
            <!--
            Note: The initial idea was to use name as dynamic ie :name="hidePassword ? 'interface-edit-on':'interface-edit-off'"
            but it turns out that the WC is not reactive.
            I found a workaround less elegant but effective
            -->
            <provet-icon slot="start" name="interface-edit-off" v-if="hidePassword"></provet-icon>
            <provet-icon slot="start" name="interface-edit-on" v-if="!hidePassword"></provet-icon>
          </provet-button>
        </section>
        <provet-checkbox
          v-model="formData.allowCommunication"
          name="allowCommunication"
          value="0"
          label="receive occasional product updates and announcements."
          error=""
        ></provet-checkbox>

        <provet-button variant="primary" type="submit">Submit</provet-button>
      </provet-stack>
    </form>
  </div>
</template>

<style></style>
