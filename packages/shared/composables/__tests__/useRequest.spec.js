import { describe, it, expect, vi, afterEach } from 'vitest'
import { useRequest } from '../useRequest.js'

vi.mock('axios', () => ({
  default: {
    create: () => {
      return {
        request: vi.fn().mockResolvedValue({ data: 'data' }),
      }
    },
  },
}))

describe('useRequest', () => {
  afterEach(() => {
    vi.restoreAllMocks
  })

  it('Request', async () => {
    const { request } = useRequest()
    const res = await request('get', 'localhost', 'data')

    expect(res.data).toBe('data')
  })

  it('Config', async () => {
    const { globalConfig, localConfig, config, request } = useRequest()
    await request('get', 'localhost', 'data')

    expect(typeof globalConfig).toBe('object')
    expect(typeof localConfig).toBe('object')

    globalConfig.value.test = 1
    expect(globalConfig.value.test).toBe(1)

    localConfig.value.test = 2
    expect(localConfig.value.test).toBe(2)

    expect(config.value.test).toBe(2)
  })
})
