// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
admin.initializeApp();

// FUNCIÓN: Eliminar proyecto
exports.deleteProject = functions.https.onCall(async (data, context) => {
  // Obtener ID del proyecto a eliminar
  const { projectId } = data;

  // Validar que se envió el ID
  if (!projectId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'El ID del proyecto es requerido'
    );
  }

  try {
    // Eliminar documento de Firestore
    await admin.firestore()
      .collection('projects')
      .doc(projectId)
      .delete();

    console.log('Proyecto eliminado:', projectId);

    return { 
      success: true, 
      message: 'Proyecto eliminado correctamente' 
    };
    
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    
    throw new functions.https.HttpsError(
      'internal',
      'Error al eliminar el proyecto',
      error.message
    );
  }
});