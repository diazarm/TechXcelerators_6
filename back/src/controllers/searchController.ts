import { Request, Response } from "express";

import { searchService } from "../services/searchService";
import User from "../models/User";
import { normalizeText } from "../utils/normalizeText";

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }
    const userId = req.user.uid || req.user._id;

    const { q, page = 1, limit = 10, type = "smart" } = req.query;

    if (!q || typeof q !== "string") {
      res.status(400).json({ error: 'Parámetro de búsqueda "q" es requerido' });
      return;
    }

    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string) || 10));

    let results;
    if (type === "exact") {
      results = await searchService.searchExact(q, pageNum, limitNum);
    } else {
      results = await searchService.searchAll(q, pageNum, limitNum);
    }

    // Guarda la palabra clave después de obtener results
    if (results.keywords && results.keywords.length > 0) {
      const keyword = normalizeText(results.keywords[0]);
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { searchKeywords: keyword } },
        { new: true }
      );
    }

    if (
      !results ||
      !results.results ||
      ((!results.results.alliances || results.results.alliances.length === 0) &&
        (!results.results.resources ||
          results.results.resources.length === 0) &&
        (!results.results.sections || results.results.sections.length === 0))
    ) {
      res.status(404).json({
        success: false,
        message: "No se encontraron resultados para la búsqueda",
        data: results?.results || {
          alliances: [],
          resources: [],
          sections: [],
        },
        pagination: {
          page: pageNum,
          limit: limitNum,
        },
      });
      return;
    }

    res.json({
      ...results,
      pagination: {
        page: pageNum,
        limit: limitNum,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Error interno del servidor" });
  }
};

export const getUserSearchKeywords = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }
    const userId = req.user.uid || req.user._id;
    const user = await User.findById(userId).select("searchKeywords");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }
    res.json({ success: true, keywords: user.searchKeywords || [] });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener palabras clave" });
  }
};
