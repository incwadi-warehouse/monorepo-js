import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('http://localhost:8080/api/user/1/:key', () => {
    return HttpResponse.json({
      value: JSON.parse(localStorage.getItem('mock_' + req.params.key)),
    })
  }),
  http.get('http://localhost:8080/api/user/1/:key', async (req) => {
    const content = await req.json()
    JSON.stringify(
      localStorage.setItem('mock_' + req.params.key, content.value)
    )

    return HttpResponse.json({
      value: JSON.parse(localStorage.getItem('mock_' + req.params.key)),
    })
  }),
]
