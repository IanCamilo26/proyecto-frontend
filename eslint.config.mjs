import js from "@eslint/js";
import security from "eslint-plugin-security";
import noUnsanitized from "eslint-plugin-no-unsanitized";

export default [
  js.configs.recommended,
  {
    plugins: {
      security,
      "no-unsanitized": noUnsanitized,
    },
    rules: {
      // Reglas de seguridad
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-unsafe-regex": "error",
      "security/detect-buffer-noassert": "error",
      "security/detect-child-process": "warn",
      "security/detect-disable-mustache-escape": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-non-literal-require": "warn",
      "security/detect-possible-timing-attacks": "warn",
      "security/detect-pseudoRandomBytes": "error",
      
      // Reglas de sanitización
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
    },
  },
  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
];