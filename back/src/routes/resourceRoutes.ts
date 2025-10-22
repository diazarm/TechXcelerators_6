import { Router } from "express";
import { getResources, createResource, getResourceById, getResourcesBySection, updateResource, deleteResource, restoreResource, getResourcesByAlliance } from "../controllers/resourceController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isDirectorOrAdmin } from "../middlewares/isDirectorOrAdmin.middleware";

const resourceRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Gestión de recursos educativos
 */

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Obtener todos los recursos
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de recursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Crear un nuevo recurso (Solo directores y admin)
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - section
 *               - alliance
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del recurso
 *               description:
 *                 type: string
 *                 description: Descripción del recurso
 *               section:
 *                 type: string
 *                 description: ID de la sección
 *               alliance:
 *                 type: string
 *                 description: ID de la alianza
 *               image:
 *                 type: string
 *                 description: URL de la imagen
 *               link:
 *                 type: string
 *                 description: Enlace al recurso
 *     responses:
 *       201:
 *         description: Recurso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       403:
 *         description: Acceso denegado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//Todos los usuarios autenticados pueden ver,filtrar por seccion o editar los recursos
resourceRouter.get("/", authMiddleware, getResources);

/**
 * @swagger
 * /api/resources/alliance/{name}:
 *   get:
 *     summary: Obtener recursos por alianza
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nombre de la alianza
 *         schema:
 *           type: string
 *           example: "Alianza1"
 *     responses:
 *       200:
 *         description: Lista de recursos de la alianza
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Alianza no encontrada
 *       401:
 *         description: No autorizado
 */
resourceRouter.get('/alliance/:name', authMiddleware, getResourcesByAlliance);

/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: Obtener recurso por ID
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
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Recurso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Recurso no encontrado
 *       401:
 *         description: No autorizado
 *   put:
 *     summary: Actualizar recurso
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
 *           example: "6716b52c43f33bf9f92e0850"
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
 *                 example: "Recurso Actualizado"
 *               description:
 *                 type: string
 *                 description: Nueva descripción del recurso
 *                 example: "Descripción actualizada del recurso"
 *               section:
 *                 type: string
 *                 description: ID de la nueva sección
 *                 example: "6716b52c43f33bf9f92e0851"
 *               alliance:
 *                 type: string
 *                 description: ID de la nueva alianza
 *                 example: "6716b52c43f33bf9f92e0852"
 *               image:
 *                 type: string
 *                 description: Nueva URL de la imagen
 *                 example: "https://example.com/nueva-imagen.jpg"
 *               link:
 *                 type: string
 *                 description: Nuevo enlace al recurso
 *                 example: "https://example.com/nuevo-recurso"
 *     responses:
 *       200:
 *         description: Recurso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Recurso no encontrado
 *       401:
 *         description: No autorizado
 *   delete:
 *     summary: Eliminar recurso (Solo directores y admin)
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
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Recurso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Recurso no encontrado
 *       403:
 *         description: Acceso denegado
 */
resourceRouter.get("/:id", authMiddleware, getResourceById);

/**
 * @swagger
 * /api/resources/section/{sectionId}:
 *   get:
 *     summary: Obtener recursos por sección
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         description: ID de la sección
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0851"
 *     responses:
 *       200:
 *         description: Lista de recursos de la sección
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Sección no encontrada
 *       401:
 *         description: No autorizado
 */
resourceRouter.get("/section/:sectionId", authMiddleware, getResourcesBySection);
resourceRouter.put("/:id", authMiddleware, updateResource);

/**
 * @swagger
 * /api/resources/restore/{id}:
 *   patch:
 *     summary: Restaurar recurso eliminado (Solo directores y admin)
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recurso a restaurar
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Recurso restaurado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Recurso no encontrado
 *       403:
 *         description: Acceso denegado
 */

//Los directores y el administrador pueden crear, eliminar (soft delete) y restaurar recursos
resourceRouter.post("/", authMiddleware, isDirectorOrAdmin, createResource);
resourceRouter.delete("/:id", authMiddleware, isDirectorOrAdmin, deleteResource);
resourceRouter.patch("/restore/:id", authMiddleware, isDirectorOrAdmin, restoreResource);

export default resourceRouter;