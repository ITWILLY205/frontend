// Validation middleware for project operations
const validateProject = (req, res, next) => {
  const { title, description } = req.body;
  
  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Project title is required'
    });
  }
  
  if (!description || description.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Project description is required'
    });
  }
  
  if (title.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Project title must be less than 100 characters'
    });
  }
  
  if (description.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Project description must be less than 500 characters'
    });
  }
  
  next();
};

const validateProjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: 'Valid project ID is required'
    });
  }
  
  next();
};

module.exports = {
  validateProject,
  validateProjectId
};
