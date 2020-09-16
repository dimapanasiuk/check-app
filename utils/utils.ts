export const uniqValues = (arr: Array<string | number>): Array<string | number> => {
    return Array.from(new Set(arr));
}