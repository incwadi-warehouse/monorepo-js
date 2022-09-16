import { describe, it, expect, vi, afterEach } from 'vitest'
import { useToken } from '@/composables/useToken.js'

const date = new Date()
const authToken = {
  token: 'token',
  refreshToken: 'refresh_token',
  tokenExpire: Math.floor(date.getTime() / 1000) + 100,
}

const authTokenResponse = {
  token: 'token',
  refresh_token: 'refresh_token',
}

var userResponse = { status: 200, data: {} }

vi.mock('@baldeweg/ui', () => {
  const useRequest = () => {
    const request = (method, path, data) => {
      return new Promise((resolve, reject) => {
        if (path === '/api/me') {
          resolve(userResponse)
        }

        if (path === '/api/token/refresh') {
          if (data.refresh_token === 'invalid') {
            reject()
          } else {
            resolve({ data: authTokenResponse })
          }
        }

        reject()
      })
    }

    const setAuthHeader = vi.fn()

    return { request, setAuthHeader }
  }

  return { useRequest }
})

describe('Token', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Watches Auth', async () => {
    const { auth, watcher } = useToken()

    auth.value = null
    expect(auth.value).toBeNull()

    watcher()

    auth.value = {
      token: 'token',
      refreshToken: 'refresh_token',
      tokenExpire: 1,
    }
    expect(auth.value).not.toBeNull()
  })

  it('Persist Auth', () => {
    const { auth, persist } = useToken()

    persist(authToken)

    expect(auth.value).toStrictEqual(authToken)
    expect(JSON.parse(sessionStorage.getItem('auth'))).toStrictEqual(authToken)
  })
})
