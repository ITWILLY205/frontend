const { dbOperations } = require('../config/db');

class Project {
  static async create(data) {
    const db = dbOperations.read();
    const newProject = {
      id: Date.now(),
      ...data,
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      featured: data.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.projects.push(newProject);
    dbOperations.write(db);
    return newProject;
  }

  static async findAll(options = {}) {
    const db = dbOperations.read();
    let projects = db.projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    if (options.where && options.where.featured) {
      projects = projects.filter(project => project.featured);
    }
    
    return projects;
  }

  static async findByPk(id) {
    const db = dbOperations.read();
    return db.projects.find(project => project.id === parseInt(id));
  }

  static async update(id, data) {
    const db = dbOperations.read();
    const index = db.projects.findIndex(project => project.id === parseInt(id));
    if (index !== -1) {
      db.projects[index] = {
        ...db.projects[index],
        ...data,
        technologies: Array.isArray(data.technologies) ? data.technologies : db.projects[index].technologies,
        updatedAt: new Date().toISOString()
      };
      dbOperations.write(db);
      return db.projects[index];
    }
    return null;
  }

  static async destroy(id) {
    const db = dbOperations.read();
    const index = db.projects.findIndex(project => project.id === parseInt(id));
    if (index !== -1) {
      db.projects.splice(index, 1);
      dbOperations.write(db);
      return true;
    }
    return false;
  }
}

module.exports = Project;
