const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateProject, validateProjectId } = require('../middleware/validation');
const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, admin, validateProject, createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, admin, validateProjectId, validateProject, updateProject)
  .delete(protect, admin, validateProjectId, deleteProject);

module.exports = router;