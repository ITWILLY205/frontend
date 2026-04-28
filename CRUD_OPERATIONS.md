# Project CRUD Operations Documentation

## Overview
Complete CRUD (Create, Read, Update, Delete) operations for project management in the admin dashboard.

## Authentication
All admin operations require:
- JWT token in Authorization header: `Bearer <token>`
- User must have admin role

## API Endpoints

### 1. CREATE Project
- **Method**: POST
- **URL**: `/api/projects`
- **Authentication**: Required (Admin only)
- **Validation**: Title and description required

**Request Body:**
```json
{
  "title": "Project Title",
  "description": "Project description",
  "longDescription": "Detailed project description",
  "technologies": ["React", "Node.js"],
  "imageUrl": "https://example.com/image.jpg",
  "projectUrl": "https://example.com",
  "githubUrl": "https://github.com/user/repo",
  "featured": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1234567890,
    "title": "Project Title",
    "description": "Project description",
    "createdAt": "2026-04-28T10:15:00.000Z",
    "updatedAt": "2026-04-28T10:15:00.000Z"
  }
}
```

### 2. READ All Projects
- **Method**: GET
- **URL**: `/api/projects`
- **Authentication**: Not required (Public)
- **Query Parameters**: `featured=true` for featured projects only

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1234567890,
      "title": "Project 1",
      "description": "Description",
      "featured": true,
      "createdAt": "2026-04-28T10:15:00.000Z"
    }
  ]
}
```

### 3. READ Single Project
- **Method**: GET
- **URL**: `/api/projects/:id`
- **Authentication**: Not required (Public)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1234567890,
    "title": "Project 1",
    "description": "Description",
    "longDescription": "Detailed description",
    "technologies": ["React", "Node.js"],
    "imageUrl": "https://example.com/image.jpg",
    "projectUrl": "https://example.com",
    "githubUrl": "https://github.com/user/repo",
    "featured": true,
    "createdAt": "2026-04-28T10:15:00.000Z",
    "updatedAt": "2026-04-28T10:15:00.000Z"
  }
}
```

### 4. UPDATE Project
- **Method**: PUT
- **URL**: `/api/projects/:id`
- **Authentication**: Required (Admin only)
- **Validation**: Title and description required

**Request Body:** Same as CREATE (all fields optional except title/description)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1234567890,
    "title": "Updated Project Title",
    "description": "Updated description",
    "updatedAt": "2026-04-28T10:20:00.000Z"
  }
}
```

### 5. DELETE Project
- **Method**: DELETE
- **URL**: `/api/projects/:id`
- **Authentication**: Required (Admin only)
- **Validation**: Valid project ID required

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully",
  "data": {
    "id": 1234567890
  }
}
```

## Frontend Implementation

### Admin Panel Functions

#### Create Project
```javascript
const handleSubmitProject = async (e) => {
  e.preventDefault();
  try {
    const projectData = { ...formData, technologies: techArray };
    await projectAPI.createProject(projectData);
    toast.success('Project created successfully');
    fetchData();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create project');
  }
};
```

#### Update Project
```javascript
const handleSubmitProject = async (e) => {
  if (editingProject) {
    await projectAPI.updateProject(editingProject.id, projectData);
    toast.success('Project updated successfully');
  }
};
```

#### Delete Project
```javascript
const handleDeleteProject = async (id) => {
  if (window.confirm('Are you sure you want to delete this project?')) {
    try {
      await projectAPI.deleteProject(id);
      toast.success('Project deleted successfully');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  }
};
```

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "message": "Project title is required"
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized, token failed"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Project not found"
}
```

#### 500 Server Error
```json
{
  "success": false,
  "message": "Error deleting project"
}
```

## Database Schema

### Project Model
```javascript
{
  id: Number (timestamp),
  title: String (required, max 100 chars),
  description: String (required, max 500 chars),
  longDescription: String (optional),
  technologies: Array (optional),
  imageUrl: String (optional),
  projectUrl: String (optional),
  githubUrl: String (optional),
  featured: Boolean (default: false),
  createdAt: String (ISO date),
  updatedAt: String (ISO date)
}
```

## Security Features

1. **Authentication**: JWT token verification
2. **Authorization**: Admin role check
3. **Validation**: Input validation for all operations
4. **Error Handling**: Comprehensive error responses
5. **Logging**: Console logging for debugging

## Testing

### Test Cases
1. Create project with valid data
2. Create project with missing required fields
3. Update existing project
4. Update non-existent project
5. Delete existing project
6. Delete non-existent project
7. Access admin endpoints without authentication
8. Access admin endpoints without admin role

## Troubleshooting

### Common Issues
1. **"Failed to delete project"**: Check authentication and project ID
2. **"Not authorized"**: Verify JWT token and admin role
3. **"Project not found"**: Verify project ID exists
4. **"Validation Error"**: Check required fields and character limits

### Debug Steps
1. Check browser console for errors
2. Verify JWT token in localStorage
3. Check network requests in browser dev tools
4. Check backend console logs
5. Verify database.json file contents
