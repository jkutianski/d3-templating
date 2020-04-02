// d3-template plugin for d3js v4.x

if (typeof(DOMParser) === 'undefined') { // if DOMParser is not defined then assign jsdom DOMParser();
	(function(global) {
		var jsdom = require('jsdom'),
			dom = new jsdom.JSDOM('');

		global.DOMParser = dom.window.DOMParser;
	})(global);
}

export default function(render) {

    return function(s) {

        var parser = new DOMParser();
        parser.async = false;

        s.each(function(d) {

        	var rendered = render(d);

        	var mime = (rendered.match(/xmlns="http:\/\/www\.w3\.org\/\d+\/svg"/gi)) ? 'text/xml' : 'text/html';

            var parsedContent = parser
                .parseFromString(rendered, mime) // deserialize rendered content
                .documentElement;

            parsedContent = (mime === 'text/xml') ? parsedContent.firstChild : parsedContent;

            // import rendered nodes on actual node
            while (parsedContent) {
                this.appendChild(
                    this.ownerDocument.importNode(parsedContent, true)
                );
                parsedContent = parsedContent.nextSibling;
            }
        });

    };

};