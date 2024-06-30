import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('http://localhost:8080/api/user/1/:key', (req) => {
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
  http.post('http://localhost:8000/api/login_check', (req) => {
    return HttpResponse.json({token:'token', refresh_token:'refresh_token'})
  }),
]
