import { describe, it, expect } from 'vitest'
import { useParty } from '../useParty.js'

describe('useParty', () => {
  it('hasParty', () => {
    const { hasParty } = useParty()

    expect(hasParty.value).toBeTypeOf('boolean')
  })
})
