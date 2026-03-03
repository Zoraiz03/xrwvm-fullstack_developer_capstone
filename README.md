# Fullstack Developer Capstone Project

## Project Name: xrwvm-fullstack_developer_capstone

## Overview
This is a full-stack web application built as part of the IBM Full Stack Developer Capstone Project. The application is a car dealership platform called **Best Cars Dealership**, built using Django, React, and Node.js microservices.

## Technologies Used
- **Frontend:** React.js, HTML, CSS
- **Backend:** Django (Python)
- **Database:** SQLite (Django), MongoDB (Node.js microservice)
- **Microservices:** Node.js (Dealer & Reviews service on port 3030), Flask (Sentiment Analyzer on port 5000)
- **Deployment:** IBM Cloud Code Engine
- **CI/CD:** GitHub Actions

## Features
- User Registration and Login
- View all Car Dealerships
- Filter Dealerships by State
- View Dealer Details and Reviews
- Post Reviews for Dealerships
- Sentiment Analysis on Reviews
- Admin Panel for managing data

## Project Structure
```
xrwvm-fullstack_developer_capstone/
├── server/
│   ├── djangoapp/         # Django application
│   ├── djangoproj/        # Django project settings
│   ├── frontend/          # React frontend
│   ├── database/          # Node.js microservice
│   └── manage.py
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
└── README.md
```

## Deployment
The application is deployed on IBM Cloud Code Engine at:
https://dealership.271o63adeqb2.us-south.codeengine.appdomain.cloud

## CI/CD
GitHub Actions is used for continuous integration, running Python (flake8) and JavaScript (jshint) linting on every push.
