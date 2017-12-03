# Berlin Meetup API

This is an API that was build to power the demo applications that are being build for the Berlin JavaScript Framework Special Meetup organized by:

- Berlin.js
- Angular Berlin
- Ember Berlin
- Ionic Berlin

The API is a simple API that is supposed to power all the aspects required in the tasks for the demo application. You can find the documentation of the different endpoints in the [API Reference](#api-reference).

## Setup

The simplest way to deploy this API yourself is by remixing it on Glitch by clicking the button below:

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/berlinjs/framework-special-2018-backend?SECRET=changethissecret&DELAY=false)

Alternatively you can deploy it yourself if you have [Node.js](https://nodejs.org), [`npm`](https://npmjs.com) installed and `git` installed:

```bash
git clone https://github.com/berlinjs/framework-special-2018-backend.git
cd framework-special-2018-backend
npm install
npm start
```

The server will be running by default on port 3000. Check if your server is running by going to [`http://localhost:3000`](http://localhost:3000).

## API Reference

### Authentication

Some endpoints require authentication. For this perform a login or register request as described below. You can pass the token that is being sent by these requests to any subsequent requests either as a `token` cookie or in the `Authorization` header the following way:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb20ifQ.9B1JWiXW-JXHdqnvAtN1byMEi0U7qSLhFf4fkgCH1HI
```

⚠️ Any of the endpoints that require authorization are marked with a 🔐 

### `POST /user/register`

Registers a new user with the system. Authentication is required for any `POST`/`PUT`/`PATCH` operations with the `/meetup` resource. 

The register request will issue you a [JSON Web Token (JWT)](https://jwt.io) that you can pass to the requests as described in [Authentication](#authentication).

**Supported Query Parameters**: None

**Supported Body Parameters**: 

All body parameters need to be either `application/json` encoded or `x-www-form-urlencoded`. Supported are:

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `username` | `string` | Username of the user to register | ✅ |
| `password` | `string` | Password for the new user | ✅ |

**Example Request**
```js
const user = {
  username: 'dom',
  password: 'super.secret.secret.password'
}
fetch(
  'http://berlin-meetup.glitch.me/user/register',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }
)
  .then(resp => resp.json())
  .then(data => console.log(data));
```

**Example Response Payload**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb20ifQ.yvDQVzQuXuDTQcg48OeX1SEEuOP3p_brzpwlnOGdFos"
}
```

### `POST /user/login`

Authenticates a user with the system by checking the password against the database. Authentication is required for any `POST`/`PUT`/`PATCH` operations with the `/meetup` resource. 

The register request will issue you a [JSON Web Token (JWT)](https://jwt.io) that you can pass to the requests as described in [Authentication](#authentication).

**Supported Query Parameters**: None

**Supported Body Parameters**: 

All body parameters need to be either `application/json` encoded or `x-www-form-urlencoded`. Supported are:

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `username` | `string` | Username of the user to authenticate | ✅ |
| `password` | `string` | Password for the user | ✅ |

**Example Request**
```js
const user = {
  username: 'dom',
  password: 'super.secret.secret.password'
}
fetch(
  'http://berlin-meetup.glitch.me/user/login',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }
)
  .then(resp => resp.json())
  .then(data => console.log(data));
```

**Example Response Payload**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb20ifQ.yvDQVzQuXuDTQcg48OeX1SEEuOP3p_brzpwlnOGdFos"
}
```


### `GET /meetup`

Gets the list of all available meetups.

**Supported Query Parameters**: None

**Supported Body Parameters**: None

**Example Request**
```js
fetch('http://berlin-meetup.glitch.me/meetup')
  .then(resp => resp.json())
  .then(data => console.log(data));
```

**Example Response Payload**
```json
{
  "data": [
    {
      "name": "Berlin.js",
      "location": "co.up",
      "coordinates": {
        "latitude": "52.500330",
        "longitude": "13.419786"
      },
      "description": "This is some description",
      "time": "19:00",
      "day": "Every 3rd Thursday",
      "nextMeetup": "2017-11-13T21:41:21.952Z",
      "twitter": "berlinjs",
      "id": "9ea4cdb8-e18b-44c2-9b58-252395d7d5cd",
      "url": "https://www.meetup.com/Berlin-JS/"
    }
  ]
}
```

### `GET /meetup/:id`

Gets an instance of a meetup.

**Supported Query Parameters**: None

**Supported Body Parameters**: None

**Example Request**
```js
fetch(
  'http://berlin-meetup.glitch.me/meetup/9ea4cdb8-e18b-44c2-9b58-252395d7d5cd'
)
  .then(resp => resp.json())
  .then(data => console.log(data));
```

**Example Response Payload**
```json
{
  "data": {
    "name": "Berlin.js",
    "location": "co.up",
    "coordinates": {
      "latitude": "52.500330",
      "longitude": "13.419786"
    },
    "description": "This is some description",
    "time": "19:00",
    "day": "Every 3rd Thursday",
    "nextMeetup": "2017-11-13T21:41:21.952Z",
    "twitter": "berlinjs",
    "id": "9ea4cdb8-e18b-44c2-9b58-252395d7d5cd",
    "url": "https://www.meetup.com/Berlin-JS/"
  }
}
```

### `POST /meetup` 🔐 

Creates a new meetup instance

**Supported Query Parameters**: None

**Supported Body Parameters**: 

All body parameters need to be either `application/json` encoded or `x-www-form-urlencoded`. Supported are:

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `name` | `string` | Name of the meetup | ✅ |
| `location` | `string` | Location of the meetup. Should correspond to the Google Maps name | ✅ |
| `description` | `string` | A short description of the meetup | ✅ |
| `day` | `string` | Describes the rythm of how often the meetup takes place | ✅ |
| `time` | `string` | Time of the meetup in `24:00`  | ✅ |
| `coordinates` | `{ longitude: 'string', latitude: 'string' }` | Exact coordinates of the meetup place | ❌ |
| `nextMeetup` | `string` | Timestamp for the next edition of the meetup. Should be parsable by `new Date()` | ❌ |
| `twitter` | `string` | Username of the Twitter account of the meetup | ❌ |
| `url` | `string` | The URL of a meetup | ❌ |

**Example Request**
```js
const newEntry = {
  name: 'Magical new JS meetup 🦄',
  location: 'co.up',
  description: 'This is an awesome new meetup',
  day: 'Every day',
  time: '19:00',
  twitter: 'onesiejs',
  url: 'https://onesiejs.com'
}
fetch(
  'http://berlin-meetup.glitch.me/meetup',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb20ifQ.9B1JWiXW-JXHdqnvAtN1byMEi0U7qSLhFf4fkgCH1HI'
    },
    body: JSON.stringify(newEntry)
  }
)
  .then(resp => resp.json())
  .then(data => console.log(data));
```

**Example Response Payload**
```json
{
  "data": {
    "name": "Magical new JS meetup 🦄",
    "location": "co.up",
    "description": "This is an awesome new meetup",
    "day": "Every day",
    "time": "19:00",
    "twitter": "onesiejs",
    "id": "a532834c-c780-4ea1-95a1-294484ba3fcf",
    "url": "https://onesiejs.com/"
  }
}
```

### `PUT /meetup/:id` 🔐 

Replaces the existing meetup with the respective `id` with the data supplied in the request body. If the new data contains less properties than the old one, it will drop the other ones.

**Supported Query Parameters**: None

**Supported Body Parameters**: 

All body parameters need to be either `application/json` encoded or `x-www-form-urlencoded`. Supported are:

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `name` | `string` | Name of the meetup | ✅ |
| `location` | `string` | Location of the meetup. Should correspond to the Google Maps name | ✅ |
| `description` | `string` | A short description of the meetup | ✅ |
| `day` | `string` | Describes the rythm of how often the meetup takes place | ✅ |
| `time` | `string` | Time of the meetup in `24:00`  | ✅ |
| `coordinates` | `{ longitude: 'string', latitude: 'string' }` | Exact coordinates of the meetup place | ❌ |
| `nextMeetup` | `string` | Timestamp for the next edition of the meetup. Should be parsable by `new Date()` | ❌ |
| `twitter` | `string` | Username of the Twitter account of the meetup | ❌ |
| `url` | `string` | The URL of a meetup | ❌ |

**Example Request**
```js
const newEntry = {
  name: 'Fluffy 🐼 JS developers',
  location: 'co.up',
  description: 'This is an awesome new meetup',
  day: 'Every Friday',
  time: '19:00',
  url: 'https://onesie.life'
}
fetch(
  'http://berlin-meetup.glitch.me/meetup/a532834c-c780-4ea1-95a1-294484ba3fcf',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb20ifQ.9B1JWiXW-JXHdqnvAtN1byMEi0U7qSLhFf4fkgCH1HI'
    },
    body: JSON.stringify(newEntry)
  }
)
  .then(resp => resp.json())
  .then(data => console.log(data));
```

**Example Response Payload**
```json
{
  "data": {
    "name": "Fluffy 🐼 JS developers",
    "location": "co.up",
    "description": "This is an awesome new meetup",
    "day": "Every Friday",
    "time": "19:00",
    "id": "a532834c-c780-4ea1-95a1-294484ba3fcf",
    "url": "https://onesie.life"
  }
}
```

### `PUT /meetup/:id` 🔐 

This updates the fields passed in the request body in the meetup with the respective `id`.

**Supported Query Parameters**: None

**Supported Body Parameters**: 

All body parameters need to be either `application/json` encoded or `x-www-form-urlencoded`. Supported are:

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `name` | `string` | Name of the meetup | ❌ |
| `location` | `string` | Location of the meetup. Should correspond to the Google Maps name | ❌ |
| `description` | `string` | A short description of the meetup | ❌ |
| `day` | `string` | Describes the rythm of how often the meetup takes place | ❌ |
| `time` | `string` | Time of the meetup in `24:00`  | ❌ |
| `coordinates` | `{ longitude: 'string', latitude: 'string' }` | Exact coordinates of the meetup place | ❌ |
| `nextMeetup` | `string` | Timestamp for the next edition of the meetup. Should be parsable by `new Date()` | ❌ |
| `twitter` | `string` | Username of the Twitter account of the meetup | ❌ |
| `url` | `string` | The URL of a meetup | ❌ |

**Example Request**
```js
const newEntry = {
  name: 'JS 💖 developers',
}
fetch(
  'http://berlin-meetup.glitch.me/meetup/a532834c-c780-4ea1-95a1-294484ba3fcf',
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb20ifQ.9B1JWiXW-JXHdqnvAtN1byMEi0U7qSLhFf4fkgCH1HI'
    },
    body: JSON.stringify(newEntry)
  }
)
  .then(resp => resp.json())
  .then(data => console.log(data));
```

**Example Response Payload**
```json
{
  "data": {
    "name": "JS 💖 developers",
    "location": "co.up",
    "description": "This is an awesome new meetup",
    "day": "Every Friday",
    "time": "19:00",
    "id": "a532834c-c780-4ea1-95a1-294484ba3fcf",
    "url": "https://onesie.life"
  }
}
```

## Code of Conduct

Please be aware that by contributing to this repository or by using the API you are accepting the [Berlin Code of Conduct](http://berlincodeofconduct.org/). If you see any violations please contact [Dominik Kundel](mailto:dominik.kundel@gmail.com).


## License

Apache-2.0

## Collaborators

- [Dominik Kundel](https://github.com/dkundel)