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

export function setFloatValue(v, fun): void {
  if (v === null) return null;
  if (v.match(/\./g).length > 1) return null;
  if (/\d|\./.test(v[v.length - 1])) {
    fun(v);
  }
}
