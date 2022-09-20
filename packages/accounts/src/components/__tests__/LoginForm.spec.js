import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import LoginForm from '@/components/LoginForm.vue'

vi.mock('vue-router', () => {
  const useRouter = vi.fn()

  const useRoute = () => {
    const query = { redirect: null }

    return { query }
  }

  return { useRouter, useRoute }
})

test('displays login form', () => {
  const wrapper = mount(LoginForm, {})

  expect(wrapper.find('form'))
  expect(wrapper.find('#username'))
  expect(wrapper.find('#password'))
  expect(wrapper.find('button'))
})
