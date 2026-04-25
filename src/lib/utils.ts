import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(cents: number | undefined | null) {
  if (cents === undefined || cents === null) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(cents / 100);
}

export function formatDate(dateString: string | undefined | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ta-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(dateString: string | undefined | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("ta-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
