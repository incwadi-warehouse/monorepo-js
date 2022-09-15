import { describe, it, expect, vi, afterEach } from 'vitest'
import Cookies from 'js-cookie'
import { useLogout } from '@/composables/useLogout.js'

vi.mock('@/composables/useToken.js', () => {
  const useToken = () => {
    const persist = () => {}

    return { persist }
  }

  return { useToken }
})

describe('Logout', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Logout a User', () => {
    const { logout } = useLogout()

    logout()

    expect(Cookies.get('token')).toBeUndefined()
    expect(Cookies.get('refresh_token')).toBeUndefined()
  })
})
