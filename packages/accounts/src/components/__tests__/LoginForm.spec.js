import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createUi } from '@baldeweg/ui'
import LoginForm from '@/components/LoginForm.vue'

const ui = createUi()

vi.mock('@/composables/useLogin.js', () => {
  const useLogin = () => {
    const username = null
    const password = null

    return { username, password }
  }

  return { useLogin }
})

describe('LoginForm', () => {
  it('displays login form', () => {
    const wrapper = mount(LoginForm, {
      plugins: [ui],
    })

    console.log('element', wrapper.html())

    expect(wrapper.html()).toContain('<b-form')
  })
})
