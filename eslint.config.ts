// eslint.config.js
import eslint from '@eslint/js';
import typescript from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';
import vueeslint from "vue-eslint-parser"

export default typescript.config(
    {
        files: ["src/**/*.{ts,vue}"],
        languageOptions: {
            parser: vueeslint,
            parserOptions: {
                parser: typescript.parser,
                project: ['./tsconfig.app.json'],
                tsconfigRootDir: process.cwd(),
                sourceType: 'module',
                ecmaVersion: 'latest',
                extraFileExtensions: [".vue"]
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            vue,
            "@typescript-eslint": typescript.plugin,
            prettier,
        },
        rules: {
            // Base style
            quotes: ['error', 'double', { avoidEscape: true }],
            semi: ['error', 'always'],
            indent: ['error', 4],
            'comma-dangle': ['error', 'only-multiline'],

            // Vue rules
            'vue/html-indent': ['error', 4],
            'vue/max-attributes-per-line': ['error', {
                singleline: 3,
                multiline: { max: 1, allowFirstLine: false },
            }],
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
            'vue/multi-word-component-names': 'error',
            'vue/no-mutating-props': 'error',
            'vue/no-unused-components': 'warn',
            'vue/no-unused-vars': 'warn',
            'vue/require-default-prop': 'off',

            // TypeScript
            '@typescript-eslint/no-unused-vars': ['error'],
            '@typescript-eslint/explicit-function-return-type': ['error', {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            }],
            '@typescript-eslint/no-explicit-any': 'error',

            // Best practices
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'eqeqeq': ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
            'consistent-return': 'error',
            'no-else-return': 'error',
            'no-empty-function': ['error', { allow: ['constructors'] }],

            // Prettier
            'prettier/prettier': ['error', {
                singleQuote: false,
                semi: true,
                tabWidth: 4,
                trailingComma: 'es5',
            }],
        }
    },
    configPrettier
);
