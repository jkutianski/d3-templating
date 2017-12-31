// rollup.config.js
export default [{
    input: 'index.js',
    output: {
        file: 'build/d3-template.js',
        format: 'umd',
        name: 'd3',
        extend: true
    }
}];