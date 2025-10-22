import { Router } from "express";
import { search, getUserSearchKeywords } from "../controllers/searchController";
import { authMiddleware } from "../middlewares/auth.middleware";

const searchRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Funcionalidades de búsqueda en el sistema
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Buscar recursos en el sistema
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Término de búsqueda
 *         schema:
 *           type: string
 *           example: "matemáticas"
 *       - in: query
 *         name: section
 *         description: Filtrar por sección específica
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *       - in: query
 *         name: alliance
 *         description: Filtrar por alianza específica
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0851"
 *       - in: query
 *         name: limit
 *         description: Número máximo de resultados
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *           example: 20
 *       - in: query
 *         name: offset
 *         description: Número de resultados a omitir (paginación)
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           example: 0
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resource'
 *                 total:
 *                   type: integer
 *                   description: Total de resultados encontrados
 *                   example: 15
 *                 limit:
 *                   type: integer
 *                   description: Límite aplicado
 *                   example: 20
 *                 offset:
 *                   type: integer
 *                   description: Offset aplicado
 *                   example: 0
 *                 query:
 *                   type: string
 *                   description: Término de búsqueda utilizado
 *                   example: "matemáticas"
 *       400:
 *         description: Parámetros de búsqueda inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
searchRouter.get("/", authMiddleware, search);

/**
 * @swagger
 * /api/search/keywords:
 *   get:
 *     summary: Obtener palabras clave de búsqueda del usuario
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de palabras clave de búsqueda del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 keywords:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       keyword:
 *                         type: string
 *                         description: Palabra clave buscada
 *                         example: "matemáticas"
 *                       count:
 *                         type: integer
 *                         description: Número de veces buscada
 *                         example: 5
 *                       lastSearched:
 *                         type: string
 *                         format: date-time
 *                         description: Última vez que se buscó
 *                         example: "2023-10-22T10:30:00Z"
 *                 totalSearches:
 *                   type: integer
 *                   description: Total de búsquedas realizadas por el usuario
 *                   example: 25
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
searchRouter.get("/keywords", authMiddleware, getUserSearchKeywords);

export default searchRouter;