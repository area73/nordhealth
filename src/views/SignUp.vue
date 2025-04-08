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
import { useRouter } from 'vue-router'

const router = useRouter()

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
    if (response.value) {
      // Handle the response if needed
      console.log('Form submitted successfully:', response.value)
      router.push('/success')
    }
  }
}
</script>
<template>
  <provet-notification-group v-if="error">
    <provet-notification>
      <span slot="icon"></span>
      <provet-banner variant="danger">
        <strong>We’re experiencing an incident. Please try again</strong>
        <div>{{ error }}</div>
      </provet-banner>
    </provet-notification>
  </provet-notification-group>
  <div class="loading-spinner" v-if="isLoading">
    <provet-spinner size="xxl"></provet-spinner>
  </div>
  <div class="signup n-grid-2 n-padding-xxl">
    <div class="product">
      <div class="n-typescale-xl">
        Condrovet Force HA <provet-badge variant="highlight">new product</provet-badge>
      </div>
      <img src="../assets/dog.webp" alt="" aria-hidden="true" class="image-product" />
    </div>
    <div class="n-padding-xl n-border subscription-panel">
      <form id="signup" @submit.prevent="onSubmit">
        <provet-stack gap="xl">
          <provet-input
            v-model="formData.email!.value"
            label="email"
            name="email"
            type="email"
            placeholder="business email"
            required="true"
            :disabled="isLoading"
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
              :disabled="isLoading"
            >
              <span slot="error" v-if="formData.password?.error" class="error-tag">{{
                formData.password?.error
              }}</span>
            </provet-input>
            <span class="vertical-gap">
              <provet-button
                href="#"
                variant="primary"
                @click="toggleVisibility"
                class="btn"
                aria-describedby="tooltip-hide"
              >
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

          <provet-button
            variant="primary"
            type="submit"
            :disabled="isLoading"
            aria-describedby="tooltip-submit"
            >Submit</provet-button
          >
        </provet-stack>
        <provet-tooltip id="tooltip-hide" style="--n-tooltip-max-size: 200px">
          Show / hide password
        </provet-tooltip>
        <provet-tooltip
          delay="0"
          position="block-end"
          id="tooltip-submit"
          style="--n-tooltip-max-size: 300px"
        >
          <div>
            <p>DEV HINT:</p>
            <p>if you use 123 as a password you will get an error message (401)</p>
            <p>if you use 456 as a password you will get a network error</p>
          </div>
        </provet-tooltip>
      </form>
    </div>
  </div>
</template>

<style>
.loading-spinner {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.signup {
  border-radius: 0 0 4px 4px;
  border: 1px solid var(--n-color-border);
}
.product {
  text-align: center;
}
.image-product {
  margin: 20px 16px 0 16px;
  width: 100%;
  max-width: 283px;
}

.subscription-panel {
  min-width: 293px;
}

.vertical-gap {
  margin-top: 28px;
}

@media (max-width: 768px) {
  .product {
    padding-bottom: 16px;
  }
  .image-product {
    display: none;
  }
  .signup {
    display: block !important;
    padding: var(--n-space-m) !important;
  }
}
</style>
