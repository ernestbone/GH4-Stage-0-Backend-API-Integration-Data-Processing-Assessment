# Stage 0 Backend API – Gender Classification Service

## 📌 Overview

This project implements a backend API endpoint that classifies a given name by gender using the Genderize API. The response is processed and structured according to specific business rules, including confidence evaluation and error handling.

---

## 🚀 Live API

Base URL:

```
https://gh4-stage-0-backend-api-integration-data-process-production.up.railway.app/
```

Endpoint:

```
GET /api/classify?name=<name>
```

Example:

```
https://gh4-stage-0-backend-api-integration-data-process-production.up.railway.app/api/classify?name=John
```

---

## 📂 GitHub Repository

```
https://github.com/ernestbone/GH4-Stage-0-Backend-API-Integration-Data-Processing-Assessment
```

---

## ⚙️ Features

* External API integration (Genderize)
* Custom response transformation
* Confidence scoring logic
* Input validation
* Edge case handling
* CORS enabled (`Access-Control-Allow-Origin: *`)
* Fast response handling (<500ms excluding external API latency)

---

## 📥 Request

### Method

```
GET
```

### Query Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| name      | string | Yes      | Name to classify |

---

## 📤 Response

### ✅ Success Response

```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-13T12:00:00Z"
  }
}
```

---

### ❌ Error Responses

#### Missing or Empty Name (400)

```json
{
  "status": "error",
  "message": "Name query parameter is required"
}
```

#### Invalid Type (422)

```json
{
  "status": "error",
  "message": "Name must be a string"
}
```

#### No Prediction Available

```json
{
  "status": "error",
  "message": "No prediction available for the provided name"
}
```

#### External API Failure (502)

```json
{
  "status": "error",
  "message": "Failed to fetch data from external API"
}
```

---

## 🧠 Processing Logic

* Extracts:

  * `gender`
  * `probability`
  * `count` → renamed to `sample_size`

* Computes:

```
is_confident = (probability >= 0.7) AND (sample_size >= 100)
```

* Generates:

  * `processed_at` → Current UTC timestamp (ISO 8601 format)

---

## ⚠️ Edge Case Handling

If:

* `gender === null` OR
* `count === 0`

Returns:

```json
{
  "status": "error",
  "message": "No prediction available for the provided name"
}
```

---

## 🛠️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/ernestbone/GH4-Stage-0-Backend-API-Integration-Data-Processing-Assessment.git
cd GH4-Stage-0-Backend-API-Integration-Data-Processing-Assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Server

```bash
node index.js
```

Server runs on:

```
http://localhost:3000
```

---

## 🧪 Testing

### Browser

```
http://localhost:3000/api/classify?name=John
```

### cURL

```bash
curl "http://localhost:3000/api/classify?name=John"
```

### Postman

* Method: GET
* URL: `/api/classify?name=John`

---

## 📁 Project Structure

```
.
├── index.js
├── package.json
└── README.md
```

---

## 🧩 Tech Stack

* Node.js
* Express.js
* Axios
* CORS

---

## ✅ Evaluation Coverage

This implementation satisfies:

* Endpoint availability
* Query parameter handling
* External API integration
* Data extraction accuracy
* Confidence logic
* Error handling
* Edge case handling
* Response format compliance

---

## 📌 Notes

* API is deployed and publicly accessible
* Ensure endpoint remains active during evaluation
* CORS is enabled for external access

---

## 👤 Author

Ernest Owhiroro

---
