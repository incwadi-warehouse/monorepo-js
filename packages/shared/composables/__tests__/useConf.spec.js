import { describe, it, expect, vi } from 'vitest'
import { useConf } from '../useConf.js'

vi.mock('../useRequest.js', () => ({
  useRequest: () => {
    return {
      localConfig: { value: { baseUrl: '' } },
      setAuthHeader: vi.fn(),
      request: (method, url) => {
        if (method === 'get' && url === '/user/1/snow') {
          return { data: { value: false } }
        }
        if (method === 'post' && url === '/user/1/snow') {
          return { data: { value: true } }
        }
        return
      },
    }
  },
}))

describe('Conf', () => {
  it('getConf', async () => {
    const { getConf } = useConf('token', 'http://localhost/api', 'user', 1)

    const res = await getConf('snow')

    expect(res).toBeFalsy()
  })

  it('setConf', async () => {
    const { setConf } = useConf('token', 'http://localhost/api', 'user', 1)

    const res = await setConf('snow', true)

    expect(res).toBeTruthy()
  })
})
