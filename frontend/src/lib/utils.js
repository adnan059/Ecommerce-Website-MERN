import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isFormValid = (formData) => {
  const fields = Object.keys(formData).filter((field) => field !== "image");

  const isValidForm = fields
    .map((field) => formData[field] !== "")
    .every((item) => item);

  return !isValidForm;
};

export const noImagePic =
  "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg";

export const createSearchParamsHelper = (filterParams) => {
  //console.log(filterParams);
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
};
