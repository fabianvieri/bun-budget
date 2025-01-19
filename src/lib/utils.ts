import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function currencyFormatter(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "usd",
    minimumFractionDigits: 0,
  }).format(amount)
}
