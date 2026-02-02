# Property Sale Platform

A full-stack property sale platform with features such as property listings, authentication, role-based access control, and an admin dashboard for managing properties and users.

---

## 🚀 Tech Stack

### Backend
- **Express.js** — Web framework for building RESTful APIs
- **PostgreSQL** — Relational database managed using Prisma ORM
- **Authentication** — JSON Web Token (JWT) and Google OAuth 2.0
- **Email Service** — Handled via Nodemailer

### Frontend
- **React.js** — SPA architecture built with Vite
- **React Router** — Client-side routing
- **Redux Toolkit & RTK Query** — State and API management
- **shadcn/ui** — Modern UI components built on top of Tailwind CSS

---

## 🧰 Getting Started (Development)

### Prerequisites
- Docker

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/novadityap/property-platform.git
   cd property-platform
   ```

2. **Prepare environment variables:**

   Make sure `.env` files exist in both:

   ```
   ./server/.env.development
   ./client/.env.development
   ```

   (You can create them manually or copy from `.env.example` if available.)

4. **Start the application:**

   ```bash
   docker compose -f docker-compose.development.yml up -d --build
   ```

4. **Access URLs:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000/api](http://localhost:8000/api)

---

## 🔐 Default Admin Account

To access the admin dashboard, use the following credentials:

- **Email:** `admin@email.com`
- **Password:** `admin123`

---

## 🧪 Running Tests (Optional)

```bash
docker compose -f docker-compose.development.yml exec server npm run test
```

---

## 🧼 Maintenance

- **View container logs:**

  ```bash
  docker compose -f docker-compose.development.yml logs -f
  ```

- **Stop and remove containers, networks, and volumes:**

  ```bash
  docker compose -f docker-compose.development.yml down -v
  ```

---
