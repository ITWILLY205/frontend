const Project = require('../models/Project');
const { Op } = require('sequelize');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { featured } = req.query;
    let whereClause = {};
    
    if (featured === 'true') {
      whereClause.featured = true;
    }
    
    const projects = await Project.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// @desc    Create new project (admin only)
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, longDescription, technologies, imageUrl, projectUrl, githubUrl, featured } = req.body;
    
    const project = await Project.create({
      title,
      description,
      longDescription,
      technologies: technologies || [],
      imageUrl,
      projectUrl,
      githubUrl,
      featured: featured || false
    });
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// @desc    Update project (admin only)
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    await project.update(req.body);
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// @desc    Delete project (admin only)
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    console.log('Delete project request for ID:', req.params.id);
    console.log('User making request:', req.user);
    
    const projectId = parseInt(req.params.id);
    
    if (!projectId || isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }
    
    const project = await Project.findByPk(projectId);
    
    if (!project) {
      console.log('Project not found with ID:', projectId);
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    console.log('Project found:', project.title);
    
    const deleted = await Project.destroy(projectId);
    
    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete project'
      });
    }
    
    console.log('Project deleted successfully');
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: { id: projectId }
    });
  } catch (error) {
    console.error('Error in deleteProject:', error);
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};