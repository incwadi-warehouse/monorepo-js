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

  rest.get('http://search.localhost/indexes/books/search', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        hits: [
          {
            id: 'af5d0ebf-dd0d-11ed-928e-0242ac150002',
            title: 'Demo Book 1',
            authorFirstname: 'John',
            authorSurname: 'Doe',
            genre: 'Crime',
            price: 1,
            currency: 'EUR',
          },
          {
            id: 'af5da98b-dd0d-11ed-928e-0242ac150002',
            title: 'Demo Book 2',
            authorFirstname: 'John',
            authorSurname: 'Doe',
            genre: 'Crime',
            price: 2,
            currency: 'EUR',
          },
        ],
        query: '',
        processingTimeMs: 0,
        limit: 2,
        offset: 0,
        estimatedTotalHits: 49,
        facetDistribution: { genre: { Crime: 49 } },
        facetStats: {},
      })
    )
  }),
]
