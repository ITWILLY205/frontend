import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { projectAPI, contactAPI } from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    technologies: '',
    languages: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    codesUrl: '',
    featured: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [projectsRes, contactsRes] = await Promise.all([
        projectAPI.getProjects(),
        contactAPI.getContacts()
      ]);
      setProjects(projectsRes.data.data);
      setContacts(contactsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    try {
      const techArray = formData.technologies.split(',').map(tech => tech.trim());
      const languagesArray = formData.languages.split(',').map(lang => lang.trim()).filter(lang => lang);
      const projectData = { 
        ...formData, 
        technologies: techArray,
        languages: languagesArray
      };
      
      if (editingProject) {
        await projectAPI.updateProject(editingProject.id, projectData);
        toast.success('Project updated successfully');
      } else {
        await projectAPI.createProject(projectData);
        toast.success('Project created successfully');
      }
      
      resetForm();
      fetchData();
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        console.log('Attempting to delete project with ID:', id);
        const response = await projectAPI.deleteProject(id);
        console.log('Delete response:', response);
        toast.success('Project deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Delete error:', error);
        console.error('Error response:', error.response);
        const errorMessage = error.response?.data?.message || 'Failed to delete project';
        toast.error(errorMessage);
      }
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactAPI.deleteContact(id);
        toast.success('Message deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      technologies: '',
      languages: '',
      imageUrl: '',
      projectUrl: '',
      githubUrl: '',
      codesUrl: '',
      featured: false
    });
    setEditingProject(null);
    setShowAddForm(false);
  };

  const editProject = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      technologies: project.technologies ? project.technologies.join(', ') : '',
      languages: project.languages ? project.languages.join(', ') : '',
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl,
      codesUrl: project.codesUrl,
      featured: project.featured
    });
    setEditingProject(project);
    setShowAddForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-layout">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
            <div className="admin-info">
              <span className="admin-name">Willy MUGABE</span>
              <span className="admin-role">Administrator</span>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <ul>
              <li>
                <button 
                  className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  Projects
                  <span className="nav-count">({projects.length})</span>
                </button>
              </li>
              <li>
                <button 
                  className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                  onClick={() => setActiveTab('messages')}
                >
                  Messages
                  <span className="nav-count">({contacts.length})</span>
                </button>
              </li>
              <li>
                <button 
                  className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-main-content">
          <div className="content-header">
            <h1>
              {activeTab === 'projects' && 'Project Management'}
              {activeTab === 'messages' && 'Contact Messages'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
          </div>

          {activeTab === 'projects' && (
            <div className="admin-content">
              <button 
                className="btn btn-primary add-btn"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Cancel' : 'Add New Project'}
              </button>

              {showAddForm && (
                <div className="project-form">
                  <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                  <form onSubmit={handleSubmitProject}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="description"
                        placeholder="Short Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="longDescription"
                        placeholder="Long Description"
                        rows="4"
                        value={formData.longDescription}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="technologies"
                        placeholder="Technologies (comma-separated)"
                        value={formData.technologies}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="languages"
                        placeholder="Languages Used (comma-separated)"
                        value={formData.languages}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="projectUrl"
                        placeholder="Project URL (optional)"
                        value={formData.projectUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="githubUrl"
                        placeholder="GitHub URL (optional)"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="codesUrl"
                        placeholder="Codes URL (optional)"
                        value={formData.codesUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                        />
                        Featured Project
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      {editingProject ? 'Update' : 'Create'} Project
                    </button>
                  </form>
                </div>
              )}

              <div className="projects-list">
                {projects.map(project => (
                  <div key={project.id} className="project-item">
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tech">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="project-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => editProject(project)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="admin-content">
              <div className="messages-list">
                {contacts.map(contact => (
                  <div key={contact.id} className="message-item">
                    <div className="message-header">
                      <strong>{contact.name}</strong> 
                      <span className="message-email">{contact.email}</span>
                      <span className="message-date">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="message-subject">
                      <strong>Subject:</strong> {contact.subject}
                    </div>
                    <div className="message-body">{contact.message}</div>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="no-messages">No messages yet.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="admin-content">
              <div className="settings-content">
                <h3>Admin Settings</h3>
                <p>Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
