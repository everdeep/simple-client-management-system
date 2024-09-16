export function toSnakeCase(obj: any): any {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key.replace(/([A-Z])/g, '_$1').toLowerCase(), value])
    );
}
