import clsx, { type ClassValue } from "clsx";

/**
 * PUBLIC_INTERFACE
 * Combine conditional class names into a single string.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
