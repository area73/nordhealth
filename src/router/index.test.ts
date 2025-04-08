import { describe, it, expect, vi } from 'vitest'

import router from './index'
import SignUp from '../views/SignUp.vue'

describe('Router', () => {
  it('should be properly instantiated', () => {
    expect(typeof router.resolve).toBe('function')
  })

  it('should have the correct routes', () => {
    const routes = router.getRoutes()
    const signUpRoute = routes.find((route) => route.path === '/')
    expect(signUpRoute).toBeDefined()
    expect(signUpRoute?.name).toBe('signup')
    expect(signUpRoute?.components?.default).toBe(SignUp)

    // Check the '/success' route
    const successRoute = routes.find((route) => route.path === '/success')
    expect(successRoute).toBeDefined()
    expect(successRoute?.name).toBe('success')
    expect(successRoute?.components?.default).toBeTypeOf('function') // Dynamic import
  })

  it('should resolve the dynamic import for the success route', async () => {
    const successRoute = router.getRoutes().find((route) => route.path === '/success')
    expect(successRoute).toBeDefined()
    await (successRoute?.components?.default as unknown as () => Promise<unknown>)()
  })
})
