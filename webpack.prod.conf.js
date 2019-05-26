const path = require('path');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/components/app.ts',
  mode: 'production',
  watch: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: dist,
  }
};
