d3-templating
==========
*(This version is tested on browsers with D3js v2.x, v3.x and v4.x)*
*(For Node.js is only supported the D3js v4.x)*

d3-templating is based on [my previous solution](http://bl.ocks.org/jkutianski/7556191) of [John Berryman's attempt](http://bl.ocks.org/JnBrymn/2295155) to use templating.
This version support template compilation engines as [`Handlebars`](http://handlebarsjs.com/), [`Mustache`](https://mustache.github.io/), [`Hogan`](http://twitter.github.io/hogan.js/), [`Nunjucks`](https://mozilla.github.io/nunjucks/), [`doT`](https://olado.github.io/doT/) and probably others.

[D3js Clock DEMO](http://bl.ocks.org/jkutianski/0601ad01f560d49a5967)

Install
--------------
To install via NPM use `npm install d3-templating`. You can also load directly from [unpkg.com](https://unpkg.com/d3-templating/).

```html
<script src="https://unpkg.com/d3-templating/build/d3-template.min.js"></script>
```

Template
--------------
*If the template is an SVG you've to add the tag `<svg xmlns="http://www.w3.org/2000/svg">`, like the following example.*
```
<template id="template" type="text/html" style="display: none;">
   <svg xmlns="http://www.w3.org/2000/svg"><text>{{data}}</text></svg>
</template>
```
Handlebars
--------------
```
var template = d3.select('#template').node().innerHTML;
var compiledTemplate = Handlebars.compile(template);

d3.select('#node').call(
  d3.template(compiledTemplate)
);
```
Mustache
--------------
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
