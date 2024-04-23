import { http, HttpResponse } from 'msw'

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
  http.get('http://search.localhost/indexes/:index/search', () => {
    return HttpResponse.json({
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
      facetDistribution: { genre: { Crime: 2 } },
      facetStats: {},
    })
  }),
  http.get('http://search.localhost/indexes/:index/rebuild', () => {
    return HttpResponse.json({
      enqueuedAt: '2023-06-22T19:00:01.069760993Z',
      indexUid: 'products_1',
      status: 'enqueued',
      taskUid: 1,
      type: 'documentAdditionOrUpdate',
    })
  }),
]
