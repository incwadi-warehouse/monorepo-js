import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createUi } from '@baldeweg/ui'
import ListApps from '@/components/ListApps.vue'

const ui = createUi()

describe('ListApps', () => {
  it('lists apps', () => {
    const wrapper = mount(ListApps, {
      plugins: [ui],
    })

    expect(wrapper.html()).toContain('<b-flex-row')
  })
})
