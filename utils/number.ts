import { Platform } from "react-native";

export function formatter(currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  });
}

export function getNumberPad(): string {
  return "numeric";
}

export function resetToNumber(s): number {
  return isNaN(s) ? 0 : parseFloat(s);
}

export function setFloat(v, fun): void {
  if (v.length > 1 && v[0] === "0" && v[1] !== ".") v = v.slice(1);
  if (v.match(/\./g)?.length > 1) return;
  if (/\d|\./.test(v[v.length - 1])) {
    fun(v);
  }
}
