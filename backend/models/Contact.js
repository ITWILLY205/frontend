const { dbOperations } = require('../config/db');

class Contact {
  static async create(data) {
    const db = dbOperations.read();
    const newContact = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    db.contacts.push(newContact);
    dbOperations.write(db);
    return newContact;
  }

  static async findAll() {
    const db = dbOperations.read();
    return db.contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  static async findByPk(id) {
    const db = dbOperations.read();
    return db.contacts.find(contact => contact.id === parseInt(id));
  }

  static async destroy(id) {
    const db = dbOperations.read();
    const index = db.contacts.findIndex(contact => contact.id === parseInt(id));
    if (index !== -1) {
      db.contacts.splice(index, 1);
      dbOperations.write(db);
      return true;
    }
    return false;
  }
}

module.exports = Contact;