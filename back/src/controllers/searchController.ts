import { Request, Response } from "express";
import { searchService } from "../services/searchService";
import { searchLogService } from "../services/searchLogService";

// Función para normalizar texto (quita tildes y pasa a minúsculas)
const normalizeText = (text: string): string => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

// Controlador unificado
export const searchController = {
  // 🔍 Búsqueda global (ya existente + guardado de log)
  async globalSearch(req: Request, res: Response): Promise<void> {
    try {
      const { q, page = 1, limit = 10, type = "smart", role } = req.query;

      if (!q || typeof q !== "string") {
        res.status(400).json({ error: 'Parámetro de búsqueda "q" es requerido' });
        return;
      }

      const pageNum = Math.max(1, parseInt(page as string) || 1);
      const limitNum = Math.min(50, Math.max(1, parseInt(limit as string) || 10));

      // Normaliza texto
      const normalizedQuery = normalizeText(q);

      // Lógica de búsqueda existente
      let results;
      if (type === "exact") {
        results = await searchService.searchExact(normalizedQuery, pageNum, limitNum);
      } else {
        results = await searchService.searchAll(normalizedQuery, pageNum, limitNum);
      }

      // 🧠 Guarda búsqueda en el historial (nuevo)
      await searchLogService.saveSearch(q, normalizedQuery, role?.toString());

      // Respuesta
      res.json({
        ...results,
        pagination: { page: pageNum, limit: limitNum },
      });
    } catch (error: any) {
      console.error("Error en búsqueda global:", error);
      res.status(500).json({ error: error.message || "Error interno del servidor" });
    }
  },

  // 🕓 Historial de búsquedas recientes
  async getRecentSearches(req: Request, res: Response): Promise<void> {
    try {
      const logs = await searchLogService.getRecentSearches(10);
      res.status(200).json({ logs });
    } catch (error: any) {
      console.error("Error al obtener historial:", error);
      res.status(500).json({ error: error.message || "Error al obtener historial" });
    }
  },
};
