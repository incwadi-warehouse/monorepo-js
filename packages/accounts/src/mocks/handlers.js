import { rest } from 'msw'

const optionResponse = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      value: JSON.parse(localStorage.getItem('mock_' + req.params.key)),
    })
  )
}

export const handlers = [
  rest.get('http://localhost:8080/api/user/1/:key', optionResponse),
]
