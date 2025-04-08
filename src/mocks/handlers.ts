import { http, HttpResponse, delay } from 'msw'

export const handlers = [
  http.post('/api/user-signup', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newPost = (await request.json()) as {
      password: { value: string }
      [key: string]: unknown
    }
    // TODO: this is only meant for demo purpose. We are delayng the response to see the loading state
    await delay(3000)
    // generic error
    if (newPost.password.value === '123') {
      return HttpResponse.json(newPost, { status: 401 })
    }
    // network error
    if (newPost.password.value === '456') {
      return HttpResponse.error()
    }
    // response and send back the newly created post!
    return HttpResponse.json(newPost, { status: 201 })
  }),
]
