// src/components/ProjectList.js
import React from 'react';
import { db } from '../firebase';

function ProjectList({ projects }) {
  
  const handleDelete = async (projectId) => {
    // Confirmación antes de eliminar
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      return;
    }

    try {
      // ELIMINACIÓN DIRECTA desde Firestore (sin Firebase Function)
      await db.collection('projects').doc(projectId).delete();
      
      alert('✅ Proyecto eliminado correctamente');
      
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('❌ Error al eliminar el proyecto: ' + error.message);
    }
  };

  return (
    <div className="project-list">
      <h2>Lista de Proyectos ({projects.length})</h2>
      
      {/* LISTAS Y KEYS: map() con key única */}
      {projects.map((project) => (
        
        /* FRAGMENTS: Evita nodos adicionales en el DOM */
        <React.Fragment key={project.id}>
          <div className="project-card">
            
            {/* Nombre del proyecto */}
            <h3>{project.name}</h3>
            
            {/* Descripción */}
            <p className="description">{project.description}</p>
            
            {/* Datos externos obtenidos con AXIOS */}
            {project.externalData && (
              <div className="external-data">
                <h4>📡 Datos Externos (JSONPlaceholder):</h4>
                <p><strong>Título:</strong> {project.externalData.title}</p>
                <p><strong>Contenido:</strong> {project.externalData.body}</p>
              </div>
            )}
            
            {/* Fecha de creación */}
            {project.createdAt && (
              <p className="created-date">
                <small>
                  📅 Creado: {project.createdAt.toDate().toLocaleDateString('es-ES')}
                </small>
              </p>
            )}
            
            {/* Botón eliminar */}
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