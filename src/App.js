import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Cargar proyectos desde Firestore al montar el componente
  useEffect(() => {
  const unsubscribe = db.collection('projects')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      const projectsData = [];
      snapshot.forEach((doc) => {
        projectsData.push({ 
          id: doc.id, 
          ...doc.data() 
        });
      });
      console.log('📊 Proyectos cargados desde Firestore:', projectsData); // ← AGREGAR
      setProjects(projectsData);
    });

  return () => unsubscribe();
}, []);

  return (
    <div className="App">
      <header>
        <h1>📊 Gestión de Proyectos</h1>
        
        {/* RENDERIZADO CONDICIONAL: Botón cambia según showForm */}
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancelar' : '➕ Agregar Proyecto'}
        </button>
      </header>

      {/* RENDERIZADO CONDICIONAL: Mostrar formulario solo si showForm=true */}
      {showForm && (
        <ProjectForm onProjectAdded={() => setShowForm(false)} />
      )}

      {/* RENDERIZADO CONDICIONAL: Mensaje o lista según haya proyectos */}
      {projects.length === 0 ? (
        <div className="no-projects">
          <p>📭 No hay proyectos</p>
          <p>Haz clic en "Agregar Proyecto" para comenzar</p>
        </div>
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  );
}

export default App;
