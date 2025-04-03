export type FormDataForm = {
  email?: {
    value: string
    error: string
  }
  password?: {
    value: string
    error: string
  }
} & Record<string, unknown>

const passwordCheck = (password: string) => {
  const passwordForm = {
    value: password,
    error: '',
  }
  if (password === '') {
    passwordForm.error = 'Password cannot be empty'
  }
  return passwordForm
}
const addEmailCheck = (email: string) => {
  const emailForm = {
    value: email,
    error: '',
  }
  // regular expression to check email
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValid = re.test(String(email).toLowerCase())
  if (!isValid) {
    emailForm.error = email === '' ? 'Email cannot be empty' : 'Email not valid'
  }
  return emailForm
}

export const useFormValidator = () => {
  const validate = (form: FormDataForm) => {
    const formWithErrors: FormDataForm = {}
    if (form.email) {
      formWithErrors.email = addEmailCheck(form.email.value)
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
