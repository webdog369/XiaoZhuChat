module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100,
      // propList: ['width', 'height']
      propList: ['*']
    }
  }
}
