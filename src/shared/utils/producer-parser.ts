export function parseProducers(raw: string): string[] {
    if (!raw) return [];

    // Substitui " and " por "," e depois faz split por vírgula
    const parts = raw
        .replace(/\sand\s/g, ',')
        .split(',')
        .map((s) =>
            s
                .replace(/\(.*?\)/g, '') // remove "(co-producer)" e similares
                .trim()
        )
        .filter(Boolean);

    // Remove duplicatas
    return [...new Set(parts)];
}
