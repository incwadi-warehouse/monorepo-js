import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createUi } from '@baldeweg/ui'
import LoginForm from '@/components/LoginForm.vue'

const ui = createUi()

describe('LoginForm', () => {
  it('displays login form', () => {
    const wrapper = mount(LoginForm, {
      plugins: [ui],
    })

    expect(wrapper.html()).toContain('<b-form')
  })
})
