export const range = (min: number, max: number): number[] => {
    const a = Math.min(min, max);
    const b = Math.max(min, max);
    const len = b - a + 1;
    const result = Array(len);
    for (let i = 0; i < len; i++) {
        result[i] = a + i;
    }
    return result;
}