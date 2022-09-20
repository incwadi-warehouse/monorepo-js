import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createUi } from '@baldeweg/ui'
import ChangePassword from '@/components/ChangePassword.vue'

const ui = createUi()

describe('ChangePassword', () => {
  it('displays change password form', () => {
    const wrapper = mount(ChangePassword, {
      plugins: [ui],
    })

    expect(wrapper.html()).toContain('<b-form')
  })
})
