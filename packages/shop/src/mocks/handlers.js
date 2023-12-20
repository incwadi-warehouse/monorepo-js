import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:8080/api/user/1/:key', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        value: JSON.parse(localStorage.getItem('mock_' + req.params.key)),
      })
    )
  }),
  rest.post('http://localhost:8080/api/user/1/:key', async (req, res, ctx) => {
    const content = await req.json()
    JSON.stringify(
      localStorage.setItem('mock_' + req.params.key, content.value)
    )

    return res(
      ctx.status(200),
      ctx.json({
        value: JSON.parse(localStorage.getItem('mock_' + req.params.key)),
      })
    )
  }),
]
