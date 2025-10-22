import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    rules: {

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",

      // "react/no-unescaped-entities": "off",
      // "@next/next/no-page-custom-font": "off",
      // "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-empty-object-type": "off",
      // "@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "none" }],
      // "no-restricted-imports": [
      //   "error",
      //   {
      //     name: "next/navigation",
      //     importNames: [
      //       "redirect",
      //       "permanentRedirect",
      //       "useRouter",
      //       "usePathname",
      //     ],
      //     message: "Please import from `@/i18n/routing` instead.",
      //   },
      // ],
      // "@typescript-eslint/no-unused-vars": "error",
    },
    overrides: [
      {
        files: ["**/__tests__/**/*", "**/*.test.*", "**/*.spec.*"],
        extends: ["plugin:jest/recommended"],
        env: {
          jest: true,
        },
      },
    ],
  }),
];

export default eslintConfig;
