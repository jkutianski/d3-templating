const
    tape = require("tape"),
    Handlebars = require("handlebars"),
    jsdom = require('jsdom'),
    d3 = Object.assign({}, require("d3-selection"), require("../"));

tape("Test function d3.template()", function(test) {
    test.equal(typeof(d3.template),
        'function'
    );

    test.end();
});

const template = '<svg xmlns="http://www.w3.org/2000/svg" ><g id="{{data}}"></g></svg>';

const compiledTemplate = Handlebars.compile(template);

tape("Test Handlebars template", function(test) {

    test.equal(compiledTemplate({ data: 'data' }),
        '<svg xmlns="http://www.w3.org/2000/svg" ><g id="data"></g></svg>'
    );

    test.end();
});


var dom = new jsdom.JSDOM('<!DOCTYPE html><body></body></html>');

var body = d3.select(dom.window.document.body);

var svg = body.append('svg');

var g = svg.selectAll('g')
    .data([
        { data: 0 },
        { data: 1 },
        { data: 2 },
        { data: 3 }
    ])
    .enter();

tape("Test d3.select()", function(test) {

    test.equal(typeof(g),
        'object'
    );

    test.end();
});

g.call(d3.template(compiledTemplate));

tape("Test d3.template(Handlebars template) on d3.select()", function(test) {

    test.equal(body.html(),
        '<svg><g id="0"></g><g id="1"></g><g id="2"></g><g id="3"></g></svg>'
    );

    test.end();
});