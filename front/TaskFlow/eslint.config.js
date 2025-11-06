// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'], // 🎯 лише твій код
    ignores: ['dist', 'build', 'node_modules'], // 🚫 зайве не чіпає
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // window, document, console, localStorage тощо
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    settings: {
      react: {
        version: 'detect', // автоматично визначає версію React
      },
    },
    rules: {
      // 🔹 Базові рекомендації
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // 🔹 Форматування
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto', // WSL-рятівник: не свариться через CRLF/LF
          singleQuote: true,
          semi: true,
          trailingComma: 'es5',
          printWidth: 100,
        },
      ],

      // 🔹 React 17+ JSX-трансформ
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // 🔹 Опціональні правила
      'react/prop-types': 'off', // якщо користуєшся TypeScript або PropTypes не потрібен
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // логай на здоров’я у деві
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // дозволяє _unused аргументи
          varsIgnorePattern: '^React$', // не чіпає імпорт React
        },
      ],
    },
  },
];
