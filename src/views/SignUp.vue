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
 * In Vue 3 they recommend to use the reactive binding "v-model" and use the directive
 *  @submit.prevent to avoid default behavior and do the validation logic in a method
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
    await postFormData('/api/user-signup', formData)

    // Log or handle the response as needed
    console.log('response: ', response.value)
    console.log('error: ', error.value)
    console.log('isLoading: ', isLoading.value)
  }
}
</script>
<template>
  <div class="signup n-grid-2 n-padding-xxl">
    <div class="product">
      <div class="n-typescale-xl">
        Condrovet Force HA <provet-badge variant="highlight">new product</provet-badge>
      </div>
      <img src="../assets/dog.webp" alt="" aria-hidden="true" class="image-product" />
    </div>
    <div class="n-padding-xl n-border subscription-panel">
      <form id="signup" @submit.prevent="onSubmit" action="/success">
        <provet-stack gap="xl">
          <provet-input
            v-model="formData.email!.value"
            label="email"
            name="email"
            type="email"
            placeholder="business email"
            required="true"
          >
            <span slot="error" v-if="formData.email?.error" class="error-tag">{{
              formData.email?.error
            }}</span>
          </provet-input>
          <section class="n-stack-horizontal-s n-gap-xs">
            <provet-input
              v-model="formData.password!.value"
              label="password"
              name="password"
              :type="hidePassword ? 'password' : 'text'"
              placeholder="minimum 8 characters"
              required="true"
            >
              <span slot="error" v-if="formData.password?.error" class="error-tag">{{
                formData.password?.error
              }}</span>
            </provet-input>
            <span class="vertical-gap">
              <provet-button href="#" variant="primary" @click="toggleVisibility" class="btn">
                <!--
            Note: The initial idea was to use name as dynamic ie :name="hidePassword ? 'interface-edit-on':'interface-edit-off'"
            but it turns out that the WC is not reactive.
            I found a workaround less elegant but effective
            -->

                <provet-icon
                  slot="start"
                  name="interface-edit-off"
                  v-if="hidePassword"
                ></provet-icon>
                <provet-icon
                  slot="start"
                  name="interface-edit-on"
                  v-if="!hidePassword"
                ></provet-icon>
              </provet-button>
            </span>
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
  </div>
</template>

<style>
.signup {
  border-radius: 0 0 4px 4px;
}
.product {
  text-align: center;
}
.image-product {
  margin: 16px 16px 0 16px;
  width: 100%;
  max-width: 283px;
}

.subscription-panel {
  min-width: 293px;
}

.vertical-gap {
  margin-top: 28px;
}

@media (max-width: 600px) {
  .image-product {
    display: none;
  }
  .signup {
    display: block !important;
  }
}
</style>
