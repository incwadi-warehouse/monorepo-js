import { describe, it, expect } from 'vitest'
import { useSnow } from '../useSnow.js'

describe('useSnow', () => {
  it('hasSnow', () => {
    const { hasSnow } = useSnow()

    expect(hasSnow.value).toBeTypeOf('boolean')
  })
})
