import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'development', // Set to 'development' or 'production'
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'), // Add this line
    },
  },
};

export default config;
