module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-rational-order',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'indentation': 2,
    'no-empty-first-line': true,
    'no-descending-specificity': null,
    'selector-max-empty-lines': 0,
    'no-duplicate-selectors': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'block-opening-brace-space-before': 'always',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-closing-brace-empty-line-before': 'never',
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: ['prefers-reduced-motion'],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind', 'responsive', 'apply'],
      },
    ],
  },
}
