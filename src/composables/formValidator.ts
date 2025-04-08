export interface FormDataForm {
  email?: {
    value: string
    error: string
  }
  password?: {
    value: string
    error: string
  }
  [key: string]: unknown
}

/**
 * Validate a password by checking if it is empty.
 * @param password - password to check
 * @returns - object with the password value and an error message if it is empty
 */
const passwordCheck = (password: string): { value: string; error: string } => {
  const passwordForm = {
    value: password,
    error: '',
  }

  // Check if password is empty
  if (password === '') {
    passwordForm.error = 'Password cannot be empty'
  }

  return passwordForm
}
const validateEmail = (email: string) => {
  const emailValidationResult = {
    value: email,
    error: '',
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = emailRegex.test(email.toLowerCase())
  if (!isValidEmail) {
    emailValidationResult.error = email === '' ? 'Email cannot be empty' : 'Invalid email format'
  }

  return emailValidationResult
}

export const useFormValidator = () => {
  const validate = (form: FormDataForm) => {
    const formWithErrors: FormDataForm = {}
    if (form.email) {
      formWithErrors.email = validateEmail(form.email.value)
    }
    if (form.password) {
      formWithErrors.password = passwordCheck(form.password.value)
    }
    // TODO: we can add more validation here
    return formWithErrors
  }

  const hasErrors = (formData: FormDataForm) =>
    Object.values(formData).some(
      (field) => field && typeof field === 'object' && 'error' in field && field.error !== '',
    )

  return { validate, hasErrors }
}
