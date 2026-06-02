# CareerPilot

**Built by Merra Migora**

CareerPilot is a full-stack job application tracking project. I started this idea because applying to jobs can get messy really fast, especially when everything is spread across emails, spreadsheets, notes, and calendar reminders. The goal of this project is to keep applications, interview progress, and job-search notes in one organized dashboard.

This project is also meant to show the kind of skills I have been building as a Computer Science student: React, Java, Spring Boot, REST APIs, database design, and clean project organization.

---

## What the app does

CareerPilot lets a user:

- Add a job application
- Track the company, role, location, date applied, and notes
- Update the application status
- Delete an application
- View dashboard statistics
- See charts for application progress

The frontend currently runs with sample data so the dashboard is easy to demo. The backend is included as a Spring Boot REST API and is ready to connect to the frontend as the next development step.

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Chart.js

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST API
- H2 database for local testing
- PostgreSQL-ready structure

### Tools
- Git
- GitHub
- Maven
- npm

---

## Project Structure

```txt
CareerPilot/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── src/main/java/com/merra/careerpilot/
│   ├── src/main/resources/application.properties
│   └── pom.xml
│
├── database/
│   └── schema.sql
│
└── README.md
```

---

## Frontend Features

- Clean dashboard UI
- Add application form
- Status dropdowns
- Delete button
- Application cards
- Status summary cards
- Doughnut chart
- Bar chart
- Responsive layout

---

## Backend API

The Spring Boot backend includes these endpoints:

```txt
GET    /api/applications
POST   /api/applications
PUT    /api/applications/{id}
DELETE /api/applications/{id}
```

The main model is `JobApplication`, which stores company, role, location, status, date applied, and notes.

---

## How to Run the Frontend

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Then open the local Vite link in the browser.

---

## How to Run the Backend

From the project root:

```bash
cd backend
./mvnw spring-boot:run
```

If Maven wrapper is not available, use:

```bash
mvn spring-boot:run
```

The backend runs locally on:

```txt
http://localhost:8080
```

---

## Why I Built This

I wanted this project to feel useful, not just like a class assignment. A lot of students track applications manually, and it becomes hard to remember where they applied, what resume they used, and what the next step is. CareerPilot is my way of turning that real problem into a full-stack software project.

---

## Future Improvements

- Connect frontend forms directly to the backend API
- Add user login and authentication
- Add PostgreSQL for production
- Add resume upload support
- Add interview reminder dates
- Add filtering and search
- Deploy frontend and backend online

---

## Resume Bullet

Built CareerPilot, a full-stack job application tracking platform using React, Java Spring Boot, and database-backed REST APIs to manage applications, statuses, notes, and job-search analytics.
