import { Router } from "express";
import {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  softDeleteSection,
  restoreSection
} from "../controllers/sectionController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware";
import { isDirectorOrAdmin } from "../middlewares/isDirectorOrAdmin.middleware";

const sectionRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: Gestión de secciones del sistema
 */

/**
 * @swagger
 * /api/sections:
 *   get:
 *     summary: Obtener todas las secciones
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de secciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Section'
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crear nueva sección (Solo directores y admin)
 *     tags: [Sections]
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
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la sección
 *                 example: "Gobernanza"
 *               description:
 *                 type: string
 *                 description: Descripción de la sección
 *                 example: "Sección dedicada a recursos de gobernanza"
 *               resourcesId:
 *                 type: string
 *                 description: ID de los recursos asociados a esta sección
 *                 example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       201:
 *         description: Sección creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section'
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Acceso denegado
 */

//Los usuarios autenticados pueden ver las secciones y filtrar por id
sectionRouter.get("/", authMiddleware, getSections);

/**
 * @swagger
 * /api/sections/{id}:
 *   get:
 *     summary: Obtener sección por ID
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la sección
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Sección encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section'
 *       404:
 *         description: Sección no encontrada
 *       401:
 *         description: No autorizado
 *   put:
 *     summary: Actualizar sección (Solo directores y admin)
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sección a actualizar
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
 *                 description: Nuevo título de la sección
 *                 example: "Gobernanza Avanzada"
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la sección
 *                 example: "Sección actualizada para gobernanza corporativa avanzada"
 *               resourcesId:
 *                 type: string
 *                 description: ID de los recursos asociados a esta sección
 *                 example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Sección actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section'
 *       404:
 *         description: Sección no encontrada
 *       403:
 *         description: Acceso denegado
 *   delete:
 *     summary: Eliminar sección (Solo admin)
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sección a eliminar
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Sección eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Sección no encontrada
 *       403:
 *         description: Acceso denegado (solo admin)
 */
sectionRouter.get("/:id", authMiddleware, getSectionById);

/**
 * @swagger
 * /api/sections/{id}/restore:
 *   post:
 *     summary: Restaurar sección eliminada (Solo admin)
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sección a restaurar
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Sección restaurada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Sección no encontrada
 *       403:
 *         description: Acceso denegado (solo admin)
 */

//Los directores y el administrador pueden crear y editar secciones
sectionRouter.post("/", authMiddleware, isDirectorOrAdmin, createSection);
sectionRouter.put("/:id", authMiddleware, isDirectorOrAdmin, updateSection);

//Sólo el administrador puede eliminar (soft delete) y restaurar secciones
sectionRouter.delete("/:id", authMiddleware, verifyAdmin, softDeleteSection);
sectionRouter.post("/:id/restore", authMiddleware, verifyAdmin, restoreSection);

export default sectionRouter;
