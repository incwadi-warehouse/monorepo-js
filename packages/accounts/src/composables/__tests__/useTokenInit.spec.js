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

  it('Init without data', () => {
    const { auth, user, init } = useToken()

    expect(user.value).toBeNull()
    expect(auth.value).toBeNull()

    init()
    expect(auth.value).toBeNull()
    expect(user.value).toBeNull()
  })

  it('Init with refresh token only', async () => {
    const { auth, init } = useToken()

    auth.value = Object.assign({}, authToken)
    auth.value.token = null

    await init()

    expect(auth.value.token).toBe('token')
  })

  it('Init with invalid refresh token', async () => {
    const { auth, init } = useToken()

    auth.value = Object.assign({}, authToken)
    auth.value.token = null
    auth.value.refreshToken = 'invalid'

    await init()

    expect(auth.value).toBeNull()
  })

  it('Init with invalid token', async () => {
    userResponse.status = 403

    const { auth, init } = useToken()
    auth.value = Object.assign({}, authToken)
    auth.value.token = 'invalid'
    auth.value.refreshToken = 'invalid'

    await init()

    expect(auth.value).toBeNull()
  })

  it('Init with expired token', async () => {
    const { auth, init } = useToken()

    auth.value = Object.assign({}, authToken)
    auth.value.tokenExpire = 1

    await init()

    expect(auth.value).not.toBeNull()
    expect(auth.value.tokenExpire).toBeGreaterThan(1)
  })

  it('Init with valid tokens', async () => {
    const { auth, init } = useToken()

    auth.value = Object.assign({}, authToken)

    await init()

    expect(auth.value).not.toBeNull()
  })
})
