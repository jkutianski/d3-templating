d3-templating
==========
*(This version is for d3.js v4.x)*

d3-templating is based on [my previous solution](http://bl.ocks.org/jkutianski/7556191) of [John Berryman's attempt](http://bl.ocks.org/JnBrymn/2295155) to use templating.
This version support template compilation engines as [`Handlebars`](http://handlebarsjs.com/), [`Mustache`](https://mustache.github.io/), [`Hogan`](http://twitter.github.io/hogan.js/) and probably others.

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
Hogan
---------
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
