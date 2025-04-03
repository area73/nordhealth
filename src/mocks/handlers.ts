// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/user-signup', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newPost = await request.json()
    // console.log('newPost: ', newPost)
    // generic error
    return HttpResponse.json(newPost, { status: 401 })
    // network error
    //return HttpResponse.error()
    // response and send back the newly created post!
    // return HttpResponse.json(newPost, { status: 201 })
  }),
]
