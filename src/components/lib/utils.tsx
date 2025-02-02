import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Two parameters with 0 to 1 range, the more it is the greener it is and the less it is the redder it is, in hex.
export const getComplexityColor = (complexity: number, time: number) => {
  const complexityColor = Math.round(complexity * 255).toString(16).padStart(2, '0');
  const timeColor = Math.round(time * 255).toString(16).padStart(2, '0');
  return `#${timeColor}${complexityColor}00`;
}