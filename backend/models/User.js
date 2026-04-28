const { dbOperations } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(data) {
    const db = dbOperations.read();
    
    // Check if user already exists
    const existingUser = db.users.find(user => user.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const newUser = {
      id: Date.now(),
      ...data,
      password: hashedPassword,
      role: data.role || 'user',
      createdAt: new Date().toISOString()
    };
    
    db.users.push(newUser);
    dbOperations.write(db);
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async findOne(options) {
    const db = dbOperations.read();
    
    if (options.where && options.where.email) {
      return db.users.find(user => user.email === options.where.email);
    }
    
    return null;
  }

  static async findByPk(id) {
    const db = dbOperations.read();
    return db.users.find(user => user.id === parseInt(id));
  }

  static async findAll() {
    const db = dbOperations.read();
    return db.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
