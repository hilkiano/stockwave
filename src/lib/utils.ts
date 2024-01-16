import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function priceFormatter(amount: number, currency = "IDR") {
  if (typeof amount !== "number" || currency !== "IDR") {
    return "-";
  }

  switch (currency) {
    case "IDR":
      return amount.toLocaleString("id-ID", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
      });

    default:
      return "-";
  }
}
