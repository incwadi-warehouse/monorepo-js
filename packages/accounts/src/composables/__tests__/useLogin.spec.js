import { describe, it, expect, vi, afterEach } from 'vitest'
import { useLogin } from '../useLogin.js'

vi.mock('@baldeweg/ui', () => {
  const useRequest = () => {
    const request = (method, path, data) => {
      return new Promise((resolve, reject) => {
        if (data.username === 'user' && data.password === 'pass') {
          resolve({
            data: { token: 'token', refresh_token: 'refresh_token' },
          })
        } else {
          reject()
        }
      })
    }

    return { request }
  }

  return { useRequest }
})

vi.mock('@/composables/useToken.js', () => {
  const useToken = () => {
    const persist = () => {}

    return { persist }
  }

  return { useToken }
})

describe('Login', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Logging In a User', async () => {
    const { username, password, isLoggingIn, hasSuccess, hasError, login } =
      useLogin()

    username.value = 'user'
    password.value = 'pass'

    await login()

    expect(isLoggingIn.value).toBeFalsy()
    expect(hasSuccess.value).toBeTruthy()
    expect(hasError.value).toBeFalsy()

    expect(username.value).toBeNull()
    expect(password.value).toBeNull()
  })

  it('Fails Logging In a User', async () => {
    const { username, password, isLoggingIn, hasSuccess, hasError, login } =
      useLogin()

    username.value = 'user'
    password.value = '123'

    await login()

    expect(isLoggingIn.value).toBeFalsy()
    expect(hasSuccess.value).toBeFalsy()
    expect(hasError.value).toBeTruthy()

    expect(username.value).toBeNull()
    expect(password.value).toBeNull()
  })
})
