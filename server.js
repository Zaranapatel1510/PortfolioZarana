const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Contact = require('./models/Contact');
const nodemailer = require('nodemailer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Nodemailer Transport Configuration
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './'))); // Serve all static files in the root folder

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '1.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
    .then(() => {
        console.log('✅ Connected to MongoDB');
        seedProjects(); // Seed initial data if empty
    })
    .catch((err) => console.error('❌ Could not connect to MongoDB:', err));

// Routes
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/connect', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // 1. Save to MongoDB
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        // 2. Send Email Notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h3>You have a new contact request from your portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('❌ Email could not be sent:', error);
            } else {
                console.log('📧 Email sent successfully:', info.response);
            }
        });

        res.status(201).json({ success: true, message: 'Data saved successfully and notification sent!' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Seed data
async function seedProjects() {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
        const initialProjects = [
            {
                title: "CAR PARKING SYSTEM",
                description: "Smart solution with real-time slot tracking and automated billing.",
                image: "car_parking.png",
                link: "https://github.com/Zaranapatel1510/CAR-MANAGMENT-SYSTEM"
            },
            {
                title: "MOBILE WEBSITE",
                description: "High-performance responsive design for modern e-commerce.",
                image: "mobile_store.png",
                link: "https://github.com/Zaranapatel1510"
            },
            {
                title: "LIBRARY MANAGEMENT",
                description: "Digital cataloging and automated book issuing system.",
                image: "library.png",
                link: "https://github.com/Zaranapatel1510/Library-Managment-System-"
            },
            {
                title: "PORTFOLIO WEBSITE",
                description: "Interactive personal brand showcase with smooth UI/UX.",
                image: "portfolio_mockup.png",
                link: "#"
            },
            {
                title: "E-COMMERCE PLATFORM",
                description: "Full-featured online store with secure checkout and inventory management.",
                image: "ecommerce_admin.png",
                link: "#"
            }
        ];
        await Project.insertMany(initialProjects);
        console.log('🌱 Initial projects seeded successfully!');
    }
}

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
