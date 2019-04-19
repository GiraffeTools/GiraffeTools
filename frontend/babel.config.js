module.exports = api => {
  api.cache(false);

  const presets = [
    "@babel/react",
    "@babel/env",
  ];

  const plugins = [
    "@babel/plugin-proposal-class-properties",
    '@babel/plugin-proposal-object-rest-spread',
    "@babel/plugin-syntax-dynamic-import",
    '@babel/transform-runtime',

    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-syntax-import-meta",
  ];

  return {
    presets,
    plugins
  };
};
