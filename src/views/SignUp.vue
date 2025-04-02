<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

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
        <provet-input
          label="password"
          name="password"
          type="password"
          placeholder="minimum 8 characters"
          required="true"
          error="This field is required"
        >
        </provet-input>
        <provet-button variant="primary" type="submit" error="This field is required"
          >Submit</provet-button
        >
      </provet-stack>
    </form>

    <RouterLink to="/success">success</RouterLink>
  </div>
</template>

<style></style>
