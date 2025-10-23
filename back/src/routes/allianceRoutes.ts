import { Router } from 'express';
import {
    getAlliances,
    getAllianceById,
    createAlliance,
    updateAlliance,
    deleteAlliance,
    restoreAlliance
} from '../controllers/allianceController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { isDirectorOrAdmin } from '../middlewares/isDirectorOrAdmin.middleware';

const allianceRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Alliances
 *   description: Gestión de alianzas del sistema
 */

/**
 * @swagger
 * /api/alliances:
 *   get:
 *     summary: Obtener todas las alianzas
 *     tags: [Alliances]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alianzas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alliance'
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crear nueva alianza (Solo directores y admin)
 *     tags: [Alliances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la alianza
 *                 example: "Alianza TechXcelerators"
 *               siglas:
 *                 type: string
 *                 description: Siglas de la alianza
 *                 example: "ATX"
 *               url:
 *                 type: string
 *                 description: URL oficial de la alianza
 *                 example: "https://techxcelerators.com"
 *               logos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       description: Descripción del logo
 *                       example: "Logo principal"
 *                     url:
 *                       type: string
 *                       description: URL de la imagen del logo
 *                       example: "https://example.com/logo.png"
 *                 example:
 *                   - label: "Logo principal"
 *                     url: "https://example.com/logo-principal.png"
 *                   - label: "Logo alternativo"
 *                     url: "https://example.com/logo-alt.png"
 *     responses:
 *       201:
 *         description: Alianza creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alliance'
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Acceso denegado
 */

//Usuarios autenticados puedes ver y editar las alianzas
allianceRouter.get('/', authMiddleware, getAlliances);

/**
 * @swagger
 * /api/alliances/{id}:
 *   get:
 *     summary: Obtener alianza por ID
 *     tags: [Alliances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la alianza
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Alianza encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alliance'
 *       404:
 *         description: Alianza no encontrada
 *       401:
 *         description: No autorizado
 *   put:
 *     summary: Actualizar alianza
 *     tags: [Alliances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la alianza a actualizar
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
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de la alianza
 *                 example: "Alianza TechXcelerators Actualizada"
 *               siglas:
 *                 type: string
 *                 description: Nuevas siglas de la alianza
 *                 example: "ATXA"
 *               url:
 *                 type: string
 *                 description: Nueva URL oficial de la alianza
 *                 example: "https://techxcelerators-updated.com"
 *               logos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       description: Descripción del logo
 *                       example: "Logo actualizado"
 *                     url:
 *                       type: string
 *                       description: URL de la imagen del logo
 *                       example: "https://example.com/logo-nuevo.png"
 *                 example:
 *                   - label: "Logo principal actualizado"
 *                     url: "https://example.com/logo-principal-v2.png"
 *     responses:
 *       200:
 *         description: Alianza actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alliance'
 *       404:
 *         description: Alianza no encontrada
 *       401:
 *         description: No autorizado
 *   delete:
 *     summary: Eliminar alianza (Solo directores y admin)
 *     tags: [Alliances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la alianza a eliminar
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Alianza eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Alianza no encontrada
 *       403:
 *         description: Acceso denegado
 */
allianceRouter.get('/:id', authMiddleware, getAllianceById);
allianceRouter.put('/:id', authMiddleware, updateAlliance);

/**
 * @swagger
 * /api/alliances/restore/{id}:
 *   patch:
 *     summary: Restaurar alianza eliminada (Solo directores y admin)
 *     tags: [Alliances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la alianza a restaurar
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Alianza restaurada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Alianza no encontrada
 *       403:
 *         description: Acceso denegado
 */

//Los directores y el administrador pueden crear nuevas alianzas, eliminar (soft delete) y restaurar alianzas
allianceRouter.post('/', authMiddleware, isDirectorOrAdmin, createAlliance);
allianceRouter.delete('/:id', authMiddleware, isDirectorOrAdmin, deleteAlliance);
allianceRouter.patch('/restore/:id', authMiddleware, isDirectorOrAdmin, restoreAlliance);

export default allianceRouter;
