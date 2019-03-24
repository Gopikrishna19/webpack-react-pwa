module.exports = () => ({
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        plugins: [
            '@babel/syntax-dynamic-import',
            '@babel/proposal-object-rest-spread',
            '@babel/proposal-class-properties'
        ],
        presets: [
            [
                '@babel/env',
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
            '@babel/react'
        ]
    },
    test: /\.js$/
});
