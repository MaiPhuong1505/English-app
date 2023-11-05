import path from 'path';

export default {
  mode: 'production',
  entry: './server.js', // Đường dẫn tới tệp gốc của ứng dụng
  output: {
    path: path.resolve(__dirname, 'dist'), // Đường dẫn đến thư mục đầu ra
    filename: 'bundle.js', // Tên tệp đầu ra
    publicPath: '/',
  },
  target: 'node',
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/, // Áp dụng loader cho các tệp JavaScript
  //       exclude: /node_modules/, // Loại trừ thư mục node_modules
  //       use: {
  //         loader: 'babel-loader', // Sử dụng babel-loader để biên dịch JavaScript
  //         options: {
  //           presets: ['@babel/preset-env'], // Sử dụng preset-env để hỗ trợ các tính năng JavaScript mới
  //         },
  //       },
  //     },
  //   ],
  // },
};
