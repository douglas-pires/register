module.exports = {
    env: {
      es6: true,
      node: true,
    },
    root: true,
    plugins: ["@typescript-eslint", "unused-imports", "import", "jest"],
    extends: [
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/typescript",
      "plugin:prettier/recommended",
    ],

    parserOptions: {
      project: "tsconfig.json",
      sourceType: "module",
    },
    ignorePatterns: ["next.config.js"],
    overrides: [
      {
        files: ["**/*.test.ts"],
        rules: {
          "jest/no-disabled-tests": "warn",
          "jest/no-focused-tests": "error",
          "jest/no-identical-title": "error",
          "jest/prefer-to-have-length": "warn",
          "jest/valid-expect": "error",
        },
      },
      {
        files: ["*.ts", "**/*.ts", "*.sql", "**/*.sql", "*/**/*.tsx"],
        rules: {
          "@typescript-eslint/camelcase": 0,
          "@typescript-eslint/explicit-function-return-type": 1,
          "@typescript-eslint/naming-convention": [
            "warn",
            {
              selector: "property",
              format: ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
            },
            {
              selector: "property",
              format: null,
              filter: {
                regex:
                  "^(__esModule|_set|__html|_ilike|_eq|_in|__esModule|__typename)$",
                match: true,
              },
            },
          ],
          "@typescript-eslint/no-empty-function": 2,
          "@typescript-eslint/no-explicit-any": "warn",
          "padding-line-between-statements": [
            "error",
            {
              blankLine: "always",
              prev: "directive",
              next: "*",
            },
            {
              blankLine: "any",
              prev: "directive",
              next: "directive",
            },
            {
              blankLine: "always",
              prev: "import",
              next: "*",
            },
            {
              blankLine: "any",
              prev: "import",
              next: "import",
            },
            {
              blankLine: "always",
              prev: "*",
              next: ["const", "let", "var", "export"],
            },
            {
              blankLine: "always",
              prev: ["const", "let", "var", "export"],
              next: "*",
            },
            {
              blankLine: "any",
              prev: ["const", "let", "var", "export"],
              next: ["const", "let", "var", "export"],
            },
            {
              blankLine: "always",
              prev: "*",
              next: ["if", "class", "for", "do", "while", "switch", "try"],
            },
            {
              blankLine: "always",
              prev: ["if", "class", "for", "do", "while", "switch", "try"],
              next: "*",
            },
            {
              blankLine: "always",
              prev: "*",
              next: "return",
            },
          ],
          "@typescript-eslint/lines-between-class-members": [
            "error",
            "always",
            {
              exceptAfterOverload: true,
              exceptAfterSingleLine: true,
            },
          ],
          "no-useless-escape": "warn",
          "@typescript-eslint/no-unused-vars": "off",
          "unused-imports/no-unused-imports": "error",
          "import/order": [
            "error",
            {
              groups: ["builtin", "external", "internal"],
              pathGroups: [
                {
                  pattern: "react",
                  group: "external",
                  position: "before",
                },
              ],
              pathGroupsExcludedImportTypes: ["react"],
              "newlines-between": "always",
              alphabetize: {
                order: "asc",
                caseInsensitive: true,
              },
            },
          ],
          "unused-imports/no-unused-vars": [
            "warn",
            {
              vars: "all",
              varsIgnorePattern: "^_",
              args: "after-used",
              argsIgnorePattern: "^_",
              ignoreRestSiblings: true,
            },
          ],
        },
      },
    ],
  };