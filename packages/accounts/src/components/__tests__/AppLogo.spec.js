import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppLogo from '@/components/AppLogo.vue'
import router from '@/router'

describe('AppLogo', () => {
  it('displays svg', () => {
    const wrapper = mount(AppLogo, {
      plugins: [router],
    })

    expect(wrapper.html()).toContain('<svg')
  })
})
