import { describe, it, expect, vi, afterEach } from 'vitest'
import { usePassword } from '../usePassword.js'

vi.mock('@baldeweg/ui', () => {
  const useRequest = () => {
    const request = (method, path, data) => {
      return new Promise((resolve, reject) => {
        data.password === 'invalid' ? reject() : resolve()
      })
    }

    return { request }
  }

  return { useRequest }
})

describe('Password', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Updates Password', async () => {
    const { password, update, hasSuccess, hasError, isUpdating } = usePassword()

    password.value = 'valid'

    await update()

    expect(password.value).toBeNull()
    expect(hasSuccess.value).toBeTruthy()
    expect(hasError.value).toBeFalsy()
    expect(isUpdating.value).toBeFalsy()
  })

  it('Fails Updating Password', async () => {
    const { password, update, hasSuccess, hasError, isUpdating } = usePassword()

    password.value = 'invalid'

    await update()

    expect(password.value).toEqual('invalid')
    expect(hasSuccess.value).toBeFalsy()
    expect(hasError.value).toBeTruthy()
    expect(isUpdating.value).toBeFalsy()
  })
})
