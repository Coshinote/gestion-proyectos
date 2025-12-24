const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.deleteProject = functions.https.onCall(async (data, context) => {
  console.log('=== INICIO FUNCTION ===');
  console.log('projectId recibido:', data.projectId);
  console.log('tipo:', typeof data.projectId);
  
  const projectId = data.projectId;
  
  if (!projectId) {
    console.error('❌ projectId vacío');
    throw new functions.https.HttpsError(
      'invalid-argument', 
      'El ID del proyecto es requerido'
    );
  }
  
  console.log('✅ Eliminando proyecto:', projectId);
  
  try {
    await admin.firestore()
      .collection('projects')
      .doc(projectId)
      .delete();
    
    console.log('✅ Proyecto eliminado exitosamente');
    
    return { 
      success: true, 
      message: 'Proyecto eliminado exitosamente' 
    };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

exports.deleteTask = functions.https.onCall(async (data, context) => {
  console.log('Eliminando tarea:', data.taskId);
  
  const taskId = data.taskId;
  
  if (!taskId) {
    throw new functions.https.HttpsError('invalid-argument', 'ID requerido');
  }
  
  await admin.firestore().collection('tasks').doc(taskId).delete();
  
  return { success: true, message: 'Tarea eliminada exitosamente' };
});