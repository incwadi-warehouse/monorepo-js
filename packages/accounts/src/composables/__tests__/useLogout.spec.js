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

vi.mock('vue-router', () => {
  const useRouter = () => {
    const push = vi.fn()

    return { push }
  }

  return { useRouter }
})

describe('Logout', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Logout a User', () => {
    const { logout } = useLogout()

    logout()

    expect(Cookies.get('auth')).toBeUndefined()
  })
})
