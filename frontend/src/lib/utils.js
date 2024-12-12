import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isFormValid = (formData) => {
  const isFormValid = Object.keys(formData)
    .map((key) => formData[key] !== "")
    .every((item) => item);

  return !isFormValid;
};
