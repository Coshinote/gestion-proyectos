// src/components/ProjectForm.js
import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebase';
import axios from 'axios';

function ProjectForm({ onProjectAdded }) {
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Configurar validador
  const [validator] = useState(() => new SimpleReactValidator({
    messages: {
      required: 'Este campo es obligatorio',
      min: 'La descripción debe tener al menos 10 caracteres'
    }
  }));
  
  // Estado para forzar actualización cuando hay errores
  const [, forceUpdate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    // Validar todos los campos
    if (!validator.allValid()) {
      validator.showMessages(); // Mostrar mensajes de error
      forceUpdate({}); // Forzar re-render para mostrar errores
      return;
    }

    setLoading(true); // Mostrar "Guardando..."

    try {
      // 1. Obtener datos de API externa con axios
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts/1'
      );

      // 2. Guardar proyecto en Firestore
      await db.collection('projects').add({
        name: name,
        description: description,
        externalData: {
          title: response.data.title,
          body: response.data.body
        },
        createdAt: new Date()
      });

      // 3. Limpiar formulario
      setName('');
      setDescription('');
      validator.hideMessages();
      
      // 4. Notificar al componente padre
      onProjectAdded();
      alert('¡Proyecto guardado exitosamente!');
      
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-form">
      <h2>Nuevo Proyecto</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Campo: Nombre del Proyecto */}
        <div className="form-group">
          <label>Nombre del Proyecto:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => validator.showMessageFor('name')}
            placeholder="Ej: Sistema de Ventas"
          />
          {validator.message('name', name, 'required')}
        </div>

        {/* Campo: Descripción */}
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => validator.showMessageFor('description')}
            rows="4"
            placeholder="Mínimo 10 caracteres..."
          />
          {validator.message('description', description, 'required|min:10')}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Proyecto'}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;