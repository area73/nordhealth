import { describe, it, expect } from 'vitest'
import { useFormValidator } from './formValidator'

describe('useFormValidator', () => {
  const { validate, hasErrors } = useFormValidator()

  describe('validate', () => {
    it('should validate a form with valid email and password', () => {
      const form = {
        email: { value: 'test@example.com', error: '' },
        password: { value: 'password123', error: '' },
      }
      const result = validate(form)

      expect(result.email?.error).toBe('')
      expect(result.password?.error).toBe('')
    })

    it('should validate a form with invalid email and empty password', () => {
      const form = {
        email: { value: 'invalid-email', error: '' },
        password: { value: '', error: '' },
      }
      const result = validate(form)

      expect(result.email?.error).toBe('Invalid email format')
      expect(result.password?.error).toBe('Password cannot be empty')
    })

    it('should validate a form with missing fields', () => {
      const form = { otherValue: 'test' }
      const result = validate(form)
      expect(result).toEqual({})
      expect(result.email?.error).toBe(undefined)
      expect(result.password?.error).toBe(undefined)
    })
  })

  describe('hasErrors', () => {
    it('should return true if the form has errors', () => {
      const formWithErrors = {
        email: { value: 'invalid-email', error: 'Invalid email format' },
        password: { value: '', error: 'Password cannot be empty' },
      }
      const result = hasErrors(formWithErrors)

      expect(result).toBe(true)
    })

    it('should return false if the form has no errors', () => {
      const formWithoutErrors = {
        email: { value: 'test@example.com', error: '' },
        password: { value: 'password123', error: '' },
      }
      const result = hasErrors(formWithoutErrors)

      expect(result).toBe(false)
    })

    it('should return false for an empty form', () => {
      const emptyForm = {}
      const result = hasErrors(emptyForm)

      expect(result).toBe(false)
    })
  })
})
