const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest');

const is_dev = process.env.NODE_ENV === 'development';

let plugins = [
  new HtmlWebpackPlugin({
    template: './template.html'
  })
];

const prodPlugins = [
  new WorkboxPlugin.GenerateSW({
    navigateFallback: '/index.html',
    runtimeCaching: [
      {
        urlPattern: new RegExp('^(http:\/\/localhost:3333|https:\/\/your-render-url.com)'), // Adjust the URL pattern to match your localhost URL
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'stale-while-revalidate-cache',
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ],
    // these options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true,

  }),
  new WebpackPwaManifestPlugin({
    name: 'Transformers App',
    short_name: 'TR App',
    description: 'A cool transformers application for all your autobot data needs!',
    background_color: '#ffffff',
    publicPath: '/',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src: path.resolve('src/images/pwa_logo_512.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('src/images/pwa_logo_512.png'),
        size: '1024x1024',
        purpose: 'maskable'
      }
    ]
  })
];

if (!is_dev) {
  plugins = plugins.concat(prodPlugins);
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'deploy_code'),
    filename: 'bundle.js',
    clean: true
  },
  mode: is_dev ? 'development' : 'production',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                targets: 'ie 11'
              }]
            ],
            "plugins": ["@babel/plugin-transform-arrow-functions"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'deploy_code'),
    },
    compress: true,
    hot: true,
    port: 9000,
    proxy: [
      // Send all fetch requests to localhost:3333 instead of 9000
      {
        context: '/api',
        target: 'http://localhost:3333',
        secure: false
      }
    ],
    watchFiles: ['./template.html']
  },
};