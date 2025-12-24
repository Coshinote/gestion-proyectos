// src/components/ProjectList.js
import React from 'react';
import { db } from '../firebase';

function ProjectList({ projects }) {
  
  const handleDelete = async (projectId) => {
    if (!projectId) {
      alert('❌ Error: ID no válido');
      return;
    }

    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      return;
    }

    try {
      await db.collection('projects').doc(projectId).delete();
      alert('✅ Proyecto eliminado');
      
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('❌ Error al eliminar el proyecto');
    }
  };

  return (
    <div className="project-list">
      <h2>📋 Lista de Proyectos ({projects.length})</h2>
      
      {projects.map((project) => (
        <React.Fragment key={project.id}>
          <div className="project-card">
            
            <h3>{project.name}</h3>
            <p className="description">{project.description}</p>
            
            {project.externalData && (
              <div className="external-data">
                <h4>🌐 Datos Externos (JSONPlaceholder):</h4>
                <p><strong>Título:</strong> {project.externalData.title}</p>
                <p><strong>Contenido:</strong> {project.externalData.body}</p>
              </div>
            )}
            
            {project.createdAt && (
              <p className="created-date">
                <small>
                  📅 Creado: {project.createdAt.toDate().toLocaleDateString('es-ES')}
                </small>
              </p>
            )}
            
            <button 
              onClick={() => handleDelete(project.id)}
              className="delete-btn"
            >
              🗑️ Eliminar
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ProjectList;