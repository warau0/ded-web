/* eslint-disable global-require */
module.exports = {
  modules: true,
  plugins: [
    require('postcss-mixins')({
      mixins: require('./src/ded-constants/mixins.js'),
    }),
    require('postcss-nested')(),
    require('postcss-custom-properties')({
      preserve: false,
      importFrom: 'src/ded-constants/constants.css',
    }),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
};
/* eslint-enable global-require */
