# CMS Admin Panel (React)

Admin dashboard for managing content in the Expo Stand Services CMS.

This panel is used to:
- Login as admin
- Create, edit and delete posts
- Create and manage pages
- Upload and manage media
- Publish / Unpublish content

---

## Tech Stack
- React 18
- React Router
- Context API
- WYSIWYG Editor (Quill)
- JWT Authentication

---

## Requirements
- Node.js latest
- Backend server running

---

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment File
Create a `.env` file from `.env.example`:

```env
VITE_API_BASE=http://localhost:4000/api/v1
```

---

## Run Admin Panel

```bash
npm run dev
```

Admin panel will run at:
```
http://localhost:5173


---

## Login Credentials

```
Email: admin@example.com
Password: Admin@123
```

---

## Notes
- This admin app connects to the Node.js CMS server.
- All protected routes require a valid JWT token.
- Media uploads and content changes are reflected on the public website.
