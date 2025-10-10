import Alliance from "../models/Alliance";
import Resource from "../models/Resource";
import Section from "../models/Section";
import { normalizeText, createFlexibleRegex } from "../utils/normalizeText";

export class SearchService {
  // Extraer términos clave de la consulta
  private extractKeywords(query: string): string[] {
    const stopwords = [
      "el",
      "la",
      "de",
      "y",
      "a",
      "en",
      "que",
      "un",
      "una",
      "para",
      "con",
      "por",
      "los",
      "las",
      "del",
      "al",
      "es",
      "se",
      "no",
      "te",
      "lo",
      "le",
      "da",
      "su",
      "ha",
      "me",
      "si",
      "sin",
      "sobre",
      "este",
      "ya",
      "entre",
      "cuando",
      "todo",
      "esta",
      "ser",
      "son",
      "dos",
      "tambien",
      "fue",
      "habia",
      "era",
      "muy",
      "anos",
      "hasta",
      "desde",
      "esta",
      "mi",
      "porque",
    ];

    const normalizedQuery = normalizeText(query);

    return normalizedQuery
      .split(/\W+/)
      .filter((word) => word.length > 2 && !stopwords.includes(word))
      .slice(0, 10); // Limitar a 10 términos máximo
  }

  async searchAll(query: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const keywords = this.extractKeywords(query);
    if (keywords.length === 0) {
      return {
        query,
        results: { alliances: [], resources: [], sections: [] },
        total: 0,
      };
    }

    try {
      const createSearchConditions = (fields: string[]) => {
        return keywords.flatMap((term) =>
          fields.map((field) => ({
            [field]: createFlexibleRegex(term),
          }))
        );
      };

      const alliances = await Alliance.find({
        $or: createSearchConditions(["name", "siglas", "description"]),
      })
        .skip(skip)
        .limit(limit)
        .exec();

      const resources = await Resource.find({
        $or: createSearchConditions(["name", "description", "content"]),
      })
        .skip(skip)
        .limit(limit)
        .exec();

      const sections = await Section.find({
        $or: createSearchConditions(["title", "description"]),
      })
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        query,
        keywords,
        results: { alliances, resources, sections },
        total: alliances.length + resources.length + sections.length,
      };
    } catch (error) {
      console.error("Error específico:", error);
      throw error;
    }
  }

  async searchExact(query: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const normalizedQuery = normalizeText(query);
    const searchRegex = createFlexibleRegex(normalizedQuery);

    try {
      const alliances = await Alliance.find({
        $or: [
          { name: searchRegex },
          { siglas: searchRegex },
          { description: searchRegex },
        ],
      })
        .skip(skip)
        .limit(limit)
        .exec();

      const resources = await Resource.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { content: searchRegex },
        ],
      })
        .skip(skip)
        .limit(limit)
        .exec();

      const sections = await Section.find({
        $or: [{ title: searchRegex }, { description: searchRegex }],
      })
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        query,
        type: "exact",
        results: { alliances, resources, sections },
        total: alliances.length + resources.length + sections.length,
      };
    } catch (error) {
      throw new Error("Error al realizar la búsqueda exacta");
    }
  }
}

export const searchService = new SearchService();
