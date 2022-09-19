import { describe, it, expect, vi, afterEach } from 'vitest'
import { useRedirect } from '@/composables/useRedirect.js'

const location = new URL('http://a.localhost')
location.assign = vi.fn()
location.replace = vi.fn()
location.reload = vi.fn()

delete window.location
window.location = location

describe('Redirect', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Redirects to Target', () => {
    const { redirect } = useRedirect({ allowedHosts: ['a.localhost'] })

    expect(redirect('http://a.localhost')).toBeTruthy()
    expect(redirect('http://b.localhost')).toBeFalsy()
  })
})
