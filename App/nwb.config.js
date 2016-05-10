module.exports = {
  type: 'react-app',
  babel: {
    stage: 0,
  },
  build: {
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    global: 'Hello',
    umd: true
  }
}
