import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFormPost } from './formPost'

describe('useFormPost', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn()
    global.fetch = fetchMock
  })

  it('should initialize with default values', () => {
    const { isLoading, error, response } = useFormPost()
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(response.value).toBe(null)
  })

  it('should handle a successful form submission', async () => {
    const { postFormData, isLoading, error, response } = useFormPost()
    const mockResponse = { success: true }
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const formData = { name: 'John Doe' }
    const url = 'https://example.com/api'

    const promise = postFormData(url, formData)

    expect(isLoading.value).toBe(true)
    await promise

    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(response.value).toEqual(mockResponse)
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
  })

  it('should handle a failed form submission (non-2xx status)', async () => {
    fetchMock.mockResolvedValueOnce({
      error: 'not allowed',
      status: 400,
    })
  })
})
