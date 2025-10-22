# Guía de Documentación con Swagger

## ¿Qué acabamos de configurar?

✅ **Swagger UI**: Interfaz web interactiva para tu API
✅ **Swagger JSDoc**: Generación automática de documentación desde comentarios
✅ **Esquemas TypeScript**: Definiciones de tipos para la API
✅ **Autenticación JWT**: Configuración para endpoints protegidos

## URLs Importantes

- **Documentación Swagger**: http://localhost:3000/api-docs
- **JSON de la API**: http://localhost:3000/api-docs.json
- **API Base**: http://localhost:3000/api

## Cómo documentar más endpoints

### Ejemplo de endpoint GET con parámetros:

```typescript
/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: Obtener un recurso por ID
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del recurso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Recurso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
```

### Ejemplo de endpoint PUT para actualizar:

```typescript
/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     summary: Actualizar un recurso
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recurso a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título del recurso
 *               description:
 *                 type: string
 *                 description: Nueva descripción del recurso
 *               section:
 *                 type: string
 *                 description: ID de la nueva sección
 *     responses:
 *       200:
 *         description: Recurso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Recurso no encontrado
 */
```

### Ejemplo de endpoint DELETE:

```typescript
/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Eliminar un recurso (soft delete)
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recurso a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recurso eliminado exitosamente"
 *       403:
 *         description: No tienes permisos para eliminar recursos
 *       404:
 *         description: Recurso no encontrado
 */
```

## Próximos pasos

1. **Documentar todos los endpoints**: Agrega comentarios JSDoc a todas las rutas
2. **Personalizar esquemas**: Ajusta los esquemas en `swagger.config.ts` según tus modelos reales
3. **Agregar ejemplos**: Incluye ejemplos de requests y responses
4. **Configurar ambientes**: Ajusta las URLs para producción y desarrollo

## Comandos útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ver documentación
# Ir a http://localhost:3000/api-docs

# Obtener JSON de la API
curl http://localhost:3000/api-docs.json
```

## Beneficios de Swagger

✨ **Documentación automática**: Se actualiza con el código
🧪 **Testing interactivo**: Prueba endpoints directamente desde la UI
🔄 **Sincronización**: Siempre está actualizada con la implementación
👥 **Colaboración**: Facilita el trabajo en equipo
🎯 **Estándares**: Sigue las especificaciones OpenAPI 3.0