const { createConfig } = require('eslint-config-galex/dist/createConfig');
const { getDependencies } = require('eslint-config-galex/dist/getDependencies');

const {
  createReactOverride,
} = require('eslint-config-galex/dist/overrides/react');
const {
  createTypeScriptOverride,
} = require('eslint-config-galex/dist/overrides/typescript');

const dependencies = getDependencies();

module.exports = createConfig({
  rules: {
    'import/order': 'off',

    'sort-keys-fix/sort-keys-fix': 'off', // keys should be sorted based on significance
    'import/no-default-export': 'off', // default exports are common in React
    'no-negated-condition': 'off', // ternaries are sometimes more readable when `true` branch is most significant branch

    // Prefer explicit, consistent return - e.g. `return undefined;`
    'unicorn/no-useless-undefined': 'off',
    'consistent-return': 'error',

    // Properties available after typeguard may be tedious to destructure (e.g. in JSX)
    'unicorn/consistent-destructuring': 'off',
  },
  overrides: [
    createReactOverride({
      ...dependencies,
      rules: {
        'react/jsx-no-constructed-context-values': 'off', // too strict
      },
    }),
    createTypeScriptOverride({
      ...dependencies,
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off', // too strict
        '@typescript-eslint/no-floating-promises': 'off', // big crash sometimes better than silent fail
        '@typescript-eslint/lines-between-class-members': 'off', // allow grouping single-line members
        '@typescript-eslint/explicit-module-boundary-types': 'off', // worsens readability sometimes (e.g. for React components)

        // Ignore ts complaining about possible null values
        '@typescript-eslint/prefer-nullish-coalescing': 'off',

        // Unused vars should be removed but not prevent compilation
        '@typescript-eslint/no-unused-vars': 'warn',

        // Allow writing void-returning arrow functions in shorthand to save space
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          { ignoreArrowShorthand: true },
        ],

        // Prefer `interface` over `type`
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],
      },
    }),
  ],
});
