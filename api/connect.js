const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(process.env.MONGO_URI);
}

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await connectDB();
        const { name, email, subject, message } = req.body;

        // 1. Save to MongoDB
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        // 2. Email Configuration
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `Form Submission: ${subject}`,
            html: `<h3>New Portfolio Message</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        };

        // 3. Send and respond
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Saved and Email Sent!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
