module.exports = {
  "extends": ["airbnb", "@meteorjs/eslint-config-meteor"],
  "parser": "babel-eslint",
  "parserOptions": {
      "allowImportExportEverywhere": true
    },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "rules": {
    // windows linebreaks when not in production environment
    "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
    "semi": [0],
    "no-trailing-spaces": [0],
    "comma-dangle": [0],
    "no-unused-vars": [1],
    "react/forbid-prop-types": [1],
    "jsx-quotes": ["warn", "prefer-single"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-no-bind": [1],
  }
}
