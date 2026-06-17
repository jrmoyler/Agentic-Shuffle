import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const filePath = fileURLToPath(import.meta.url);
const directory = dirname(filePath);
const compat = new FlatCompat({
  baseDirectory: directory
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "node_modules/**", "public/**", "src/data/generated/**", "next-env.d.ts"]
  }
];

export default eslintConfig;
