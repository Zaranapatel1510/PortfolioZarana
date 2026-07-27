Zarana Patel — Portfolio Website

A personal portfolio website showcasing my skills, projects, certifications, and resume. Built with a static HTML/CSS/JS frontend and a lightweight Node.js/Express backend for handling the contact form.

Live Site: zarana.vercel.app

Overview

This portfolio highlights my technical skill set, featured projects, hackathon and internship experience, and certifications, with a working contact form that sends emails directly to me.

Tech Stack

Frontend

HTML5
CSS3
JavaScript

Backend

Node.js
Express.js

Database

MongoDB (via Mongoose)

Other Tools & Libraries

Nodemailer — for contact form email delivery
CORS
dotenv — for environment variable management
Features
Responsive, single-page portfolio layout
Skills section showcasing technologies (HTML, CSS, JavaScript, Python, Java, C, C++, React, Node.js, AWS, Salesforce)
Project showcase (e.g., E-commerce Admin Panel, Mobile Store, Car Parking System, Library Management System)
Certifications and achievements (AWS, Simplilearn, hackathon participation)
Downloadable resume
Contact form with email notifications via Nodemailer
MongoDB integration to store contact form submissions

Project Structure
PortfolioZarana/
├── api/              # Backend API routes/logic
├── models/           # Mongoose schemas/models
├── index.html        # Main portfolio page
├── 2.css             # Stylesheet
├── 3.js              # Frontend JavaScript
├── server.js         # Express server entry point
├── package.json       # Project dependencies
└── ...                # Images, certificates, and resume files
Getting Started

Prerequisites

Node.js installed on your machine

A MongoDB database (local or Atlas)

Installation

Clone the repository

bash

   git clone https://github.com/Zaranapatel1510/PortfolioZarana.git
   cd PortfolioZarana

Install dependencies

bash

   npm install

Create a .env file in the root directory and add your environment variables:

   MONGO_URI=your_mongodb_connection_string
   
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password_or_app_password

Run the server

bash
   npm start

For development with auto-restart:

bash
   npm run dev
Open index.html in your browser, or configure the server to serve it.
Contact

Zarana Patel Feel free to reach out through the contact form on the live site, or connect via GitHub.
