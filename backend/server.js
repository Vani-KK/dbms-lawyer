// server.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const pool = require('./db');
const clientRoutes = require('./routes/clients');
const lawyerRoutes = require('./routes/lawyer');
const commonRoutes = require('./routes/common');
const cors = require('cors');
const createTables = require('./createTables');

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database tables
(async () => {
    try {
        await pool.getConnection();
        console.log('Connected to the database successfully');
        await createTables();
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
})();

// Routes
app.use('/api', commonRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/lawyer', lawyerRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
