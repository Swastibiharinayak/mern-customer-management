# MERN Customer Management

A customer management app built with React and Vite, an Express API on Node.js, and MongoDB Atlas through Mongoose. It supports creating, listing, updating, and deleting customers.

## Features

- View customer records with name, phone number, balance, and optional image URL.
- Add customers and edit existing records.
- Delete records after a confirmation prompt.
- Responsive customer cards and a light/dark theme control.
- Store data in MongoDB through a REST API.

## Tech stack

- **Frontend:** React, Vite, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express, Mongoose, CORS
- **Database:** MongoDB Atlas

## Project structure

```text
.
├── backend/
│   ├── config/db.js                 # MongoDB connection
│   ├── controllers/customers.controller.js
│   ├── models/customer.model.js     # Customer schema
│   ├── routes/customer.route.js     # Customer API routes
│   └── server.js                    # Express server
├── frontend/
│   ├── src/
│   │   ├── components/Navbar.jsx
│   │   ├── lib/api.js               # Axios API client
│   │   └── pages/                   # Customer list and form
│   └── package.json
├── package.json                     # Backend dependencies and dev script
└── README.md
```

## Requirements

- Node.js and npm
- A MongoDB Atlas cluster and its connection string

## Run locally

1. Clone the repository and open a terminal in its root directory.
2. Install backend dependencies and create a root `.env` file:

   ```powershell
   npm install
   Copy-Item .env.example .env
   ```

   Set `MONGO_URI` in `.env` to your MongoDB Atlas connection string. Keep this value private and do not commit `.env`.

3. Start the API from the repository root:

   ```powershell
   npm run dev
   ```

   The server listens on port `5000` by default, or on the `PORT` environment variable if one is set.

4. In a second terminal, install and start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

   Vite prints the local frontend URL in the terminal. During local development the frontend uses `http://localhost:5000/api/customers` by default.

## Environment variables

### Backend (`.env` in the repository root)

```env
MONGO_URI=mongodb+srv://<db_user>:<db_password>@<cluster-host>/<database>?retryWrites=true&w=majority
PORT=5000
```

`MONGO_URI` is required. `PORT` is optional; Render supplies it automatically in production.

### Frontend (`frontend/.env.local` for local overrides)

```env
VITE_API_URL=http://localhost:5000/api/customers
```

The frontend defaults to this local API URL when `VITE_API_URL` is not set. For a deployed frontend, set it to the full customer API base URL, for example `https://<your-render-service>.onrender.com/api/customers`. Vite variables are included in browser assets, so never put database credentials or other secrets in frontend variables.

## API

All routes are under `/api/customers`. Requests and responses use JSON. Successful responses use a `data` field for customer records, except delete, which returns a message.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/customers` | List all customers |
| `POST` | `/api/customers` | Create a customer; `name` and `phone` are required. `balance` and `image` are optional. |
| `PUT` | `/api/customers/:id` | Update a customer by MongoDB ID |
| `DELETE` | `/api/customers/:id` | Delete a customer by MongoDB ID |

Example create body:

```json
{
  "name": "Asha Kumar",
  "phone": 9876543210,
  "balance": 250,
  "image": "https://example.com/customer.jpg"
}
```

The Mongoose customer model also records `createdAt` and `updatedAt` timestamps.

## Deployment

Deploy the API and frontend as separate services connected to the same GitHub repository. Create the backend service first so you can use its URL in the frontend settings.

### Render: backend web service

Create a **Web Service** from this repository and use these settings:

- **Root Directory:** leave blank (repository root; the backend dependencies are declared in the root `package.json`)
- **Build Command:** `npm install`
- **Start Command:** `node backend/server.js`
- **Environment:** add `MONGO_URI` with your Atlas connection string. Render supplies `PORT`.

Ensure the Atlas network access rules allow connections from Render. Use the service's `onrender.com` URL as the API host; the customer endpoint is `<render-url>/api/customers`.

### Vercel: frontend

Import the same repository as a Vercel project and set:

- **Root Directory:** `frontend`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variable:** `VITE_API_URL=https://<your-render-service>.onrender.com/api/customers`

After setting or changing `VITE_API_URL`, redeploy the Vercel project so the value is included in the frontend build. Replace the example host with the actual Render service URL. Then open the Vercel site and verify listing, create, edit, and delete against the live API.

## Notes

- The backend currently enables CORS for incoming origins. Restricting CORS to the deployed frontend domain can be a follow-up production hardening step.
