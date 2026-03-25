const mongoose = require('mongoose');
const Project = require('../models/Project');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB connection
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(process.env.MONGO_URI);
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await connectDB();
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
