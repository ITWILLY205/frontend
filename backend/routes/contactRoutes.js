const express = require('express');
const { submitContact, getContacts, deleteContact } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(submitContact)
  .get(protect, admin, getContacts);

router.route('/:id')
  .delete(protect, admin, deleteContact);

module.exports = router;