<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="LinkDrop Logo">
</p>

# LinkDrop

**LinkDrop** is a file and text sharing app built with **Laravel**, **React**, and **Inertia.js**.  
The app is fully containerized with Docker and uses Nginx, Redis, MySQL, and Laravel's queue and scheduler.

---

## ✨ Features

- Upload & share text or media via unique links
- Optional account registration
- React + Inertia.js frontend with Laravel backend
- Nginx as reverse proxy and static file server
- Dockerized for easy setup and consistency

---

## ⚙️ Tech Stack

- **Frontend**: React, Inertia.js, Vite, Tailwind CSS
- **Backend**: Laravel 12 (PHP 8.4)

---

## 🐳 Dockerized Architecture

This app runs with **6 containers**:

| Container   | Purpose                                 |
|-------------|-----------------------------------------|
| `app`       | Laravel application (PHP-FPM)           |
| `web`       | Serves the app via Nginx (port 8080)    |
| `db`        | MySQL database                          |
| `redis`     | Redis for queues + caching              |
| `queue`     | Laravel queue worker                    |
| `scheduler` | Laravel task scheduler                  |

All services are orchestrated via `docker-compose`.

---

## 🚀 Getting Started (Docker)

Clone the repo and run:

```bash
git clone https://github.com/yourusername/linkdrop.git
cd linkdrop
docker compose up -d --build
```




## Note

It's a personal project built for fun and to gain hands-on experience Dockerizing a full-stack app.
