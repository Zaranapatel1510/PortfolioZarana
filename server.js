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
const PORT = process.env.PORT || 3000;

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
const uri = process.env.MONGO_URI;

if (!uri) {
    console.log('⚠️ MONGO_URI missing, target: local compass');
} else {
    // Show partial URI for debug (hide password)
    const debugUri = uri.replace(/:([^@]+)@/, ":****@");
    console.log('🔍 MongoDB URI detected:', debugUri);
}

mongoose.connect(uri || 'mongodb://127.0.0.1:27017/portfolio', {
    serverSelectionTimeoutMS: 5000 
})
    .then(() => {
        const dbName = mongoose.connection.name;
        console.log(`✅ ✅ ✅ MONGO CONNECTED SUCCESS!`);
        console.log(`📂 Database: ${dbName}`);
        console.log(`🌐 Host: ${mongoose.connection.host}`);
        seedProjects();
    })
    .catch((err) => {
        console.error('❌ MONGODB CONNECTION ERROR:');
        console.error('Type:', err.name);
        console.error('Message:', err.message);
        
        if (err.message.includes('Authentication failed')) {
            console.log('💡 TIP: WRONG PASSWORD or USERNAME! Check Atlas Database Access.');
        } else if (err.message.includes('IP')) {
            console.log('💡 TIP: IP NOT WHITELISTED in Atlas Network Access.');
        }
    });

// Monitor connection events
mongoose.connection.on('error', err => {
    console.error('❌ Mongoose event error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ Mongoose disconnected');
});


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
        
        // 0. Check if DB is actually connected
        if (mongoose.connection.readyState !== 1) {
            console.error('❌ Database not connected. ReadyState:', mongoose.connection.readyState);
            return res.status(503).json({ 
                success: false, 
                message: 'Database connection is still pending or failed. Please check if your IP is whitelisted in MongoDB Atlas.' 
            });
        }

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
        console.error('❌ API Connect Error:', err);
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

// For local testing
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

// For Vercel production
module.exports = app;
