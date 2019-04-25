module.exports = api => {
  api.cache(false);

  const presets = ["@babel/react", "@babel/env"];

  const plugins = [
    // Required for ?
    "@babel/plugin-syntax-dynamic-import",
    // imports meta-data from scripts, required for ?
    "@babel/plugin-syntax-import-meta",

    // Required for using the {...object} syntax
    "@babel/plugin-proposal-object-rest-spread",
    // Required for multi-line strings
    "@babel/plugin-proposal-json-strings",
    // Separating numbers with _: 100_000 == 10^5, required for ?
    "@babel/plugin-proposal-numeric-separator",
    // Required for ?
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-throw-expressions",

    // Required for async-await
    "@babel/transform-runtime",
    // Required for react-dnd:
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    // required for react-spinners
    "emotion"
  ];

  return {
    presets,
    plugins
  };
};
