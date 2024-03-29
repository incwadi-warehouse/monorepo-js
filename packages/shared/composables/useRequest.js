import axios from 'axios'
import { computed, ref } from 'vue'

const globalConfig = ref({
  baseURL: 'http://localhost',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function useRequest() {
  const localConfig = ref({
    headers: {},
  })

  const setAuthHeader = (token) => {
    localConfig.value.headers['Authorization'] = 'Bearer ' + token
  }

  const config = computed(() => {
    return { ...globalConfig.value, ...localConfig.value }
  })

  const request = async (method, url, data, params, wrap = false) => {
    const res = await axios.create(config.value).request({
      method,
      url,
      data,
      params,
    })

    if (!wrap) return res.data

    return res
  }

  return { globalConfig, localConfig, config, setAuthHeader, request }
}
