module.exports = api => {
  api.cache(false);

  // const presets = [];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-export-default-from",
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/plugin-proposal-json-strings"
  ];

  return {
    // presets,
    plugins
  };
};
