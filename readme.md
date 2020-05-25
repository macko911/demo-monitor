# 💂‍♀️ Digitoo monitoring service

This app lets you monitor selected URLs by periodically sending requests to them and storing responses that can be viewed in the browser using our frontend app.

## Getting started

First we need to install Node dependencies using our favourite packages manager, f.e.

```bash
yarn
# or
npm install
```

## Development

We have separate development servers for backend (using `nodemon` and `ts-node`) and frontend (using `Next.js`).

To start both servers simultaneously, run
```bash
yarn dev
# or
npm run dev
```

Frontend is served at http://localhost:3000  
Backend is served at http://localhost:8080

We use `concurrently` package to run multiple npm scripts at the same time, ensuring cross-platform compatibility.

## Usage

In order to test the app, we first need to get an accessToken via the `/login` endpoint.

#### Test users
| email  | password  |
|---|---|
| info@applifting.cz  | applifting  |
| batman@example.com  | batman  |

## API Reference

List of available endpoints:

[Login](#authentication)  
[Get monitor](#get-monitor)  
[Create monitor](#create-monitor)  
[Edit monitor](#edit-monitor)  
[Delete monitor](#delete-monitor)  
[List results](#list-results)  
[Clear results](#clear-results)  

### Authentication
#### `POST /login`  
Log in with username/password and receive access token.
| Header  |  Value |
|---|---|
| Authorization  |  `Basic Base64<username:password>` |

| Response  |  Value |
|---|---|
| 200  |  `accessToken: string` |
| 401  |  Wrong credentials |

<hr>

### Monitor CRUD operations
All monitor endpoints require authentication with access token and share the following responses

| Header  |  Value |
|---|---|
| Authorization  |  `Bearer <accessToken>` |

| Response  |  Value |
|---|---|
| 400  |  Wrong request params |
| 401  |  Wrong credentials |
| 404  |  Monitor settings not found |

### Get monitor
#### `GET /monitor?id=${monitorId}`  
| Response  |  Value |
|---|---|
| 200  |  MonitoredEndpoint |

### Create monitor
#### `POST /monitor`

Request body:
```json
{
	"name": "test",
	"url": "https://httpbin.org/status/200",
	"monitoredIntervalSeconds": 60
}
```

| Response  |  Value |
|---|---|
| 200  |  Monitor ID |


### Edit monitor
#### `PUT /monitor?id=${monitorId}`
Request body:
```json
{
	"name": "test",
	"url": "https://httpbin.org/status/200",
	"monitoredIntervalSeconds": 60
}
```
| Response  |  Value |
|---|---|
| 204  |  - |

### Delete monitor
#### `DELETE /monitor?id=${monitorId}`
| Response  |  Value |
|---|---|
| 204  |  - |

<hr>

### Monitoring Results
All results endpoints require authentication with access token

| Header  |  Value |
|---|---|
| Authorization  |  `Bearer <accessToken>` |

### List results
#### `GET /results?monitorId=${monitorId}`
| Response  |  Value |
|---|---|
| 200  |  `Array<MonitoringResult>` |

### Clear results
#### `DELETE /results`
Clears all results for all users. Technically this should be only accessible by some Admin user but more granular permissions are out of scope of this demo.

| Response  |  Value |
|---|---|
| 204  |  - |

## Tests

```bash
yarn test
# or
npm test
```
