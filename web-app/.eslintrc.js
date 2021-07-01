module.exports = {
  "env": {
    "node": true,
    "mocha": true,
  },
  "plugins": [
    "node",
    "prettier",
  ],
  "extends": [
    "eslint:recommended",
    "google",
    "plugin:node/recommended",
    "prettier",
  ],
  "ignorePatterns": ["public", "node_modules"],
  "rules": {
    "no-console": 0,
    "no-process-exit": 0,
    "node/no-unpublished-require": ["error", {"allowModules": ["chai", "sinon", "sinon-test"]}],
    "prettier/prettier": ["error", {"singleQuote": true, "printWidth": 160}],
    "prefer-const": "error",
    "prefer-rest-params": "off",
    "valid-jsdoc": "off",
    "camelcase": ["error", {"allow": ["response_type", "return_context", "user_defined", "webhook_error", "damage_description"]}],
  }
};
