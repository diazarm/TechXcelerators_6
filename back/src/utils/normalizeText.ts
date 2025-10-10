// Función para normalizar texto (quitar tildes, ñ, mayúsculas, espacios)
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ñÑ]/g, "n")
    .trim();
}

// Función para crear una expresión regular flexible (considera tildes y ñ)
export function createFlexibleRegex(term: string): any {
  const patterns = {
    a: "[aáàäâ]",
    e: "[eéèëê]",
    i: "[iíìïî]",
    o: "[oóòöô]",
    u: "[uúùüû]",
    n: "[nñ]",
  };

  let flexiblePattern = term;
  Object.entries(patterns).forEach(([base, pattern]) => {
    flexiblePattern = flexiblePattern.replace(new RegExp(base, "g"), pattern);
  });

  return { $regex: flexiblePattern, $options: "i" };
}
