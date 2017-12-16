const
    fs = require('fs'),
    Handlebars = require("handlebars"),
    jsdom = require('jsdom'),
    d3 = Object.assign({}, require("d3-selection"), require("../")),
    template = '<svg xmlns="http://www.w3.org/2000/svg" ><circle cx="{{x}}" cy="{{y}}" r="{{r}}"/></svg>',
    compiledTemplate = Handlebars.compile(template);

var dom = new jsdom.JSDOM('<?xml version="1.0"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" ></svg>');

var body = d3.select(dom.window.document.body);

var svg = body.select('svg');

var g = svg.selectAll('g')
    .data([
        { x: 10, y: 10, r: 10 },
        { x: 30, y: 30, r: 20 },
        { x: 60, y: 60, r: 30 },
        { x: 100, y: 100, r: 40 },
    ])
    .enter();

g.call(d3.template(compiledTemplate));

fs.writeFile('sample.svg', body.html(), 'utf8', (err) => {
  if (err) throw err;
  console.log('The file "sample.svg" has been saved!');
});