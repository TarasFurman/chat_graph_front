module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": ["warn", { "singleQuote": true }],
    "no-unused-vars": "warn",
    "func-names": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "no-plusplus": "off",
    "quotes": [2, "single", { "avoidEscape": true }],
    "no-param-reassign": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-unused-expressions": "off",
    "no-nested-ternary": "off"
  }
};
