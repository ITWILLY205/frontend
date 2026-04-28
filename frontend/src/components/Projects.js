import React, { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getProjects();
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div id="projects">
      {projects.length === 0 ? (
        <p>No projects yet. Check back soon!</p>
      ) : (
        projects.map((project, index) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.longDescription && (
              <div>
                {(() => {
                  const text = project.longDescription.trim();
                  const charsPerLine = Math.ceil(text.length / 7);
                  const lines = [];
                  
                  for (let i = 0; i < 7; i++) {
                    const start = i * charsPerLine;
                    const end = start + charsPerLine;
                    const lineText = text.substring(start, end);
                    if (lineText.length > 0) {
                      lines.push(lineText);
                    }
                  }
                  
                  return lines.map((line, index) => (
                    <p key={index}>{line}</p>
                  ));
                })()}
              </div>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <p>Technologies: {project.technologies.join(', ')}</p>
            )}
            {project.languages && project.languages.length > 0 && (
              <p>Languages: {project.languages.join(', ')}</p>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link view-code-btn">View Code</a>
            )}
            <a href={project.projectUrl || '#'} target="_blank" rel="noopener noreferrer" className="project-link view-project-btn">View Project</a>
            {project.codesUrl && (
              <a href={project.codesUrl} target="_blank" rel="noopener noreferrer" className="project-link view-codes-btn">View Codes</a>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;