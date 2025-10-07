// Funciones de utilidad para debugging y restauración de recursos

// Función de utilidad para forzar la detección de recursos eliminados
(window as any).forceDetectDeletedResources = async () => {
  console.log('🚀 Iniciando detección de recursos eliminados...');
  try {
    const { api } = await import('../services/api');
    console.log('📦 API importada correctamente');
    
    // Intentar directamente con el endpoint
    const response = await api.get('/resources?includeDeleted=true');
    console.log('🌐 Respuesta del backend:', response.data);
    
    const allResources = (response.data as any).data || [];
    const deletedResources = allResources.filter((resource: any) => 
      resource.isActive === false || resource.deletedAt
    );
    
    console.log('🔍 Total recursos:', allResources.length);
    console.log('🗑️ Recursos eliminados:', deletedResources.length);
    console.log('📋 Detalles eliminados:', deletedResources);
    
    // Disparar evento para actualizar la UI
    window.dispatchEvent(new CustomEvent('forceRefreshDeletedResources', {
      detail: { deletedResources }
    }));
    
    console.log('✅ Evento disparado para actualizar UI');
    return deletedResources;
  } catch (error) {
    console.error('❌ Error detectando recursos eliminados:', error);
    return [];
  }
};

// Función de utilidad para restaurar TODOS los recursos eliminados
(window as any).restoreAllDeletedResources = async () => {
  console.log('🔄 Restaurando TODOS los recursos eliminados...');
  try {
    const { api } = await import('../services/api');
    
    // IDs de los recursos que sabes que están eliminados
    const resourceIds = [
      '68c22af480f85343fb2bf920', // Portafolio y Precios
      '68cae80754f9344f27defc8b'  // Fichas técnicas
    ];
    
    console.log('🗑️ Recursos a restaurar:', resourceIds.length);
    
    // Restaurar cada recurso
    const restoredResources = [];
    for (const resourceId of resourceIds) {
      try {
        console.log(`🔄 Restaurando recurso: ${resourceId}`);
        const restoreResponse = await api.patch(`/resources/restore/${resourceId}`);
        console.log(`✅ Recurso restaurado:`, restoreResponse.data);
        restoredResources.push(restoreResponse.data);
      } catch (error: any) {
        console.error(`❌ Error restaurando ${resourceId}:`, error);
      }
    }
    
    console.log('🎉 Proceso completado. Recursos restaurados:', restoredResources.length);
    
    // Recargar la página
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
    return restoredResources;
  } catch (error: any) {
    console.error('❌ Error en restauración masiva:', error);
    throw error;
  }
};

console.log('🔧 Funciones de debug disponibles:');
console.log('  - window.forceDetectDeletedResources()');
console.log('  - window.restoreAllDeletedResources()');
