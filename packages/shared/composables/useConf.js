import { useRequest } from './useRequest.js'

export function useConf(token, baseUrl, schema, database) {
  const { localConfig, request, setAuthHeader } = useRequest()
  localConfig.value.baseURL = baseUrl
  setAuthHeader(token)

  const getConf = async (key) => {
    const res = await request(
      'get',
      '/' + schema + '/' + database + '/' + key,
      null,
      null,
      true
    )

    return res.data.value
  }

  const setConf = async (key, val) => {
    const res = await request(
      'post',
      '/' + schema + '/' + database + '/' + key,
      { value: val },
      null,
      true
    )

    return res.data.value
  }

  return { getConf, setConf }
}
