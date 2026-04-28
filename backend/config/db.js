const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

// Create a simple file-based database approach for development
const DB_FILE = path.join(__dirname, '../database.json');

// Initialize database file if it doesn't exist
const initDatabase = () => {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      contacts: [],
      projects: [],
      users: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('Database file created');
  }
};

// Simple database operations
const dbOperations = {
  read: () => {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      return { contacts: [], projects: [], users: [] };
    }
  },
  
  write: (data) => {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing database:', error);
      return false;
    }
  }
};

const connectDB = async () => {
  try {
    initDatabase();
    console.log('File-based database initialized successfully');
    console.log('Database file:', DB_FILE);
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

// Mock sequelize for compatibility with existing models
const mockSequelize = {
  authenticate: () => Promise.resolve(),
  sync: () => Promise.resolve(),
  close: () => Promise.resolve(),
  models: {}
};

module.exports = { 
  sequelize: mockSequelize, 
  connectDB,
  dbOperations 
};