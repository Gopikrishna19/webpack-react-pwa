module.exports = () => ({
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    plugins: [
      'syntax-dynamic-import',
      'transform-object-rest-spread',
      'transform-class-properties'
    ],
    presets: [
      [
        'env',
        {
          'targets': {
            'browsers': [
              '> 2%',
              'not ie 11',
              'not op_mini all'
            ],
            'node': '8.11.1'
          }
        }
      ],
      'react'
    ]
  },
  test: /\.js$/
});
