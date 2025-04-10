export function parseProducers(raw: string): string[] {
    if (!raw) return [];

    const parts = raw
        .replace(/\sand\s/g, ',')
        .split(',')
        .map((s) =>
            s
                .replace(/\(.*?\)/g, '')
                .trim()
        )
        .filter(Boolean);

    return [...new Set(parts)];
}
