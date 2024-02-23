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
  rest.get(
    'http://localhost:8000/api/public/book/find',
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          books: [
            {
              id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
              currency: 'EUR',
              title: 'Title 1',
              shortDescription: 'desciption',
              authorFirstname: 'Jane',
              authorSurname: 'Doe',
              genre: 'crime',
              price: 1.5,
              releaseYear: 2007,
              branchName: '',
              branchOrdering: '',
              cond: null,
              format_name: 'Paperback',
              subtitle: 'subtitle',
            },
            {
              id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
              currency: 'EUR',
              title: 'Title 2',
              shortDescription: 'desciption',
              authorFirstname: 'Jane',
              authorSurname: 'Doe',
              genre: 'crime',
              price: 1.5,
              releaseYear: 2007,
              branchName: '',
              branchOrdering: '',
              cond: null,
              format_name: 'Paperback',
              subtitle: 'subtitle',
            },
          ],
        })
      )
    }
  ),
  rest.get(
    'http://localhost:8000/api/public/book/:id',
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title',
          shortDescription: 'desciption',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        })
      )
    }
  ),
]
