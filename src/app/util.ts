export const range = (min: number, max: number): number[] => {
  const a = Math.min(min, max);
  const b = Math.max(min, max);
  const len = b - a + 1;
  const result = Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = a + i;
  }
  return result;
};

export const truncate = (text: string, maxLength: number): string => {
  const ellipsis = "…";
  if (text.length <= maxLength) return text;
  const result = [];
  let len = 0;
  const words = text.split(" ");
  for (const word of words) {
    if (word.length + len < maxLength) {
      result.push(word);
      len += word.length;
    } else {
      return `${result.join(" ")}${ellipsis}`;
    }
  }
  throw new Error("This part shouldn't be reached.");
};

export const stripHtmlTags = (text: string): string =>
  text.replace(/<\/?[^>]+(>|$)/g, "");


export const unescapeHtmlChars = (html: string): string => {
  const e = document.createElement("div");
  e.innerHTML = html;
  return e.textContent ?? "";
};

type Debug = { debug: boolean | undefined };
export const isDebug = () => import.meta.env.DEV
  || !!(<Debug><unknown>window).debug;
