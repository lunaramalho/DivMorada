module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/components': './src/components',
            '@/styles':     './src/styles',
            '@/constants':  './src/constants',
            '@/services':   './src/services',
            '@/tipos':      './src/tipos',
            '@/hooks':      './hooks',
            '@/context':    './context',
          },
        },
      ],
    ],
  };
};