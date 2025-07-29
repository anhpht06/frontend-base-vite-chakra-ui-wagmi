export const formatAmount = (value: string | number) => {
  if (!value) return "0";

  const [intPart, decimalPart] = (
    typeof value === "number" ? value.toString() : value
  ).split(".");
  const formattedInt = Number(intPart || "0").toLocaleString("en-US");

  return decimalPart !== undefined
    ? `${formattedInt}.${decimalPart}`
    : formattedInt;
};
export function hasDecimalPart(num: number | string) {
  const number = typeof num === "string" ? +num : num;
  return Math.floor(number) !== number;
}
export function getNumberFixed(number: number | string, fix?: number) {
  const num = typeof number === "number" ? number : +number;
  if (!num) return 0;
  if (!hasDecimalPart(number)) return num;
  return +num.toFixed(fix ? fix : 4);
}
