import { Request, Response } from "express";
import { searchService } from "../services/searchService";

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
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
