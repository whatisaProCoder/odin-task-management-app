import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "out/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      ...js.configs.recommended.rules,
    }
  },
  // Prettier config should be last to override formatting rules
  prettierConfig
];