import { SearchLog, ISearchLog } from "../models/SearchLog";

class SearchLogService {
  async saveSearch(term: string, normalizedTerm: string, userRole?: string): Promise<ISearchLog> {
    const log = new SearchLog({ term, normalizedTerm, userRole });
    return await log.save();
  }

  async getRecentSearches(limit = 10): Promise<ISearchLog[]> {
    return await SearchLog.find().sort({ createdAt: -1 }).limit(limit);
  }
}

export const searchLogService = new SearchLogService();
