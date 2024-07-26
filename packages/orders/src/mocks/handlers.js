import { http, HttpResponse } from 'msw'

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
  http.get('http://localhost:8000/api/reservation/list', (req) => {
    return HttpResponse.json([
      {
        "id": "ed8440cc-2d8a-11ef-b142-0242ac120003",
        "createdAt": 1718726018,
      }
    ])
  }),
  http.get('http://localhost:8000/api/reservation/ed8340cc-2d8a-11ef-b142-0242ac120003', (req) => {
    return HttpResponse.json({
      "id": "ed8440cc-2d8a-11ef-b142-0242ac120003",
      "createdAt": 1718726018,
      "notes": null,
      "books": [
        {
          "id": "1ca572bf-eb59-11ee-a9bb-02d2ac140010",
          "added": 1711411200,
          "title": "Book",
          "author": {
            "firstname": "Jane",
            "surname": "Doe"
          },
          "genre": {
            "name": "Thriller",
          },
          "price": 2.5,
          "subtitle": null,
        },
      ],
      "salutation": "f",
      "firstname": "Jane",
      "surname": "Doe",
    })
  }),
]
