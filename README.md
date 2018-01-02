d3-templating
==========
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f424dd4911324201a86c9543e192c4e6)](https://www.codacy.com/app/jkutianski/d3-templating?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jkutianski/d3-templating&amp;utm_campaign=Badge_Grade)

[![dependencies Status](https://david-dm.org/jkutianski/d3-templating/status.svg)](https://david-dm.org/jkutianski/d3-templating)
[![devDependencies Status](https://david-dm.org/jkutianski/d3-templating/dev-status.svg)](https://david-dm.org/jkutianski/d3-templating?type=dev)

*(This version is tested on browsers with D3js v2.x, v3.x and v4.x)*
*(For Node.js is only supported the D3js v4.x)*

d3-templating is based on [my previous solution](http://bl.ocks.org/jkutianski/7556191) of [John Berryman's attempt](http://bl.ocks.org/JnBrymn/2295155) to use templating.
This version support template compilation engines as [`Handlebars`](http://handlebarsjs.com/), [`Mustache`](https://mustache.github.io/), [`Twitter Hogan`](http://twitter.github.io/hogan.js/), [`Mozilla Nunjucks`](https://mozilla.github.io/nunjucks/), [`LinkedIn Dust`](http://www.dustjs.com/), [`doT`](https://olado.github.io/doT/), [`Underscore`](http://underscorejs.org/#template), [`Template7`](http://idangero.us/template7/), [`EJS`](http://ejs.co/), [`Vash`](https://github.com/kirbysayshi/vash), [`ART`](https://aui.github.io/art-template/), [`Swig`](http://node-swig.github.io/swig-templates/) and probably others.

[D3js Clock DEMO](http://bl.ocks.org/jkutianski/0601ad01f560d49a5967)

Install
-------
To install via NPM use `npm install d3-templating`. You can also load directly from [unpkg.com](https://unpkg.com/d3-templating/).

```html
<script src="https://unpkg.com/d3-templating/build/d3-template.min.js"></script>
```

Template
--------
*If the template is an SVG you've to add the tag `<svg xmlns="http://www.w3.org/2000/svg">`, like the following example.*
```
<template id="template" type="text/html" style="display: none;">
   <svg xmlns="http://www.w3.org/2000/svg"><text>{{data}}</text></svg>
</template>
```
How to use
----------

Node.js
-------
```
const
    jsdom = require('jsdom'), // JSDOM is required to use D3js
    Handlebars = require("handlebars"),
    d3 = Object.assign({}, require("d3-selection"), require("d3-templating"));

var dom = new jsdom.JSDOM('<?xml version="1.0"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" ></svg>');
var body = d3.select(dom.window.document.body);

var template = '<svg xmlns="http://www.w3.org/2000/svg" ><circle cx="{{x}}" cy="{{y}}" r="{{r}}"/></svg>';
var compiledTemplate = Handlebars.compile(template);

var svg = body.select('svg');

var g = svg.selectAll('g')
    .data([
        { x: 10, y: 10, r: 10 },
        { x: 30, y: 30, r: 20 },
        { x: 60, y: 60, r: 30 },
        { x: 100, y: 100, r: 40 },
    ])
    .enter()
    .call(d3.template(compiledTemplate));

console.log(body.html())
```

Handlebars
----------
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = Handlebars.compile(template);

d3.select('#node').call(
  d3.template(compiledTemplate)
);
```
Mustache
--------
```
var template = d3.select('#template').node().innerHTML;
Mustache.parse(template);

d3.select('#node').call(
   d3.template(
     function (d) {
       return Mustache.render(template,d);
     })
 );
```
Twitter Hogan
-------------
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = Hogan.compile(template);

d3.select('#node').call(
   d3.template(
     function (d) {
       return compiledTemplate.render(d);
     })
 );
```
Mozilla Nunjucks
----------------
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = nunjucks.compile(template);

d3.select('#node').call(
    d3.template(function (d) {
        return compiledTemplate.render(d);
    })
);
```
LinkedIn Dust
-------------
```
var template = d3.select('#template').node().innerHTML;
dust.loadSource(dust.compile(template, 'myTemplate'));

d3.select('#node').call(
    d3.template(
        function(d) {
            var output;
            dust.render('myTemplate', d, function (err, out) {
                output = out;
            });
            return output;
        }
    )
);
```
doT
---
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = doT.template(template);

d3.select('#node').call(
    d3.template(function (d) {
        return compiledTemplate(d);
    })
);
```
Underscore
----------
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = _.template(template);

d3.select('#node').call(
    d3.template(function (d) {
        return compiledTemplate(d);
    })
);
```
Template7
---------
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = Template7.compile(template);

d3.select('#node').call(
    d3.template(function (d) {
        return compiledTemplate(d);
    })
);
```
EJS
---
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = ejs.compile(template);

d3.select('#node').call(
    d3.template(function (d) {
        return compiledTemplate(d);
    })
);
```
Vash
----
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = vash.compile(template);

d3.select('#node').call(
    d3.template(function (d) {
        return compiledTemplate(d);
    })
);
```

ART
----
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = template.compile(template);

d3.select('#node').call(
    d3.template(function (d) {
        return compiledTemplate(d);
    })
);
```

Swig
----
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = swig.compile(template);

d3.select('#node').call(
    d3.template(function (d) {
        return compiledTemplate(d);
    })
);
```