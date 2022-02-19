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
