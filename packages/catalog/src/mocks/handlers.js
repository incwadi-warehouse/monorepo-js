import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:8080/api/user/1/snow', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        value: false,
      })
    )
  }),
]
