import { describe, it, expect } from 'vitest'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'
import { useAuth } from '../useAuth.js'

describe('JWTAuth', () => {
  const { config, setAuthHeader } = useRequest()
  config.value.baseURL = 'http://localhost:3000'

  const {
    token,
    refreshToken,
    user,
    isAuthenticated,
    interval,
    refresh,
    getUser,
    checkForRefresh,
    watchToken,
  } = useAuth()

  setAuthHeader(token.value)

  watchToken()

  it('refresh', () => {
    refresh().then(() => {
      expect(isAuthenticated.value).toBeTruthy()

      expect(token.value).toBe('token')
      expect(refreshToken.value).toBe('refresh_token')
      expect(Cookies.get('token')).toBe('token')
      expect(Cookies.get('refresh_token')).toBe('refresh_token')
    })
  })

  it('get user', () => {
    getUser().then(() => {
      expect(user.value).not.toBeNull()
    })
  })

  it('check token', () => {
    interval.value = undefined

    Cookies.remove('token')
    Cookies.remove('refresh_token')

    watchToken()
    expect(interval.value).toBeUndefined()

    Cookies.set('token', 'token')
    Cookies.remove('refresh_token')

    watchToken()
    expect(interval.value).toBeUndefined()

    Cookies.remove('token')
    Cookies.set('refresh_token', 'refresh_token')

    watchToken()
    expect(interval.value).toBeUndefined()

    Cookies.set('token', 'token')
    Cookies.set('refresh_token', 'refresh_token')

    watchToken()
    expect(interval.value).not.toBeUndefined()
  })

  it('check for refresh', () => {
    interval.value = undefined

    Cookies.set('token', 'token')
    Cookies.remove('refresh_token')
    checkForRefresh(null, 'token')
    expect(interval.value).toBeUndefined()

    Cookies.set('token', 'token')
    Cookies.set('refresh_token', 'refresh_token')
    checkForRefresh(null, 'token')
    expect(interval.value).not.toBeUndefined()

    checkForRefresh('token', null)
    expect(interval.value).toBeUndefined()

    checkForRefresh(null, null)
    expect(interval.value).toBeUndefined()

    checkForRefresh('token', 'token')
    expect(interval.value).toBeUndefined()
  })
})
