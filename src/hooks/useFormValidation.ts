import { useState, useEffect } from "react";
import { ApiProvider, ApiType } from "../types";

interface FormValues {
  urls: string;
  apiType: ApiType;
  standardProvider: ApiProvider;
  standardModel: string;
  customProvider: ApiProvider;
  customModel: string;
  customUrl: string;
  apiKey: string;
}

interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Custom hook for form validation
 *
 * @param {FormValues} values - Form field values
 * @returns {FormValidation} - Validation state
 */
export const useFormValidation = (values: FormValues): FormValidation => {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    // Validate URLs
    if (!values.urls.trim()) {
      newErrors.urls = "Please enter at least one URL";
    } else {
      const urlsArray = values.urls
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean);

      if (urlsArray.length === 0) {
        newErrors.urls = "Please enter at least one URL";
      } else {
        const invalidUrls = urlsArray.filter((url) => {
          try {
            new URL(url);
            return false;
          } catch {
            return true;
          }
        });

        if (invalidUrls.length > 0) {
          newErrors.urls = `Invalid URL format: ${invalidUrls[0]}${
            invalidUrls.length > 1 ? ` and ${invalidUrls.length - 1} more` : ""
          }`;
        }
      }
    }

    // Validate API Key
    if (!values.apiKey.trim()) {
      newErrors.apiKey = "API Key is required";
    }

    // Validate provider and model based on API type
    if (values.apiType === "standard") {
      if (!values.standardProvider) {
        newErrors.standardProvider = "Please select a provider";
      }

      if (!values.standardModel) {
        newErrors.standardModel = "Please select a model";
      }
    } else {
      if (!values.customUrl.trim()) {
        newErrors.customUrl = "Custom API URL is required";
      } else {
        try {
          new URL(values.customUrl);
        } catch {
          newErrors.customUrl = "Invalid URL format";
        }
      }

      if (!values.customProvider) {
        newErrors.customProvider = "Please select a provider";
      }

      if (!values.customModel) {
        newErrors.customModel = "Please select a model";
      }
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [values]);

  return { isValid, errors };
};
