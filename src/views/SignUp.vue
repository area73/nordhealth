<script setup lang="ts">
import { onMounted, ref } from 'vue'

const hidePassword = ref(true)
const toggleVisibility = () => {
  hidePassword.value = !hidePassword.value
}

onMounted(() => {
  const form = document.querySelector('#signup') as HTMLFormElement
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    console.log(JSON.stringify(Object.fromEntries(data)))
  })
})
</script>
<template>
  <div class="signup">
    <h1>This is The sign up page</h1>
    <form id="signup" action="/success">
      <provet-stack>
        <provet-input
          label="email"
          name="email"
          type="email"
          placeholder="business email"
          required="true"
        >
          <div slot="error">error</div>
        </provet-input>
        <section class="n-stack-horizontal n-gap-xs">
          <provet-input
            label="password"
            name="password"
            :type="hidePassword ? 'password' : 'text'"
            placeholder="minimum 8 characters"
            required="true"
            error="This field is required"
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
          name="option"
          value="1"
          label="receive occasional product updates and announcements."
        ></provet-checkbox>

        <provet-button variant="primary" type="submit" error="This field is required"
          >Submit</provet-button
        >
      </provet-stack>
    </form>
  </div>
</template>

<style></style>
