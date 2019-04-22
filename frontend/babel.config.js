module.exports = api => {
  api.cache(false);

  const presets = ["@babel/react", "@babel/env"];

  const plugins = [
    // Required for ?
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    // Required for ?
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",

    // Required for async-await
    "@babel/transform-runtime",
    // Required for react-dnd:
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ];

  return {
    presets,
    plugins
  };
};
