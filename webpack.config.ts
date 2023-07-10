import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
    fs: false, // Set fs to false to exclude it from the bundle
    path: require.resolve('path-browserify'), // Use path-browserify as a fallback for path module
  },
},
};

export default config;
