# Kindity

Kindity is a donation platform that allows users to donate to various projects.

## Description

Kindity is a full-stack web application designed to showcase CRUD operations, responsive design, dynamic detail pages, filtering, sorting, and user authentication (login \& registration). The platform ensures a seamless user experience while managing donations efficiently.  

## Run locally (PowerShell)

Start MongoDB and set `DB_URL` in `back/.env` to a reachable database. The backend listens only after it connects to MongoDB. Create the environment files from the examples if they do not already exist, then set a private `JWT_SECRET` in `back/.env`.

In one terminal:

```powershell
cd back
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm.cmd ci
npm.cmd run dev
```

In another terminal:

```powershell
cd front
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:5173`. The site can start without Stripe credentials. To use payments, replace the example values with your Stripe test secret key and webhook secret in `back/.env`, and the matching publishable key in `front/.env`. Keep secret keys out of the frontend and out of Git.

## Screenshots from the project
![image_1](./docs/image_1.png)
![image_2](./docs/image_2.png)
![image_3](./docs/image_3.png)
